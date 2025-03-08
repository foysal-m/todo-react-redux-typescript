import { TodoForm } from "../TodoForm/TodoForm";
import { TodoList } from "../TodoList/TodoList";
import { type TodoType } from "../../todosApi/todosApiSlice";

export const App = () => {
  const submitAction = async (formData: FormData) => {
    try {
      const newTodo: Pick<TodoType, "todo"> = {
        todo: formData.get("todo") as string,
      };

      console.log(newTodo);
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
