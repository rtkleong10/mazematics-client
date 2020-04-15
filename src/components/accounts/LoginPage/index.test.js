import React from 'react'
import { render, cleanup, fireEvent, screen } from '@testing-library/react'
import LoginPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

describe('Unit Testing for Login Page', () => {

afterEach(() => {
    cleanup();
});

const delay = ms => new Promise(res => setTimeout(res, ms));

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
  await delay(1000)
  expect(window.localStorage.getItem('access_token')).toEqual(fakeUserResponse.access_token)
  window.localStorage.removeItem('access_token')
})

it('wrong password reject user login ', async () => {
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.reject(),
    })
  })
  renderWithReduxRouter(<LoginPage />)
  fireEvent.change(screen.getByTestId("usernameField").querySelector('input'), {
    target: {value: 'admin1@test.com'},
  })
  fireEvent.change(screen.getByTestId("passwordField").querySelector('input'), {
    target: {value: 'wrong password'},
  })
  fireEvent.click(screen.getByTestId("loginButton"))
  await delay(1000)
  expect(window.localStorage.getItem('access_token')).toEqual(null)
})

})