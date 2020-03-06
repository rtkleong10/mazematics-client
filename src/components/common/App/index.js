import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../../redux/store';
import { USER_TYPES } from '../../../utils/constants';

import Header from '../Header';
import Alert from '../Alert';
import Footer from '../Footer';
import Login from '../../accounts/Login';
import TeachingRouter from '../../teaching/TeachingRouter';
import AccountsRouter from '../../accounts/AccountsRouter';

function App() {
	let rootComponent = <Login />;

	const user = store.getState().authReducer.user;
	if (user) {
        switch (user.type) {
            case USER_TYPES.STUDENT:
            case USER_TYPES.TEACHER:
                rootComponent = <TeachingRouter />;
                break;

            case USER_TYPES.ADMIN:
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