import React from 'react'
import { render, cleanup } from '@testing-library/react'
import AccountsRouter from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<AccountsRouter />);
    expect(asFragment()).toMatchSnapshot();
})
