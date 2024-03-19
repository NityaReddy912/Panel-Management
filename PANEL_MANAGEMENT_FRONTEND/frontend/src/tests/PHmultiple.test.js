import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react';
//import PHmultiple from '../Components/Panel/AddPanelAvailibilityPH/multiple/PHmultiple';
import AddPanelAvailibilityPHmultiple from "../Components/Panel/AddPanelAvailibilityPH/multiple/PHmultiple";
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/AddPanelAvailibilityPH/multiple/PHmultiple');

afterEach(cleanup);

describe("PHMultiple Component", () => {
  function phmultiple(){
    return render( 
    <MemoryRouter intialEntries={['/phmultiple']}>
      <AddPanelAvailibilityPHmultiple />
    </MemoryRouter>
    )
  }

  it('edit the form when button is clicked!', ()=>{
    screen.debug();
    expect(phmultiple()).toMatchSnapshot();
  });

   it('render Associate id Component', () =>{
     const {getByRole} = phmultiple();
     const element = screen.queryByTestId('Associate Id');
   });

   it('render Associate Grade input', () =>{
    const {getByRole} = phmultiple();
    const element = screen.queryByTestId('Enter Associate Grade');
  });
  it('render Date', () =>{
    const {getByRole} = phmultiple();
    const element = screen.queryByTestId('Select Date');
  });

  it('render From Time input', () =>{
    const {getByRole} = phmultiple();
    const element = screen.queryByTestId('Enter From Time');
  });

  it('render To Time input', () =>{
    const {getByRole} = phmultiple();
    const element = screen.queryByTestId('Enter To Time');
  });
});
