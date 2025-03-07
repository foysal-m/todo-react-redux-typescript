import React, { useOptimistic } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { TodoForm } from "../TodoForm/TodoForm";
import { TodoType } from "../types/todo.types";

export const App = () => {
  const queryClient = useQueryClient();

  const submitAction = async (formData: FormData) => {
    try {
      const newTodo: Pick<TodoType, "todo"> = {
        todo: formData.get("todo") as string,
      };

      queryClient.invalidateQueries({ queryKey: ["todos"] });
    } catch (error) {
      return String(error); // If an error occurs, return it as a string
    }
  };

  return (
    <div className="App">
      <TodoForm action={submitAction} />
    </div>
  );
};
