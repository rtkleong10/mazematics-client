import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'
import GamePage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({
        data: {
            id: 1,
            title: "Addition",
            description: "Putting 2 and 2 together.",
        }
    });

    axiosMock.get.mockResolvedValueOnce({
        data: {
            content: [
                {
                    id: 1,
                    title: "Adding 1 to 100",
                    description: "Smol numbers.",
                    playable: true,
                },
                {
                    id: 2,
                    title: "Adding 1 to 1000",
                    description: "Big numbers.",
                    playable: false,
                }
            ]
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});


const matchObject = {
    params: {
        topicId: 1,
        levelId: 1
    }
}
it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<GamePage match={matchObject} />);
    expect(asFragment()).toMatchSnapshot();
})

it('should load levels', () => {
    const { getByTestId } = renderWithReduxRouter(<GamePage match={matchObject} />); 
    expect(getByTestId('loader')).toBeTruthy();
});



