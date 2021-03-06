import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import BasicForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<BasicForm onSubmit={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
});

it('should return form data', () => {
    const expectedResult = {
        title: 'Title',
        description: 'Description',
    }

    var result;
    const { getByLabelText, getByText } = render(<BasicForm onSubmit={(formResult) => result = formResult}  />);

    fireEvent.change(getByLabelText(/title/i), {
        target: {value: expectedResult.title},
    })
    fireEvent.change(getByLabelText(/description/i), {
        target: {value: expectedResult.description},
    })
    fireEvent.click(getByText(/submit/i));
    
    expect(result).toEqual(expectedResult);
});