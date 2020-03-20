import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';

import rootReducer from '../redux/rootReducer';

export const renderWithRedux = (component, initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        store
    };
}

export const renderWithRouter = (component, route = '/') => {
    const history = createMemoryHistory({ initialEntries: [route] });
    return {
        ...render(<Router history={history}>{component}</Router>),
        history
    };
}

export const renderWithReduxRouter = (component, initialState = {}, route = '/') => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )
    const history = createMemoryHistory({ initialEntries: [route] });

    return {
        ...render(
            <Provider store={store}>
                <Router history={history}>{component}</Router>
                </Provider>
        ),
        history,
        store
    };
}