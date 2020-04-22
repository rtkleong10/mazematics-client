import React from 'react'
import { render, cleanup } from '@testing-library/react'
import QuestionForm from './index.js';
import { EMPTY } from '../../../utils/constants.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(
        <QuestionForm
            options={{
                "0": 1,
                "1": 2,
            }}
            initialState={EMPTY}
            onSubmit={() => {}}
            />
    );
    expect(asFragment()).toMatchSnapshot();
});
