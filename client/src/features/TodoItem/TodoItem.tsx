import { useState } from "react";
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
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const toggleCompletion = () => {
    setIsCompleted(prevState => !prevState);
  };

  return (
    <div className={`todo ${isCompleted ? "completed" : ""}`}>
      <div className="todo__content">
        <button
          className="tick__icon"
          onClick={toggleCompletion}
          role="img"
          aria-label="tick"
        >
          ✔️
        </button>
        <p
          className="content__title"
          style={isCompleted ? { textDecoration: "line-through" } : {}}
        >
          {todo.todo}
        </p>
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
