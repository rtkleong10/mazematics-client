import React from 'react'
import { render, cleanup } from '@testing-library/react'
import refreshToken from './refreshToken.js';


afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(<refreshToken />);
    expect(asFragment()).toMatchSnapshot();
});
