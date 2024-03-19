import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react'
import EditPanel from '../Components/Panel/EditPanel/EditPanel';
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Panel/EditPanel/EditPanel');

afterEach(cleanup);

describe("editpanel Component", () => {
  function editpanel(){
    return render( 
    <MemoryRouter intialEntries={['/:id/editpanel']}>
      <EditPanel />
    </MemoryRouter>
    )
  }

  it('edit the form when button is clicked!', ()=>{
    screen.debug();
    expect(editpanel()).toMatchSnapshot();
  });

   it('render Associate id Component', () =>{
     const {getByRole} = editpanel();
     const element = screen.queryByTestId('Enter Associate ID');
   });

   it('render Associate Name input', () =>{
    const {getByRole} = editpanel();
    const element = screen.queryByTestId('Enter Associate Name');
  });
  it('render Email input', () =>{
    const {getByRole} = editpanel();
    const element = screen.queryByTestId('Enter Email');
  });

  it('render Contact input', () =>{
    const {getByRole} = editpanel();
    const element = screen.queryByTestId('Contact');
  });

});
