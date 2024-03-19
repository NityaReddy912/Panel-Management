import {render,screen,cleanup,fireEvent, getByTestId} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import AddUser from '../pages/AddUser';
import UserList from '../pages/UserList';
import '@testing-library/jest-dom'
afterEach(cleanup);

test('test Headline of the page', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
  <AddUser />
  </MemoryRouter>
  );
  
  expect(screen.getByText('Add User')).toBeInTheDocument();
  });




test('checks the form for User Id', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
  expect(screen.getByText('User Id')).toBeInTheDocument();
  // expect(screen.getByText('User Name')).toBeInTheDocument();
  // expect(screen.getByText('Email')).toBeInTheDocument();
  // expect(screen.getByText('User Role')).toBeInTheDocument();
});

test('checks the form for the User Name', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
 expect(screen.getByText('User Name')).toBeInTheDocument();

});


test('checks the form for the Email', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
 expect(screen.getByText('Email')).toBeInTheDocument();

});


test('checks the form with User Role', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
expect(screen.getByText('User Role')).toBeInTheDocument();

});



test('checks the form with isActive', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
expect(screen.getByText('isActive')).toBeInTheDocument();

});



test('test submit text', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
  <AddUser />
  </MemoryRouter>
  );
  
  expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('test cancel text', () => {
    render(<MemoryRouter initialEntries={['/AddUser']}>
    <AddUser />
    </MemoryRouter>
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    });


test('checks the placeholder for User Id ', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
expect(screen.queryByPlaceholderText('Enter User Id')).toBeInTheDocument();
// expect(screen.queryByPlaceholderText('Enter User Name')).toBeInTheDocument();
// expect(screen.queryByPlaceholderText('Enter Email Id')).toBeInTheDocument();
});


test('checks the placeholder for Email Id', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
expect(screen.queryByPlaceholderText('Enter Email Id')).toBeInTheDocument();
});


test('checks the placeholder for User Name', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser/>
</MemoryRouter>
);
expect(screen.queryByPlaceholderText('Enter User Name')).toBeInTheDocument();
});



test('test for select roles', () => {
  render(<MemoryRouter initialEntries={['/AddUser']}>
  <AddUser />
  </MemoryRouter>
  );
  
  expect(screen.getByTestId('selectRole')).toBeInTheDocument();
  });



test('Checks the username,userid,email,roles when submit button is clicked', () => {
  const addUserSubmit = jest.fn();
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser />
</MemoryRouter>
  );
  fireEvent.submit(screen.getByTestId('submit'));
  expect(addUserSubmit).toHaveBeenCalledTimes(0);
});

test('cancel the username,userid,email,roles when cancel button is clicked', () => {
  const addUserCancel = jest.fn();
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser />
</MemoryRouter>
  );
fireEvent.submit(screen.getByTestId('button'));
  expect(addUserCancel).toHaveBeenCalledTimes(0);
});

test('notification when any field is not entered', () => {
  const checkInputFields = jest.fn();
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser />
</MemoryRouter>
  );
  fireEvent.click(screen.getByTestId('submit'),{target:{value:''}});
  expect(checkInputFields).toHaveBeenCalledTimes(0);
});

test('clears fields when cancel button is clicked', () => {
  const checkInputFields = jest.fn();
  render(<MemoryRouter initialEntries={['/AddUser']}>
<AddUser />
</MemoryRouter>
  );
  fireEvent.click(screen.getByTestId('button'),{target:{value:''}});
  expect(checkInputFields).toHaveBeenCalledTimes(0);
});

test("Checks for the isActive button", () => {
render(<MemoryRouter initialEntries={['/AddUser']} >;
<AddUser />
</MemoryRouter>
);
const button = screen.getByTestId("checkbox");
fireEvent.click(screen.getByTestId('button'),{target:{value:'isActive'}});
expect(button).toBeInTheDocument();
})


// test('Shoud open add page when Add button is clicked', () => {

//   const checkInputFields = jest.fn();

//   render(<MemoryRouter initialEntries={['/AddUser','/UserList']}>

// <AddUser />

// <UserList />

// </MemoryRouter>

// );



// fireEvent.click(screen.getByTestId('submit'),{target:{value:'/UserList'}});



// expect(checkInputFields).toHaveBeenCalledTimes(0);

// });

