import React from 'react'
import { render, cleanup } from '@testing-library/react'
import SimpleForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<SimpleForm />);
    expect(asFragment()).toMatchSnapshot();
})