import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react'
import PanelAvailabilityList from '../Components/Panel/PanelAvailibility/Pages/Panel/PanelAvailabilityList';
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/PanelAvailibility/Pages/Panel/PanelAvailabilityList');

afterEach(cleanup);

describe("PanelAvailabilityList Component", () => {
  function AvailabilityList(){
    return render( 
    <MemoryRouter intialEntries={['/panelavailbility']}>
      <PanelAvailabilityList />
    </MemoryRouter>
    )
  }

  it('Shows list in the PanelAvailabilityList!', ()=>{
    screen.debug();
    expect(AvailabilityList()).toMatchSnapshot();
  });

   it('Render Search Component', () =>{
     const {getByRole} = AvailabilityList();
     const element = screen.queryByTestId('search');
   });

   it('render reset', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('reset');
  });
  it('render Export Data', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('Exportdata');
  });

  it('render Number PanelId', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('PanelId');
  });

  it('render ToTime input', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('Totime');
  });

  it('render FromTime input', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('Fromtime');
  });

  it('render PanelName input', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('PanelName');
  });

  it('render Email input', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('Email');
  });

  it('render Role input', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('Role');
  });

  it('render InterviewType input', () =>{
    const {getByRole} = AvailabilityList();
    const element = screen.queryByTestId('InterviewType');
  });

});
