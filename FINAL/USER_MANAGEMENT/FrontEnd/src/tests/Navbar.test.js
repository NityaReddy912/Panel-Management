import React from 'react';
import {render,screen,fireEvent} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/navbar';

test('Nav Bar text test', () => {
    render(<MemoryRouter initialEntries={['/Navbar']}>
<Navbar />
</MemoryRouter>
);
expect(screen.getByText('User Management')).toBeInTheDocument();
expect(screen.getByText('User')).toBeInTheDocument();
});

// test('Pages shoud be in clear when clicked', () => {
//     const checkInputFields = jest.fn();
//     render(<MemoryRouter initialEntries={['/Headers']}>
// <Headers />
// </MemoryRouter>
// );
// fireEvent.click(screen.getByTestId('Role'));
// expect(checkInputFields).toHaveBeenCalledTimes(0);
// fireEvent.click(screen.getByTestId('paneltype'));
// expect(checkInputFields).toHaveBeenCalledTimes(0);
// fireEvent.click(screen.getByTestId('panellevel'));
// expect(checkInputFields).toHaveBeenCalledTimes(0);
// fireEvent.click(screen.getByTestId('grade'));
// expect(checkInputFields).toHaveBeenCalledTimes(0);
// fireEvent.click(screen.getByTestId('candidatestatus'));
// expect(checkInputFields).toHaveBeenCalledTimes(0);
// });
