import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

/** This component displays a question */
export default function Question(props) {
    const {
        classes,
        editable,
        question,
        question: {
            questionText,
            options,
            answer,
        },
        handleUpdate,
        handleDelete,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ""}`}>
            <h3 className="card-header">{questionText}</h3>
            <ul className="list-group list-group-flush">
                {
                    options.map((option, i) =>
                        <li className="list-group-item" key={i}>
                            {option}&nbsp;
                            {
                                i === answer &&
                                    <FontAwesomeIcon icon={faCheck} className="text-success"/>
                            }
                        </li>
                    )
                }
            </ul>
            {
                editable &&
                    <div className="card-body">
                        <button className="btn btn-success mr-2" onClick={() => handleUpdate(question)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(question)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
            }
        </div>
    )
}


Question.propTypes = {
    /** A string storing the name of the class of the question */
    classes: PropTypes.string,
    /** A boolean to determine if the question object is editable or not (true: editable, false: cannot be edited) */
    editable: PropTypes.bool.isRequired,
    /** A question object containing the question text, options, and correct answer */
    question: PropTypes.object.isRequired,

    /** An action creator for handling question update request */
    handleUpdate: PropTypes.func,

    /** An action creator for handling question deletion request */
    handleDelete: PropTypes.func,
};