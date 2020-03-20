import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

ModalForm.propTypes = {
    title: PropTypes.string,
    isVisible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    initialState: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    FormComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired, // React Component
};

export default ModalForm;
