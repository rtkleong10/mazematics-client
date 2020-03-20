import React from 'react'
import { cleanup } from '@testing-library/react'
import NotFoundPage from './index.js';
import { renderWithRouter } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithRouter(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
})