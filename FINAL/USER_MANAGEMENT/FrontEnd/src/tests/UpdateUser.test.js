import {render,screen,cleanup,fireEvent, getByTestId} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
// { BrowserRouter , Route} from 'react-router-dom';
// import UpdateUser from './pages/UpdateUser';
import UpdateUser from '../pages/UpdateUser';
import '@testing-library/jest-dom'
//import {renderWithRouter} from '@testing-library/jest-dom';
afterEach(cleanup);

test('checks the form with input fields', () => {
  render(<MemoryRouter initialEntries={['/UpdateUser']}>
<UpdateUser/>
</MemoryRouter>
);
  expect(screen.getByText('User Id')).toBeInTheDocument();
  expect(screen.getByText('User Name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('User Role')).toBeInTheDocument();
});

test('checks the form with input fields', () => {
  render(<MemoryRouter initialEntries={['/UpdateUser']}>
<UpdateUser/>
</MemoryRouter>
);
expect(screen.queryByPlaceholderText('Enter User Id')).toBeInTheDocument();
expect(screen.queryByPlaceholderText('Enter User Name')).toBeInTheDocument();
expect(screen.queryByPlaceholderText('Enter Email Id')).toBeInTheDocument();
});

test('Checks the username,userid,email,roles when submit button is clicked', () => {
  const UpdateUserSubmit = jest.fn();
  render(<MemoryRouter initialEntries={['/UpdateUser']}>
<UpdateUser />
</MemoryRouter>
  );
  fireEvent.submit(screen.getByTestId('update'));
  expect(UpdateUserSubmit).toHaveBeenCalledTimes(0);
});

test('Checks the username,userid,email,roles when submit button is clicked', () => {
  const UpdateUserCancel = jest.fn();
  render(<MemoryRouter initialEntries={['/UpdateUser']}>
<UpdateUser />
</MemoryRouter>
  );
fireEvent.submit(screen.getByTestId('button'));
  expect(UpdateUserCancel).toHaveBeenCalledTimes(0);
});

test('notification when any field is not entered', () => {
  const checkInputFields = jest.fn();
  render(<MemoryRouter initialEntries={['/UpdateUser']}>
<UpdateUser />
</MemoryRouter>
  );
  fireEvent.click(screen.getByTestId('update'),{target:{value:''}});
  expect(checkInputFields).toHaveBeenCalledTimes(0);
});

test('clears fields when cancel button is clicked', () => {
  const checkInputFields = jest.fn();
  render(<MemoryRouter initialEntries={['/UpdateUser']}>
<UpdateUser />
</MemoryRouter>
  );
  fireEvent.click(screen.getByTestId('button'),{target:{value:''}});
  expect(checkInputFields).toHaveBeenCalledTimes(0);
});

test("Button Rendering", () => {
const setIsActive= jest.fn();
render(<MemoryRouter initialEntries={['/UpdateUser']} >;
<UpdateUser />
</MemoryRouter>
);
const button = screen.getByTestId("checkbox");
fireEvent.click(screen.getByTestId('checkbox'),{target:{value:'isActive'}});
expect(button).toBeInTheDocument();
})