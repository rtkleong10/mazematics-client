import React, { Component } from 'react';
import $ from 'jquery';

export class Modal extends Component {
    componentDidMount() {
        this.updateModal();
        $(this.modal).on('hidden.bs.modal', e => this.props.onClose());
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.isVisible !== prevProps.isVisible) {
            this.updateModal();
        }
    }

    updateModal() {
        if (this.props.isVisible)
            $(this.modal).modal('show');
        else {
            $(this.modal).modal('hide');
        }
    }

    render() {
        const {
            title,
            children,
            onClose,
        } = this.props;

        return (
            <div className="modal fade" ref={modal => this.modal = modal} tabIndex="-1" data-testid="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal
