import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TeachingHomePage from '../TeachingHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import StudentReportsPage from '../StudentReportsPage';
import Logout from '../../accounts/Logout';
import NotFoundPage from '../../common/NotFoundPage';

export class TeachingRouter extends Component {
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
                    component={TeachingHomePage}
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
                    path="/:topic/:level/student-reports"
                    exact
                    component={StudentReportsPage}
                    />
                <Redirect
                    to="/not-found"
                    />
            </Switch>
        )
    }
}

export default TeachingRouter
