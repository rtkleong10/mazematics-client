import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LearningHomePage from '../LearningHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import Logout from '../../accounts/Logout';
import LeaderboardPage from '../LeaderboardPage';
import GamePage from '../../game/GamePage';
import NotFoundPage from '../../common/NotFoundPage';
/**
 * This component handles the routing for the learning platform based on the URL
 */
export class LearningRouter extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/not-found"
                    component={NotFoundPage}
                    />
                <Route
                    path="/logout"
                    exact
                    component={Logout}
                    />
                <Route
                    path="/"
                    exact
                    component={LearningHomePage}
                    />
                <Route
                    path="/topics/:topicId"
                    exact
                    component={TopicPage}
                    />
                <Route
                    path="/topics/:topicId/levels/:levelId"
                    exact
                    component={LevelPage}
                    />
                <Route
                    path="/topics/:topicId/levels/:levelId/leaderboard"
                    exact
                    component={LeaderboardPage}
                    />
                <Route
                    path="/topics/:topicId/levels/:levelId/game"
                    exact
                    component={GamePage}
                    />
                <Redirect
                    to="/not-found"
                    />
            </Switch>
        )
    }
}

export default LearningRouter
