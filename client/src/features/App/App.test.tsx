import { render } from "@testing-library/react";
import { vi, type Mock, expect } from "vitest";
import { Provider } from "react-redux";
import { App } from "./App";
import { useGetTodosQuery } from "../../todosApi/todosApiSlice";
import { store } from "../../redux/store";

vi.mock("../../todosApi/todosApiSlice", async () => {
  const actualModule = await vi.importActual("../../todosApi/todosApiSlice");
  return {
    ...actualModule,
    useGetTodosQuery: vi.fn(),
  };
});

describe("App Component", () => {
  beforeEach(() => {
    (useGetTodosQuery as Mock).mockReturnValue({
      data: [{ _id: "1", todo: "Test Todo", completed: false }],
    });
  });

  test("renders TodoForm and TodoList", () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(
      getByRole("textbox", { name: "Todo input field" }),
    ).toBeInTheDocument();

    expect(getByText("Add Todo")).toBeInTheDocument();
    expect(getByText("Test Todo")).toBeInTheDocument();
    expect(useGetTodosQuery).toHaveBeenCalledTimes(1);
  });
});
