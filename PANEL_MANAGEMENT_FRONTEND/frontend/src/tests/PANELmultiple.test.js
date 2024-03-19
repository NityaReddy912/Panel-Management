import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react';
import AddPanelAvailbilityPANELmultiple from "../Components/Panel/AddPanelAvailibilityPANEL/multiple/PANELmultiple";
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/AddPanelAvailibilityPANEL/multiple/PANELmultiple');

afterEach(cleanup);

describe("panelmultiple Component", () => {
  function panelmultiple(){
    return render( 
    <Router intialEntries={['/panelmultiple']}>
      <AddPanelAvailbilityPANELmultiple />
    </Router>
    )
  }

  it('edit the form when button is clicked!', ()=>{
    screen.debug();
    expect(panelmultiple()).toMatchSnapshot();
  });

   it('render Associate id Component', () =>{
     const {getByRole} = panelmultiple();
     const element = screen.queryByTestId('Associate Id');
   });

   it('render Associate Grade input', () =>{
    const {getByRole} = panelmultiple();
    const element = screen.queryByTestId('Enter Associate Grade');
  });
  it('render Date', () =>{
    const {getByRole} = panelmultiple();
    const element = screen.queryByTestId('Select Date');
  });

  it('render From Time input', () =>{
    const {getByRole} = panelmultiple();
    const element = screen.queryByTestId('Enter From Time');
  });

  it('render To Time input', () =>{
    const {getByRole} = panelmultiple();
    const element = screen.queryByTestId('Enter To Time');
  });

});