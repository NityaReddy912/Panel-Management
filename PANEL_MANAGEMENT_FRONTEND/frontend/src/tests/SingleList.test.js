// import React from 'react';
// import { render, cleanup } from '@testing-library/react';
// import { screen, configure } from '@testing-library/react'
// import { BrowserRouter as Router } from 'react-router-dom';
// // import {MemoryRouter} from 'react-router-dom';
// import { render, screen } from "@testing-library/react";
// import SingleList from  "./Components/SearchList/SingleList"; 

// describe("Single List Componenet", () => {
//   test("render Number input", () => {
//     render(<SingleList />);

//     const inputEl = screen.getByTestId("search-check");
//     expect(inputEl).toBeInTheDocument();
//     expect(inputEl).toHaveAttribute("type", "checkbox");
//   });
// });

import { render, screen } from "@testing-library/react";
import SingleList from "../Components/SearchList/SingleList";
import { BrowserRouter as Router } from 'react-router-dom';

describe("Single List Componenet", () => {
  test("render Number input", () => {
    render(<Router><SingleList /></Router>);

    const inputEl = screen.getByTestId("search-check");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "checkbox");
  });
});




