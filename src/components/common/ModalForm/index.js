import React, { Component } from 'react';

import Modal from '../Modal';

export class ModalForm extends Component {
    handleSubmit = (...args) => {
        this.props.onSubmit(...args);
        this.props.onClose();
    }

    render() {
        const {
            title,
            isVisible,
            onClose,
            initialState,
            FormComponent
        } = this.props;

        return (
            <Modal
                title={title}
                isVisible={isVisible}
                onClose={onClose}>
                    <FormComponent onSubmit={this.handleSubmit} initialState={isVisible ? initialState : null} />
            </Modal>
        )
    }
}

export default ModalForm;
