import type { TodoType } from "../../todosApi/todosApiSlice";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = ({ todos }: { todos: TodoType[] }) => {
  return todos?.map(todo => <TodoItem key={todo._id} todo={todo} />);
};
