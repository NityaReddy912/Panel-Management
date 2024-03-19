import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

describe("Search Component", () => {
  test("submit the form when button is clicked!", () => {
    render(<Search />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outputElement = screen.getByText("Search");
    expect(outputElement).toBeInTheDocument();
  });

  test("render Number input", () => {
    render(<Search />);

    const inputEl = screen.getByTestId("search-id");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("render Number input", () => {
    render(<Search />);

    const inputE2 = screen.getByTestId("search-name");
    expect(inputE2).toBeInTheDocument();
    expect(inputE2).toHaveAttribute("type", "text");
  });
});
