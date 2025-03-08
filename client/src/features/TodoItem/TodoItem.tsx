import { useState } from "react";
import {
  useDeleteTodoMutation,
  type TodoType,
} from "../../todosApi/todosApiSlice";
import styles from "./TodoItem.module.scss";

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
    <div className={`${styles.todo} ${isCompleted ? styles.completed : ""}`}>
      <div className={styles.todo__content}>
        <button
          className={styles.tick__icon}
          onClick={toggleCompletion}
          aria-label="Mark as completed"
        >
          ✔️
        </button>
        <p
          className={styles.content__title}
          style={isCompleted ? { textDecoration: "line-through" } : {}}
        >
          {todo.todo}
        </p>
      </div>

      <div className={styles.todo__actions}>
        <button
          aria-label="Delete todo"
          className={styles.delete__btn}
          onClick={() => deleteTodo(todo._id)}
        >
          X
        </button>
      </div>
    </div>
  );
};
