import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  type TodoType,
} from "../../todosApi/todosApiSlice";
import styles from "./TodoItem.module.scss";

export type TodoItemProps = {
  todo: TodoType & { isPending?: boolean };
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const toggleCompletion = () => {
    updateTodo({ id: todo._id, completed: !todo.completed });
  };

  return (
    <div className={styles.todo}>
      <div className={styles.todo__content}>
        <button
          className={`${styles.tick__icon} ${todo.completed ? styles.completed : ""}`}
          onClick={toggleCompletion}
          aria-label="Mark as completed"
        >
          ✔️
        </button>
        <p
          className={`${styles.content__title} ${todo.completed ? styles.completed : ""}`}
        >
          {todo.todo}
        </p>
      </div>
      <p>{new Date(todo.created_at).toUTCString()}</p>
      <div className={styles.todo__actions}>
        <button
          aria-label="Delete todo"
          className={styles.delete__btn}
          onClick={() => deleteTodo(todo._id)}
        >
          X
        </button>
        {todo.isPending && <small>Pending...</small>}
      </div>
    </div>
  );
};
