import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import LeaderboardPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: [
            {
                name: "Bob",
                timing: 120000,
            },
            {
                name: "Joe",
                timing: 150000,
            },
            {
                name: "Kelly",
                timing: 200000,
            },
        ]
    });
});

afterEach(cleanup);

const matchObject = {
    params: {
        topicId: 1,
        levelId: 1,
    }
}

it('should take a snapshot', async () => {
    const { asFragment, getByText } = renderWithReduxRouter(<LeaderboardPage match={matchObject} />); 
    await waitForElement(() => getByText('Leaderboard'));
    expect(asFragment()).toMatchSnapshot();
});