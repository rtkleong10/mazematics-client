import React from 'react'
import PropTypes from 'prop-types'
/** This component displays a delete form */
export default function DeleteForm(props) {
    const {
        onSubmit
    } = props;

    return (
        <>
            <button className="btn btn-danger mr-2" onClick={() => onSubmit(true)}>Confirm</button>
            <button className="btn btn-secondary" onClick={() => onSubmit(false)}>Cancel</button>
        </>
    )
}

DeleteForm.propTypes = {
    /** The function to call when the form is submitted */
    onSubmit: PropTypes.func.isRequired,
}