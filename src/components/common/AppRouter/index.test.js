import React from 'react'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import AppRouter from './AppRouter.js';
import { renderWithReduxRouter } from './../AppRouter/index.js';
import axiosMock from 'axios';
import { USER_ROLES } from '../../../utils/constants';

jest.mock('axios');

beforeEach(() => {
    
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});


it('should navigate teacher to the teaching homepage', () => {
    testUser= {
        username: "Sam",
        email: "sam@test.com",
        role: USER_ROLES.TEACHER
    }

    renderWithReduxRouter(<AppRouter userLoading= {false}
        userFailed = {false}
        user = {testUser}/>); 
    expect(routes.concat(teachingRoutes)).toHaveBeenCalledTimes(1);
});

it('should navigate teacher to the teaching homepage', () => {
    testUser= {
        username: "Sam",
        email: "sam@test.com",
        role: USER_ROLES.STUDENT
    }

    renderWithReduxRouter(<AppRouter userLoading= {false}
        userFailed = {false}
        user = {testUser}/>); 
    expect(routes.concat(learningRoutes)).toHaveBeenCalledTimes(1);
});

it('should navigate administrator to the admin homepage', () => {
    testUser= {
        username: "Sam",
        email: "sam@test.com",
        role: USER_ROLES.ADMINN
    }

    renderWithReduxRouter(<AppRouter userLoading= {false}
        userFailed = {false}
        user = {testUser}/>); 
    expect(routes.concat(teachingRoutes)).toHaveBeenCalledTimes(1);
});