import React from 'react'
import { render, cleanup } from '@testing-library/react'
import DeleteForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<DeleteForm />);
    expect(asFragment()).toMatchSnapshot();
})