import React from 'react'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import LoginPage from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';
import tokenJson from './../../../integrationTests/admin/json/token.json';
afterEach(() => {
  cleanup();
});

it('should take a snapshot', () => {
  const { asFragment } = renderWithReduxRouter(<LoginPage />);
  expect(asFragment()).toMatchSnapshot();
})

const delay = ms => new Promise(res => setTimeout(res, ms));

it('allows the user to login successfully', async () => {
  const fakeUserResponse = {access_token: 'fake_user_token'}
  jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
    return Promise.resolve({
      json: () => Promise.resolve(tokenJson),
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
  expect(window.localStorage.getItem('access_token')).toEqual(tokenJson.access_token)
  expect(window.localStorage.getItem('refresh_token')).toEqual(tokenJson.refresh_token)
  expect(parseInt(window.localStorage.getItem('expires_in'))).toEqual(parseInt(tokenJson.expires_in))
  window.localStorage.removeItem('access_token')
  window.localStorage.removeItem('refresh_token')
  window.localStorage.removeItem('expires_in')
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
  expect(window.localStorage.getItem('refresh_token')).toEqual(null)
  expect(window.localStorage.getItem('expires_in')).toEqual(null)
})

