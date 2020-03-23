import React from 'react';
import { Route } from 'react-router-dom';

import TeachingHomePage from '../TeachingHomePage';
import TopicPage from '../TopicPage';
import LevelPage from '../LevelPage';
import StudentReportsPage from '../StudentReportsPage';

const TeachingRouter = [
    <Route
        path="/"
        exact
        component={TeachingHomePage}
        />,
    <Route
        path="/topics/:topicId"
        exact
        component={TopicPage}
        />,
    <Route
        path="/topics/:topicId/levels/:levelId"
        exact
        component={LevelPage}
        />,
    <Route
        path="/topics/:topicId/levels/:levelId/student-reports"
        exact
        component={StudentReportsPage}
        />,
];

export default TeachingRouter
