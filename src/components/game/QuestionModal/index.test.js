import React from 'react'
import { cleanup } from '@testing-library/react'
import QuestionForm from './index.js';
import { renderWithRedux } from "../../../utils/tests";

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = renderWithRedux(
        <QuestionForm
            levelId={1}
            onClose={() => {}}
            question={{
                id: 1,
                questionText: "1 + 1",
                options: {
                    "0": 1,
                    "1": 2,
                }
            }}
            isVisible={true}
            addPenalty={() => {}}
            />
    );
    expect(asFragment()).toMatchSnapshot();
});
