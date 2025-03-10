import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { TodoList } from "./TodoList";
import { useGetTodosQuery } from "../../todosApi/todosApiSlice";
import { vi, type Mock, expect } from "vitest";
import { store } from "../../redux/store";

vi.mock("../../todosApi/todosApiSlice", async () => {
  const actualModule = await vi.importActual("../../todosApi/todosApiSlice");
  return {
    ...actualModule,
    useGetTodosQuery: vi.fn(),
  };
});

describe("TodoList", () => {
  test("renders the correct number of TodoItems based on todos data", () => {
    const mockTodos = [
      { _id: "1", todo: "Test Todo 1", completed: false, created_at: "" },
      { _id: "2", todo: "Test Todo 2", completed: false, created_at: "" },
      { _id: "3", todo: "Test Todo 3", completed: false, created_at: "" },
    ];

    (useGetTodosQuery as Mock).mockReturnValue({
      data: mockTodos,
      isLoading: false,
      isError: false,
    });

    render(
      <Provider store={store}>
        <TodoList todos={mockTodos} />
      </Provider>,
    );

    const todoItems = screen.getAllByText(/Test Todo/);

    expect(todoItems).toHaveLength(mockTodos.length);
  });
});
