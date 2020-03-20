import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Loader from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
})