import { type TodoType } from "../../todosApi/todosApiSlice";
import "./TodoItem.css";

export type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
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
          onClick={() => console.log("Delete todo")}
        >
          X
        </button>
      </div>
    </div>
  );
};
