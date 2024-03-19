import React from "react";
import { getByTestId, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";
import AddUser from "../pages/AddUser";
import { MemoryRouter } from "react-router-dom";
import UserList from "../pages/UserList";

describe("AddUser", () => {
  it("renders Add User Text", () => {
    const { getByText } = render(
      <Router>
        <AddUser />
      </Router>
    );
    expect(getByText("Add User")).toBeInTheDocument();
  });
});

describe("AddUser", () => {
  it("renders User List Text", () => {
    const { getByText } = render(
      <Router>
        <UserList />
      </Router>
    );
    expect(getByText(/User List/)).toBeInTheDocument();
  });
});
// test('test Headline of the page', () => {
//   render(<MemoryRouter initialEntries={['/AddUser']}>
//     <AddUser />
//   </MemoryRouter>
//   );
//   expect(screen.getByText('Add User')).toBeInTheDocument();
// });
