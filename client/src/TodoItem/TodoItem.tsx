import React from "react";
import { TodoType } from "../types/todo.types";

export type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="todo">
      <h3 className="content__title">{todo.todo}</h3>
      <button
        className="delete__btn"
        onClick={() => console.log("Delete button clicked")}
      >
        <span role="img" aria-label="trash">
          🗑️
        </span>
      </button>
    </div>
  );
};
