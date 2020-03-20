import React from 'react'
import { cleanup, wait, fireEvent } from '@testing-library/react'
import Alert from './index.js';
import { renderWithRedux } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithRedux(<Alert />, {
        errorsReducer: {
            isVisible: true,
            errorMessage: 'Error message',
        }
    });

    expect(asFragment()).toMatchSnapshot();
})

it('should show error message if isVisible is true', () => {
    const { getByText } = renderWithRedux(<Alert />, {
        errorsReducer: {
            isVisible: true,
            errorMessage: 'Error message',
        }
    });

    const errorMessage = getByText('Error message');
    expect(errorMessage).toBeVisible;
})

it('should show error message if isVisible is false', () => {
    const { getByText } = renderWithRedux(<Alert />, {
        errorsReducer: {
            isVisible: false,
            errorMessage: 'Error message',
        }
    });

    const errorMessage = getByText('Error message');
    expect(errorMessage).not.toBeVisible;
})

it('should hide the alert the close button is clicked', async () => {
    const { getByText } = renderWithRedux(<Alert />, {
        errorsReducer: {
            isVisible: true,
            errorMessage: 'Error message',
        }
    });

    const errorMessage = getByText('Error message');
    expect(errorMessage).toBeVisible;

    fireEvent.click(getByText('×'));
    await wait(() => expect(errorMessage).not.toBeVisible);
})