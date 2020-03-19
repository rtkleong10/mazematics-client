import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import { renderWithReduxRouter } from '../../../utils/tests.js';
import LevelPage from './index.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockImplementation((url) => {
        if (/topics/.test(url)) {
            return Promise.resolve({
                data: {
                    id: 1,
                    title: "Adding 1 to 100",
                    description: "Smol numbers.",
                    topic: {
                        id: 1
                    },
                    playable: true
                }
            });

        } else if (/learningMaterials/.test(url)) {
            return Promise.resolve({
                data: {
                    content: [
                        {
                            id: 1,
                            title: "Basic addition",
                            description: "Interesting video",
                            link: "https://www.youtube.com/embed/Fe8u2I3vmHU",
                        }
                    ]
                }
            });

        }

        return Promise.reject(new Error('not found'));
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

const matchObject = {
    params: {
        topicId: 1,
        levelId: 1,
    }
}

it('should load learning material', () => {
    const { getByTestId } = render(renderWithReduxRouter(<LevelPage match={matchObject} />)); 
    expect(getByTestId('loader')).toBeTruthy();
});

it('should load and display the learning material', async () => {
    const { getByText } = render(renderWithReduxRouter(<LevelPage match={matchObject} />));
    const learningMaterial = await waitForElement(() => getByText('Learning Material'));
    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(learningMaterial).toBeTruthy();
})

it('should take a snapshot', async () => {
    const { asFragment, getByText } = render(renderWithReduxRouter(<LevelPage match={matchObject} />));
    await waitForElement(() => getByText('Back to Topic Page'));
    expect(asFragment()).toMatchSnapshot();
})