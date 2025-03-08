import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem"; // Update path as needed
import { vi, type Mock } from "vitest";
import { useDeleteTodoMutation } from "../../todosApi/todosApiSlice";

// Mock the hook for useDeleteTodoMutation
vi.mock("../../todosApi/todosApiSlice", () => ({
  useDeleteTodoMutation: vi.fn(),
}));

describe("TodoItem Component", () => {
  let deleteTodoMock: ReturnType<typeof vi.fn>;

  const todo = {
    _id: "1",
    todo: "Test Todo",
    completed: false,
    created_at: "2021-09-01T00:00:00.000Z",
  };

  beforeEach(() => {
    // Initialize the mock for deleteTodo mutation
    deleteTodoMock = vi.fn();
    (useDeleteTodoMutation as Mock).mockReturnValue([deleteTodoMock]);
  });

  test("renders TodoItem with initial todo text", () => {
    render(<TodoItem todo={todo} />);

    // Check if the todo text is displayed
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("toggles completion when tick button is clicked", () => {
    const { getByRole, getByText } = render(<TodoItem todo={todo} />);

    const tickButton = getByRole("img", { name: "tick" });
    const todoText = getByText("Test Todo");

    expect(todoText).not.toHaveStyle("text-decoration: line-through");

    fireEvent.click(tickButton);

    expect(todoText).toHaveStyle("text-decoration: line-through");

    fireEvent.click(tickButton);

    expect(todoText).not.toHaveStyle("text-decoration: line-through");
  });

  test.only("calls deleteTodo when delete button is clicked", () => {
    render(<TodoItem todo={todo} />);

    const deleteButton = screen.getByRole("img", { name: "trash" });

    fireEvent.click(deleteButton);

    expect(deleteTodoMock).toHaveBeenCalledWith(todo._id);
  });
});
