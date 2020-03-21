import React from 'react'
import { render, cleanup } from '@testing-library/react'
import fetchUsers, { createUser } from './adminActions.js';

import updateUser from './adminActions.js';
import deleteUser from './adminActions.js';


afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<fetchUsers />);
    expect(asFragment()).toMatchSnapshot();
});

it('should take a snapshot', () => {
    const { asFragment } = render(<createUser />);
    expect(asFragment()).toMatchSnapshot();
});

it('should take a snapshot', () => {
    const { asFragment } = render(<updateUser />);
    expect(asFragment()).toMatchSnapshot();
});

it('should take a snapshot', () => {
    const { asFragment } = render(<deleteUser />);
    expect(asFragment()).toMatchSnapshot();
});