import React from 'react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { renderWithReduxRouter } from '../../../utils/tests.js';
import TeachingRouter from './index.js';

afterEach(cleanup);

it('should render not found page if the route is bad', () => {
    const { getByRole } = renderWithReduxRouter(<TeachingRouter />, {}, '/bad-route'); 
    expect(getByRole('heading')).toHaveTextContent('404 Not Found');
})