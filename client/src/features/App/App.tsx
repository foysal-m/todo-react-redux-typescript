import { useOptimistic } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import { TodoList } from "../TodoList/TodoList";
import {
  useGetTodosQuery,
  usePostTodoMutation,
  type TodoType,
} from "../../todosApi/todosApiSlice";

export const App = () => {
  const { data } = useGetTodosQuery();
  const [postTodo] = usePostTodoMutation();

  const [todos, setOptimisticTodos] = useOptimistic(data || []);

  const submitAction = async (formData: FormData) => {
    const todoText = formData.get("todo") as string;

    if (!todoText.trim()) {
      alert("Please enter a valid todo.");
      return;
    }

    try {
      const newTodo: Pick<TodoType, "todo"> = {
        todo: todoText,
      };

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

      const newTodoFromServer = await postTodo({ todo: newTodo.todo });

      const { data: serverTodo } = newTodoFromServer;

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
    <div className="App">
      <TodoForm action={submitAction} />
      <TodoList todos={todos} />
    </div>
  );
};
