import React from 'react'
import { cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import GamePage from './index.js';
import { tiles } from "../../../utils/data/maps/1";
import { renderWithReduxRouter } from '../../../utils/tests.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce({
        data: {
            id: 1,
            title: "Addition",
            description: "Putting 2 and 2 together.",
            playable: true,
            mapDescriptor: JSON.stringify(tiles),
        }
    });

    axiosMock.get.mockResolvedValueOnce({
        data: {
            content: [
                {
                    id: 1,
                    questionText: "1 + 1",
                    options: {
                        "0": "1",
                        "1": "2",
                        "2": "3",
                        "3": "4"
                    },
                    coordinates: {
                        x: 27,
                        y: 8
                    }
                },
                {
                    id: 2,
                    questionText: "2 + 2",
                    options: {
                        "0": "1",
                        "1": "2",
                        "2": "3",
                        "3": "4"
                    },
                    coordinates: {
                        x: 3,
                        y: 4,
                    }
                },
            ]
        }
    });

    axiosMock.get.mockRejectedValueOnce({
        response: {
            status: 404,
        }
    });

    axiosMock.post.mockResolvedValueOnce({});
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

it('should show the game', async () => {
    const { getByText } = renderWithReduxRouter(<GamePage match={matchObject} />);
    const gameTitle = await waitForElement(() => getByText("Game"));
    expect(gameTitle).toBeVisible();
});

it('should load game level', () => {
    const { getByTestId } = renderWithReduxRouter(<GamePage match={matchObject} />); 
    expect(getByTestId('loader')).toBeTruthy();
});
