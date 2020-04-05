import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../../utils/constants';
import { refreshTokenLogin, selectUserLoading, selectUserFailed, selectUser } from '../../../redux/ducks/auth';

import Header from '../Header';
import Alert from '../Alert';
import Footer from '../Footer';
import Login from '../../accounts/Login';
import TeachingRouter from '../../teaching/TeachingRouter';
import AccountsRouter from '../../accounts/AccountsRouter';
import LearningRouter from '../../learning/LearningRouter';
import Logout from '../../accounts/Logout';
import NotFoundPage from '../NotFoundPage';
import Loader from '../Loader';

class AppRouter extends Component {
    componentDidMount() {
        if (localStorage.getItem('refresh_token')) {
            this.props.refreshTokenLogin(localStorage.getItem('refresh_token'));
        }
    }

    render() {
        const {
            userLoading,
            userFailed,
            user
        } = this.props;

        if (userLoading && localStorage.getItem('access_token'))
            return <Loader />;
        
        let router = [
            <Route
                key="Login"
                path="/login"
                exact
                component={Login}
                />,
            <Redirect
                key="LoginRedirect"
                from="/"
                exact
                to="/login"
                />,
        ];

        if (!userFailed && user && Object.keys(user).length !== 0 && user.constructor === Object) {
            router = [
                <Redirect
                    key="LoginRedirect"
                    from="/login"
                    to="/"
                    />
            ]

            switch (user.role) {
                case USER_ROLES.STUDENT:
                    router = router.concat(LearningRouter);
                    break;

                case USER_ROLES.TEACHER:
                    router = router.concat(TeachingRouter);
                    break;

                case USER_ROLES.ADMIN:
                    router = router.concat(AccountsRouter);
                    break;

                default:
                    break;
            }
        }

        return (
            <BrowserRouter>
                <Alert />
                <Header />
                <Switch>
                    <Route
                        path="/not-found"
                        exact
                        component={NotFoundPage}
                        />
                    <Route
                        path="/logout"
                        exact
                        component={Logout}
                        />
                    {router}
                    <Redirect
                        from="/"
                        to="/not-found"
                        />
                </Switch>
                <Footer />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    userLoading: selectUserLoading(state),
    userFailed: selectUserFailed(state),
    user: selectUser(state),
});

const dispatchers = {
    refreshTokenLogin,
};

export default connect(mapStateToProps, dispatchers)(AppRouter);