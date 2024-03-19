import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { screen, configure } from '@testing-library/react';
import LoginPage from "../Components/AddList/AddForm";
import { BrowserRouter as Router } from 'react-router-dom';
import {MemoryRouter} from 'react-router-dom';
jest.mock('../Components/Login/Login');

describe("Add Component", () => {
    function addPanel(){
      return render( 
      <MemoryRouter intialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
      )
    }
    it('login', ()=>{
      screen.debug();
      expect(addPanel()).toMatchSnapshot();
    });

    it('Password', () =>{
      const {getByRole} = addPanel();
      const element = screen.queryByTestId('login-password');
    });

    it('Login', () =>{
      const {getByRole} = addPanel();
      const element = screen.queryByTestId('login-submit-btn');
    });
})
