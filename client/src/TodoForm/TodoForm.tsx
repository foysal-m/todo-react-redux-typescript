import React from "react";

import "./TodoForm.css";

type SubmitAction = (formData: FormData) => void;

export const TodoForm = ({ action }: { action: SubmitAction }) => {
  return (
    <form action={action} className="form">
      <input type="text" name="todo" className="form__input" />
      <button type="submit" className="form__submit">
        Add Todo
      </button>
    </form>
  );
};
