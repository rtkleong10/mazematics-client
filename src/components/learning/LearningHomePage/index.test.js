import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import axiosMock from 'axios'

import { renderWithReduxRouter } from '../../../utils/tests.js';
import LearningHomePage from './index.js';

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockResolvedValue({
        data: {
            content: [
                {
                    id: 1,
                    title: "Addition",
                    description: "Putting 2 and 2 together."
                },
                {
                    id: 2,
                    title: "Subtraction",
                    description: "Removing one from another."
                }
            ]
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it('should load topics', () => {
    const { getByTestId } = render(renderWithReduxRouter(<LearningHomePage />)); 
    expect(getByTestId('loader')).toBeTruthy();
});

it('should load and display the topics', async () => {
    const { getByText } = render(renderWithReduxRouter(<LearningHomePage />));
    const topics = await waitForElement(() => getByText('Topics'));
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(topics).toBeTruthy();
})

it('should take a snapshot', async () => {
    const { asFragment, getByText } = render(renderWithReduxRouter(<LearningHomePage />));
    await waitForElement(() => getByText('Topics'));
    expect(asFragment()).toMatchSnapshot();
})