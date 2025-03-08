import {
  useDeleteTodoMutation,
  type TodoType,
} from "../../todosApi/todosApiSlice";
import "./TodoItem.css";

export type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [deleteTodo] = useDeleteTodoMutation();

  return (
    <div className="todo">
      <div className="todo__content">
        <button
          className="tick__icon"
          onClick={() => console.log("Toggle todo")}
          role="img"
          aria-label="tick"
        >
          ✔️
        </button>
        <p className="content__title">{todo.todo}</p>
      </div>

      <div className="todo__actions">
        <button
          role="img"
          aria-label="trash"
          className="delete__btn"
          onClick={() => deleteTodo(todo._id)}
        >
          X
        </button>
      </div>
    </div>
  );
};
