import { useQuery } from "@tanstack/react-query";
import { TodoType } from "../types/todo.types";
import { getTodos } from "../ApiService/ApiService";

export const useTodos = () =>
  useQuery<TodoType[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
