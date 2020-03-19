import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { renderWithRouter, renderWithReduxRouter } from '../../../utils/tests.js';
import TeachingRouter from './index.js';

afterEach(cleanup);

it('should render not found page if the route is bad', () => {
    const { getByRole } = render(renderWithReduxRouter(renderWithRouter(<TeachingRouter />, '/bad-route'))); 
    expect(getByRole('heading')).toHaveTextContent('404 Not Found');
})