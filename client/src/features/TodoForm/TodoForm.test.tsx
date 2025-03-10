import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, expect } from "vitest";
import { TodoForm } from "./TodoForm";

describe("TodoForm Component", () => {
  const mockSubmitAction = vi.fn();

  beforeEach(() => {
    mockSubmitAction.mockClear();
  });

  test("renders TodoForm correctly", () => {
    render(<TodoForm action={mockSubmitAction} />);

    expect(screen.getByLabelText("Todo input field")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i }),
    ).toBeInTheDocument();
  });

  test("calls action function on form submit with the correct input", async () => {
    const { getByLabelText, getByRole } = render(
      <TodoForm action={mockSubmitAction} />,
    );

    const input = getByLabelText("Todo input field");
    const submitButton = getByRole("button", { name: "Add Todo" });

    fireEvent.change(input, { target: { value: "Test Todo" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSubmitAction).toHaveBeenCalledWith(expect.any(FormData));
    });

    // To verify the exact value passed, we can check the formData content.
    const formData = mockSubmitAction.mock.calls[0][0];
    expect(formData.get("todo")).toBe("Test Todo");
  });
});
