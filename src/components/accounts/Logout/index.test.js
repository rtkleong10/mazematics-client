import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Logout from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<Logout />);
    expect(asFragment()).toMatchSnapshot();
})
