import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Modal from './index.js';
import 'bootstrap/dist/js/bootstrap.js';

afterEach(cleanup);

it('should take a snapshot', () => {
    const { asFragment } = render(
        <Modal title="Modal title" onClose={() => console.log("Closing...")}>
            <p>Modal body</p>
        </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
})