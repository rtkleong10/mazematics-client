import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import { USER_ROLES } from '../../../utils/constants';

import Header from '../Header';
import Alert from '../Alert';
import Footer from '../Footer';
import Login from '../../accounts/Login';
import TeachingRouter from '../../teaching/TeachingRouter';
import AccountsRouter from '../../accounts/AccountsRouter';
import LearningRouter from '../../learning/LearningRouter';

function App() {
	let rootComponent = <Login />;

	const user = store.getState().authReducer.user;
	if (user) {
        switch (user.role) {
            case USER_ROLES.STUDENT:
                rootComponent = <LearningRouter />;
                break;

            case USER_ROLES.TEACHER:
                rootComponent = <TeachingRouter />;
                break;

            case USER_ROLES.ADMIN:
                rootComponent = <AccountsRouter />;
                break;

            default:
                break;
        }
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Alert />
                <Header />
                {rootComponent}
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;