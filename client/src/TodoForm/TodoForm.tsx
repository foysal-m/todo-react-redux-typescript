import React from "react";
import "./TodoForm.css";

type SubmitAction = (formData: FormData) => void;

export const TodoForm = ({ action }: { action: SubmitAction }) => {
  return (
    <form action={action} className="form">
      <label htmlFor="todo-input" className="form__label" />
      <input
        id="todo-input"
        type="text"
        name="todo"
        className="form__input"
        aria-label="Todo input field"
      />
      <button type="submit" className="form__submit">
        Add Todo
      </button>
    </form>
  );
};
