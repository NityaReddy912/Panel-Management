import { render, screen, cleanup, fireEvent, getByTestId } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import SingleList from "../pages/SingleList";
//import SingleList from './pages/SingleList';
import SearchList from '../pages/SearchList';

test('checks the form with input fields', () => {
    render(<MemoryRouter initialEntries={['/SearchList']}>
        <SearchList />
    </MemoryRouter>
    );
    expect(screen.getByText('No Result Found For this Search')).toBeInTheDocument();
});

test("render Number input", () => {
    render(<MemoryRouter initialEntries={['/SingleList']}>
        <SingleList />
    </MemoryRouter>
    );
    const inputEl = screen.getByTestId("searchCheck");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "checkbox");
});