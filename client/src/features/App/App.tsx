import { TodoForm } from "../TodoForm/TodoForm";
import { TodoList } from "../TodoList/TodoList";
import {
  usePostTodoMutation,
  type TodoType,
} from "../../todosApi/todosApiSlice";

export const App = () => {
  const [postTodo] = usePostTodoMutation();

  const submitAction = async (formData: FormData) => {
    try {
      const newTodo: Pick<TodoType, "todo"> = {
        todo: formData.get("todo") as string,
      };

      await postTodo({ todo: newTodo.todo });
    } catch (error) {
      return String(error);
    }
  };

  return (
    <div className="App">
      <TodoForm action={submitAction} />
      <TodoList />
    </div>
  );
};
