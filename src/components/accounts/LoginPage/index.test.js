import React from 'react'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import LoginPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';
import { LOGIN, loginAction } from '../../../redux/ducks/auth';
import axiosMock from 'axios'

afterEach(() => {
    cleanup();
});


it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<LoginPage />);
    expect(asFragment()).toMatchSnapshot();
})

it('allows the user to login successfully', async () => {
  const fakeUserResponse = {access_token: 'fake_user_token'}
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse),
    })
  })
  renderWithReduxRouter(<LoginPage />)
  fireEvent.change(screen.getByTestId("usernameField").querySelector('input'), {
    target: {value: 'admin1@test.com'},
  })
  fireEvent.change(screen.getByTestId("passwordField").querySelector('input'), {
    target: {value: 'admin123'},
  })
  fireEvent.click(screen.getByTestId("loginButton"))


  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(5000)
  expect(window.localStorage.getItem('access_token')).toEqual(fakeUserResponse.access_token)
})


