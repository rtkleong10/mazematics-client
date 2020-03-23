import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import NotFoundPage from '../../common/NotFoundPage';
import AdminTable from '../AdminTable';
import Logout from '../../accounts/Logout';

const AccountsRouter = [
    <Route
        path="/not-found"
        component={NotFoundPage}
        />,
    <Route
        path= "/"
        exact
        component={AdminTable}
        />,
    <Route
        path="/logout"
        exact
        component={Logout}
        />,
    <Redirect
        to="/not-found"
        />,
];

export default AccountsRouter
