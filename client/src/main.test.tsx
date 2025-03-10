import { render, screen } from "@testing-library/react";
import { vi, expect } from "vitest";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { App } from "./features/App/App";

vi.mock("./features/App/App", () => ({
  App: () => <div>Mocked App</div>,
}));

describe("App Rendering", () => {
  test("renders the mocked App component", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText("Mocked App")).toBeInTheDocument();
  });
});
