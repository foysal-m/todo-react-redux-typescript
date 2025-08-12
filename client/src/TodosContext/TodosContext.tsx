import { createContext, useContext } from "react";
import { useOptimistic } from "react";
import {
  useGetTodosQuery,
  usePostTodoMutation,
  type TodoType,
} from "../todosApi/todosApiSlice";

// Define the type for the context value
interface TodosContextType {
  todos: TodoType[];
  submitAction: (formData: FormData) => Promise<void>;
}

const TodosContext = createContext<TodosContextType | null>(null);

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const { data } = useGetTodosQuery();
  const sortedAlphabatically = data?.length
    ? [...data].sort((a, b) => (a.todo > b.todo ? 1 : -1))
    : [];

  const [todos, setOptimisticTodos] = useOptimistic(sortedAlphabatically || []);
  const [postTodo] = usePostTodoMutation();

  const submitAction = async (formData: FormData) => {
    const todoText = formData.get("todo") as string;
    const todoWithUpperCaseFirstLetter =
      todoText.charAt(0).toUpperCase() + todoText.slice(1);

    if (!todoText.trim()) {
      alert("Please enter a valid todo.");
      return;
    }

    try {
      const newTodo: Pick<TodoType, "todo"> = {
        todo: todoWithUpperCaseFirstLetter,
      };

      // Optimistic update
      const optimisticTodo = {
        ...newTodo,
        _id: "optimistic-id",
        completed: false,
        created_at: new Date().toISOString(),
        isPending: true,
      };

      setOptimisticTodos((prevTodos: TodoType[]) => [
        ...prevTodos,
        optimisticTodo,
      ]);

      // Post new todo to the server
      const newTodoFromServer = await postTodo({ todo: newTodo.todo });
      const { data: serverTodo } = newTodoFromServer;

      // Update with server response
      setOptimisticTodos((prevTodos: TodoType[]) =>
        prevTodos.map(todo =>
          todo._id === "optimistic-id" && serverTodo
            ? {
                ...todo,
                _id: serverTodo._id,
                created_at: serverTodo.created_at,
                completed: serverTodo.completed,
                isPending: false,
              }
            : todo,
        ),
      );
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <TodosContext.Provider value={{ todos, submitAction }}>
      {children}
    </TodosContext.Provider>
  );
}

// Custom hooks to consume context
export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context.todos;
}

export function useTodosDispatch() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosDispatch must be used within a TodosProvider");
  }
  return context;
}
