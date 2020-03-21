import React from 'react'
import { render, cleanup } from '@testing-library/react'
import {fetchMe, authenticateLogin }from './loginActions.js';


afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<fetchMe />);
    expect(asFragment()).toMatchSnapshot();
});

it('should take a snapshot', () => {
    const { asFragment } = render(<authenticateLogin />);
    expect(asFragment()).toMatchSnapshot();
});

