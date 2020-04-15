import React from 'react';
import AdminPage from './index';
import { render, cleanup } from '@testing-library/react'
import { renderWithReduxRouter } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<AdminPage />);
    expect(asFragment()).toMatchSnapshot();
})
