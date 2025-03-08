import styles from "./TodoForm.module.scss";

type SubmitAction = (formData: FormData) => void;

export const TodoForm = ({ action }: { action: SubmitAction }) => {
  return (
    <form action={action} className={styles.form}>
      <label htmlFor="todo-input" className={styles.form__label} />
      <input
        id="todo-input"
        type="text"
        name="todo"
        className={styles.form__input}
        aria-label="Todo input field"
      />
      <button type="submit" className={styles.form__submit}>
        Add Todo
      </button>
    </form>
  );
};
