import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react'
import UpdatePanelAvailability from '../Components/Panel/updatePanel/updatePanel';
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/updatePanel/updatePanel');

afterEach(cleanup);

describe("Update Component", () => {
  function update(){
    return render( 
    <MemoryRouter intialEntries={['/UpdatePanel/:id/:name/:availdate/:grade/:start_time/:end_time/:availability_status']}>
      <UpdatePanelAvailability />
    </MemoryRouter>
    )
  }

  it('submit the form when button is clicked!', ()=>{
    screen.debug();
    expect(update()).toMatchSnapshot();
  });

   it('Update Component', () =>{
     const {getByRole} = update();
     const element = screen.queryByTestId('submit');
   });

   it('render Name input', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('name-id');
  });
  it('render Number input id', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('associate-id');
  });

  it('render Date input', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('date');
  });

  it('render ToTime input', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('totime');
  });

  it('render FromTime input', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('fromtime');
  });

  it('render Status input', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('status');
  });

  it('render Status input', () =>{
    const {getByRole} = update();
    const element = screen.queryByTestId('cancel');
  });

});
