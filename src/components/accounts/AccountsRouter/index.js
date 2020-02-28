import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Logout from '../../accounts/Logout';

export class AccountsRouter extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path="/logout"
                    exact
                    component={Logout}
                    />
            </Switch>
        )
    }
}

export default AccountsRouter
