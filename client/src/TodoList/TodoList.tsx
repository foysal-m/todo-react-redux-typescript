import React from "react";

import { TodoType } from "../types/todo.types";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = ({ todos }: { todos: TodoType[] }) => {
  if (todos?.length === 0) {
    // No match
    return;
  }

  return todos?.map((todo) => <TodoItem key={todo._id} todo={todo} />);
};
