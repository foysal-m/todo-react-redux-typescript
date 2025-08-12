import { useOptimistic, useState, useEffect } from "react";
import { TodoForm } from "../TodoForm/TodoForm";
import { TodoList } from "../TodoList/TodoList";
import {
  useGetTodosQuery,
  usePostTodoMutation,
  type TodoType,
} from "../../todosApi/todosApiSlice";

export const App = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetTodosQuery({ page, limit: 5 });

  const sortedAlphabatically =
    data &&
    data.todos?.length &&
    [...data.todos].sort((a, b) => (a.todo > b.todo ? 1 : -1));

  const [postTodo] = usePostTodoMutation();

  const [todos, setOptimisticTodos] = useOptimistic(sortedAlphabatically || []);

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

  const nextButton = () => {
    if (data && page < data.totalPages) {
      setPage(page + 1);
    }
  };

  const preButton = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle automatic page change when the page becomes empty
  useEffect(() => {
    // If current page has no todos, and we are not on the first page, go to the previous page
    if (data && data.todos?.length === 0 && page > 1) {
      setPage(page - 1);
    }
    // If current page is greater than total pages, go to the last valid page
  }, [data, page]); // Dependency on `data` and `page` to trigger when data changes

  return (
    <div className="App">
      <TodoForm action={submitAction} />
      <TodoList todos={todos} />
      {data && data.todos?.length ? (
        <>
          <button onClick={nextButton} disabled={page === data.totalPages}>
            Next
          </button>
          <p>{data.todos.length} items</p>
          <button onClick={preButton} disabled={page === 1}>
            Pre
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
