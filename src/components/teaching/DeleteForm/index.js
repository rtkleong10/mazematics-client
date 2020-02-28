import React, { Component, Fragment } from 'react'

export class DeleteForm extends Component {
    render() {
        const {
            onSubmit
        } = this.props;

        return (
            <Fragment>
                <button className="btn btn-danger mr-2" onClick={() => onSubmit(true)}>Confirm</button>
                <button className="btn btn-secondary" onClick={() => onSubmit(false)}>Cancel</button>
            </Fragment>
        )
    }
}

export default DeleteForm
