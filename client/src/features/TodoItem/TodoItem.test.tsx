import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import { vi, type Mock } from "vitest";
import { useDeleteTodoMutation } from "../../todosApi/todosApiSlice";
import styles from "./TodoItem.module.scss";

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
    deleteTodoMock = vi.fn();
    (useDeleteTodoMutation as Mock).mockReturnValue([deleteTodoMock]);
  });

  test("renders TodoItem with initial todo text", () => {
    render(<TodoItem todo={todo} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  test("toggles completion when tick button is clicked", () => {
    const { getByRole, getByText } = render(<TodoItem todo={todo} />);

    const tickButton = getByRole("button", { name: "Mark as completed" });
    const todoText = getByText("Test Todo");

    expect(todoText).not.toHaveClass(styles.completed);

    fireEvent.click(tickButton);

    expect(todoText).toHaveClass(styles.completed);

    fireEvent.click(tickButton);

    expect(todoText).not.toHaveClass(styles.completed);
  });

  test("calls deleteTodo when delete button is clicked", () => {
    const { getByRole } = render(<TodoItem todo={todo} />);

    const deleteButton = getByRole("button", { name: "Delete todo" });

    fireEvent.click(deleteButton);

    expect(deleteTodoMock).toHaveBeenCalledWith(todo._id);
  });
});
