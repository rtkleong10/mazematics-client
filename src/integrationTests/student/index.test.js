import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react/pure'
import axiosMock from 'axios';

import tokenJson from './json/token.json';
import userJson from './json/user.json';
import topicsJson from './json/topics.json';
import topicJson from './json/topic.json';
import levelsJson from './json/levels.json';
import levelJson from './json/level.json';
import learningMaterialsJson from './json/learningMaterials.json';
import leaderboardJson from './json/leaderboard.json';
import questionsJson from './json/questions.json';
import App from '../../components/common/App';

jest.mock('axios');

afterEach(jest.clearAllMocks);

describe('Integration test for students', () => {
    let container;

    beforeAll(() => {
        container = render(<App />);
    });

    it('should display login page', async done => {
        const { getByTestId } = container;
        const login = await waitForElement(() => getByTestId("loginButton"));
        expect(login).toBeVisible();
        done();
    })

    it('should be able to login', async done => {
        axiosMock.post.mockResolvedValueOnce(tokenJson);
        axiosMock.post.mockResolvedValueOnce(userJson);
        axiosMock.get.mockResolvedValueOnce(topicsJson);

        const { getByLabelText, getByText, getByTestId } = container;

        const loginDetails = {
            username: 'user1@test.com',
            password: 'user123',
        }

        fireEvent.change(getByLabelText(/username/i), {
            target: {value: loginDetails.username},
        })
        fireEvent.change(getByLabelText(/password/i), {
            target: {value: loginDetails.password},
        })
        fireEvent.click(getByTestId("loginButton"));

        const topics = await waitForElement(() => getByText(/topics/i));
        const addition = await waitForElement(() => getByText(/addition/i));

        expect(topics).toBeVisible();
        expect(addition).toBeVisible();

        expect(axiosMock.post).toHaveBeenCalledTimes(2);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        done();
    });

    it('should be able to click a topic', async done => {
        axiosMock.get.mockImplementation(url => {
            if (/gameMaps/.test(url))
                return Promise.resolve(levelsJson);
            else
                return Promise.resolve(topicJson);
        });
        axiosMock.get.mockResolvedValueOnce(topicJson);
        axiosMock.get.mockResolvedValueOnce(levelsJson);

        const { getByText } = container;

        fireEvent.click(getByText(/addition/i).closest('a'));
        
        const topic = await waitForElement(() => getByText(/addition from 1 to 1000/i));

        expect(topic).toBeVisible();

        expect(axiosMock.get).toHaveBeenCalledTimes(2);
        done();
    });

    it('should be able to click a level', async done => {
        axiosMock.get.mockImplementation(url => {
            if (/topics/.test(url))
                return Promise.resolve(levelJson);
            else if (/learningMaterials/.test(url))
                return Promise.resolve(learningMaterialsJson);
            else if (/users/.test(url)) // Progress
                return Promise.reject({
                    response: {
                        status: 404,
                    }
                });
        });

        const { getByText } = container;

        fireEvent.click(getByText(/addition from 1 to 1000/i).closest('a'));
        
        const learningMaterials = await waitForElement(() => getByText(/learning materials/i));
        const game = await waitForElement(() => getByText(/play game/i));

        expect(learningMaterials).toBeVisible();
        expect(game).toBeVisible();

        expect(axiosMock.get).toHaveBeenCalledTimes(3);
        done();
    });

    it('should be able to click view leaderboard', async done => {
        axiosMock.get.mockResolvedValueOnce(leaderboardJson);

        const { getByText } = container;

        fireEvent.click(getByText(/view leaderboard/i).closest('a'));
        
        const studentReports = await waitForElement(() => getByText(/leaderboard/i));

        expect(studentReports).toBeVisible();

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        done();
    });

    it('should be able to return to level page', async done => {
        axiosMock.get.mockImplementation(url => {
            if (/topics/.test(url))
                return Promise.resolve(levelJson);
            else if (/learningMaterials/.test(url))
                return Promise.resolve(learningMaterialsJson);
            else if (/users/.test(url)) // Progress
                return Promise.reject({
                    response: {
                        status: 404,
                    }
                });
        });

        const { getByText } = container;

        fireEvent.click(getByText(/back/i).closest('a'));
        
        const learningMaterials = await waitForElement(() => getByText(/learning materials/i));
        const game = await waitForElement(() => getByText(/play game/i));

        expect(learningMaterials).toBeVisible();
        expect(game).toBeVisible();
        done();
    });

    it('should be able to logout', async done => {
        axiosMock.delete.mockResolvedValueOnce({});

        const { getByText, getByTestId } = container;

        fireEvent.click(getByText(/logout/i).closest('a'));

        const loginLink = await waitForElement(() => getByText(/login/i).closest('a'));
        fireEvent.click(loginLink);
        
        const loginButton = await waitForElement(() => getByTestId("loginButton"));

        expect(loginButton).toBeVisible();

        expect(axiosMock.delete).toHaveBeenCalledTimes(1);
        done();
    });
});