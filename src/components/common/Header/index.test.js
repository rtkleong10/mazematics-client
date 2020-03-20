import React from 'react'
import { cleanup } from '@testing-library/react'
import Header from './index.js';
import { renderWithReduxRouter } from '../../../utils/tests.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithReduxRouter(<Header />);
    expect(asFragment()).toMatchSnapshot();
})