import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react';
import PHsingle from '../Components/Panel/AddPanelAvailibilityPANEL/single/PANELsingle';
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/AddPanelAvailibilityPANEL/single/PANELsingle');


describe("Add Component", () => {
    function PanelSingle(){
      return render( 
      <MemoryRouter intialEntries={['/panelsingle']}>
        <PHsingle />
      </MemoryRouter>
      )
    }
    it('Add Panel', ()=>{
      screen.debug();
      expect(PanelSingle()).toMatchSnapshot();
    });

    it('Add Component', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('Enter Associate ID');
      });

      it('Associate Name', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('Associate Name');
      });

      it('Enter Associate Grade', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('Enter Associate Grade');
      });

      it('Select Date', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('Select Date');
      });

      it('Enter From Time', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('Enter From Time');
      });

      it('Enter To Time', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('Enter To Time');
      });

      it('submit', () =>{
        const {getByRole} = PanelSingle();
        const element = screen.queryByTestId('submit');
      });
    });





