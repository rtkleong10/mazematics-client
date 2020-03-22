import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import TeachingHomePage from '../TeachingHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import StudentReportsPage from '../StudentReportsPage';

export class TeachingRouter extends Component {
    render() {
        return (
            <>
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
            </>
        )
    }
}

export default TeachingRouter
