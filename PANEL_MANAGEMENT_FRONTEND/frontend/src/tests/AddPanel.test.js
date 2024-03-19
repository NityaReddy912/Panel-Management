

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react';
import AddPanelIG from "../Components/Panel/AddPanel/AddPanel";
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/AddPanel/AddPanel');

//jest.mock('../Components/Panel/AddPanelAvailibilityPANEL/single/PANELsingle');
//import {PHsingle} from '../Components/Panel/AddPanelAvailibilityPANEL/single/PANELsingle';

describe("Add Component", () => {
  function addPanel(){
    return render( 
    <MemoryRouter intialEntries={['/addpanel']}>
      <AddPanelIG />
    </MemoryRouter>
    )
  }
  it('Add Panel', ()=>{
    screen.debug();
    expect(addPanel()).toMatchSnapshot();
  });

  it('Add Component', () =>{
    const {getByRole} = addPanel();
    const element = screen.queryByTestId('Enter Associate ID');
  });

  it('Enter Associate ID', () =>{
    const {getByRole} = addPanel();
    const element = screen.queryByTestId('Enter Associate ID');
  });

    it('Enter Associate Name', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('Enter Associate Name');
      });

      it('Enter Email', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('Enter Email');
      });

      it('Enter Contact', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('Enter Contact');
      });

      it('grade', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('grade');
      });

      it('activate', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('activate');
      });

      it('activate', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('activate');
      });
      it('activate', () =>{
        const {getByRole} = addPanel();
        const element = screen.queryByTestId('activate');
      });
});