import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LearningHomePage from '../LearningHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import Logout from '../../accounts/Logout';
import LeaderboardPage from '../LeaderboardPage';
import GamePage from '../../game/GamePage';

export class LearningRouter extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/not-found"
                    component={() => <div>404 Not found</div>}
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
                    path="/:topic"
                    exact
                    component={TopicPage}
                    />
                <Route
                    path="/:topic/:level"
                    exact
                    component={LevelPage}
                    />
                <Route
                    path="/:topic/:level/leaderboard"
                    exact
                    component={LeaderboardPage}
                    />
                <Route
                    path="/:topic/:level/game"
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
