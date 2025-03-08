import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../types/todo.types";
import { deleteTodo } from "../ApiService/ApiService";

import "./TodoItem.css";

export type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient();

  const deleteBtn = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate the "topics" query, forcing it to refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("Topic has been deleted");
    },
  });

  return (
    <div className="todo">
      <h3 className="content__title">{todo.todo}</h3>
      <button
        className="delete__btn"
        onClick={() => deleteBtn.mutate(todo._id)}
      >
        <span role="img" aria-label="trash">
          🗑️
        </span>
      </button>
    </div>
  );
};
