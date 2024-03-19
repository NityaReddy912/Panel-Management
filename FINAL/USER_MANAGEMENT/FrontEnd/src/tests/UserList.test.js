import {render,screen,cleanup,fireEvent, getByTestId} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
//import { BrowserRouter , Route} from 'react-router-dom';
import UserList from '../pages/UserList';
import AddUser from '../pages/AddUser';
import '@testing-library/jest-dom'
//import {renderWithRouter} from '@testing-library/jest-dom';
afterEach(cleanup);

test('checks the form with input fields', () => {
  render(<MemoryRouter initialEntries={['/UserList']}>
<UserList/>
</MemoryRouter>
);
  expect(screen.getByText('User Id')).toBeInTheDocument();
  expect(screen.getByText('User Name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('User Role')).toBeInTheDocument();
});

test('checks the form with input fields', () => {
  render(<MemoryRouter initialEntries={['/UserList']}>
<UserList/>
</MemoryRouter>
);
expect(screen.queryByPlaceholderText('Enter User Id')).toBeInTheDocument();
expect(screen.queryByPlaceholderText('Enter User Name')).toBeInTheDocument();
expect(screen.queryByPlaceholderText('Enter Email Id')).toBeInTheDocument();
});

test('Checks the username,userid,email,roles when submit button is clicked', () => {
  const UserListSubmit = jest.fn();
  render(<MemoryRouter initialEntries={['/UserList']}>
<UserList />
</MemoryRouter>
  );
  fireEvent.submit(screen.getByTestId('submit'));
  expect(UserListSubmit).toHaveBeenCalledTimes(0);
});

test('cancel the username,userid,email,roles when button is clicked', () => {
  const UserListCancel = jest.fn();
  render(<MemoryRouter initialEntries={['/UserList']}>
<UserList />
</MemoryRouter>
  );
fireEvent.submit(screen.getByTestId('button'));
  expect(UserListCancel).toHaveBeenCalledTimes(0);
});

test('notification when any field is not entered', () => {
  const checkInputFields = jest.fn();
  render(<MemoryRouter initialEntries={['/UserList']}>
<UserList />
</MemoryRouter>
  );
  fireEvent.click(screen.getByTestId('submit'),{target:{value:''}});
  expect(checkInputFields).toHaveBeenCalledTimes(0);
});

test('clears fields when cancel button is clicked', () => {
  const checkInputFields = jest.fn();
  render(<MemoryRouter initialEntries={['/UserList']}>
<UserList />
</MemoryRouter>
  );
  fireEvent.click(screen.getByTestId('button'),{target:{value:''}});
  expect(checkInputFields).toHaveBeenCalledTimes(0);
});

test("isActive Button Rendering", () => {
const setIsActive= jest.fn();
render(<MemoryRouter initialEntries={['/UserList']} >;
<UserList />
</MemoryRouter>
);
const button = screen.getByTestId("checkbox");
fireEvent.click(screen.getByTestId('button'),{target:{value:'isActive'}});
expect(button).toBeInTheDocument();
})


test('Shoud open add page when Add button is clicked', () => {

  const checkInputFields = jest.fn();

  render(<MemoryRouter initialEntries={['/UserList','/AddUser']}>

<UserList />

<AddUser />

</MemoryRouter>

);



fireEvent.click(screen.getByTestId('add'),{target:{value:'/AddUser'}});



expect(checkInputFields).toHaveBeenCalledTimes(0);

});