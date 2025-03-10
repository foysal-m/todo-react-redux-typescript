import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import { vi, type Mock, expect } from "vitest";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../todosApi/todosApiSlice";

vi.mock("../../todosApi/todosApiSlice", () => ({
  useDeleteTodoMutation: vi.fn(),
  useUpdateTodoMutation: vi.fn(),
}));

describe("TodoItem Component", () => {
  let deleteTodoMock: ReturnType<typeof vi.fn>;
  let updateTodoMock: ReturnType<typeof vi.fn>;

  const todo = {
    _id: "1",
    todo: "Test Todo",
    completed: false,
    created_at: "2021-09-01T00:00:00.000Z",
  };

  beforeEach(() => {
    deleteTodoMock = vi.fn();
    updateTodoMock = vi.fn();

    (useDeleteTodoMutation as Mock).mockReturnValue([deleteTodoMock]);
    (useUpdateTodoMutation as Mock).mockReturnValue([updateTodoMock]);
  });

  test("renders TodoItem with initial todo text", () => {
    render(<TodoItem todo={todo} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("toggles completion when tick button is clicked", async () => {
    const completedTodo = { ...todo, completed: true };
    const { getByRole, getByText } = render(<TodoItem todo={completedTodo} />);

    const tickButton = getByRole("button", { name: "Mark as completed" });
    const todoText = getByText("Test Todo");

    fireEvent.click(tickButton);
    expect(todoText.className).toContain("completed");
  });

  test("calls deleteTodo when delete button is clicked", () => {
    const { getByRole } = render(<TodoItem todo={todo} />);

    const deleteButton = getByRole("button", { name: "Delete todo" });

    fireEvent.click(deleteButton);

    expect(deleteTodoMock).toHaveBeenCalledWith(todo._id);
  });
});
