import React from 'react'
import { render, cleanup } from '@testing-library/react'
import LearningMaterialForm from './index.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<LearningMaterialForm />);
    expect(asFragment()).toMatchSnapshot();
})