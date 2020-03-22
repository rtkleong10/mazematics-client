import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFoundPage from '../../common/NotFoundPage';
import AdminTable from '../AdminTable';
import Logout from '../../accounts/Logout';

export class AccountsRouter extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/not-found"
                    component={NotFoundPage}
                    />
                <Route
                    path= "/"
                    exact
                    component={AdminTable}
                    />
                <Route
                    path="/logout"
                    exact
                    component={Logout}
                    />
                <Redirect
                    to="/not-found"
                    />
            </Switch>
        )
    }
}

export default AccountsRouter
