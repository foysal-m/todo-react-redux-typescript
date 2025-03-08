import { useGetTodosQuery } from "../../todosApi/todosApiSlice";

export const App = () => {
  const { data: todos } = useGetTodosQuery();
  console.log(todos);
  return <div className="App">foysal</div>;
};
