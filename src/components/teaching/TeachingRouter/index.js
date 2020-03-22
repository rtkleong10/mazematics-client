import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TeachingHomePage from '../TeachingHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import StudentReportsPage from '../StudentReportsPage';
import Logout from '../../accounts/Logout';
import NotFoundPage from '../../common/NotFoundPage';

/**
 * This component handles the routing for the teaching platform based on the URL
 */
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
                    path="/topics/:topicId/levels/:levelId/student-reports"
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
