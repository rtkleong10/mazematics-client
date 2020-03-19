import React from 'react'
import { render, cleanup } from '@testing-library/react'
import ModalForm from './index.js';
import 'bootstrap/dist/js/bootstrap.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(
        <ModalForm
            title="Modal title"
            onClose={() => console.log("Closing...")}
            initialState={{}}
            isVisible={true}
            FormComponent={() => <p>Modal form</p>}
            />
    );
    expect(asFragment()).toMatchSnapshot();
})