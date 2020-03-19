import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../redux/rootReducer';

export const renderWithRedux = (component, initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk),
    )
    return <Provider store={store}>{component}</Provider>;
}

export const renderWithRouter = (component, route = '/') => {
    const history = createMemoryHistory({ initialEntries: [route] });
    return <Router history={history}>{component}</Router>
}

export const renderWithReduxRouter = (component, initialState = {}, route = '/') => {
    return renderWithRedux(renderWithRouter(component, route), initialState);
}