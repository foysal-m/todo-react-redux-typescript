import { useGetTodosQuery } from "../../todosApi/todosApiSlice";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = () => {
  const { data: todos } = useGetTodosQuery();

  return todos?.map(todo => <TodoItem key={todo._id} todo={todo} />);
};
