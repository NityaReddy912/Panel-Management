import { render, screen } from "@testing-library/react";
import SingleList from "./SingleList";

describe("Single List Componenet", () => {
  test("render Number input", () => {
    render(<SingleList />);

    const inputEl = screen.getByTestId("search-check");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "checkbox");
  });
});
