import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Footer from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
})