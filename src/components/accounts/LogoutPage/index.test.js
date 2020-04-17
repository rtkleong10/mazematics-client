import React from 'react'
import {cleanup , waitForElement } from '@testing-library/react'
import LogoutPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<LogoutPage />);
    expect(asFragment()).toMatchSnapshot();
})

it('should display button to login page', async () => {
    const { getByText, container } = renderWithReduxRouter(<LogoutPage />);
    await waitForElement(() => getByText('Login'));
    const buttonToLogin = container.querySelector('[data-testid="loginbtn"]');
    expect(buttonToLogin).toBeTruthy();
});
  
  