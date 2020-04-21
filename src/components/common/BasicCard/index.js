import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
/**This component is used to display an item with a title and description */
export default function BasicCard(props) {
    const {
        classes,
        editable,
        details,
        details: {
            title,
            description,
        },
        badge,
        link,
        handleUpdate,
        handleDelete,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ""}`}>
            <div className="card-body">
                <h3 className="card-title">
                    <Link to={link}>{title}</Link> {badge}
                </h3>
                <p className="card-text">{description}</p>
                {
                    editable &&
                        <div>
                            <button className="ml-auto btn btn-success mr-2" onClick={() => handleUpdate(details)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="ml-auto btn btn-danger" onClick={() => handleDelete(details)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

BasicCard.propTypes = {
     /** A string storing the html to be included in the component */
    classes: PropTypes.string,
    /** A boolean to determine if the item is editable or not (true: editable, false: cannot be edited) */
    editable: PropTypes.bool.isRequired,
    /** An object containing the item's title and description */
    details: PropTypes.object.isRequired,
    /** A badge for the component */
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
    /** A string storing a link for the item title */
    link: PropTypes.string.isRequired,
    /** An action creator for handling item update request */
    handleUpdate: PropTypes.func,
    /** An action creator for handling item deletion request */
    handleDelete: PropTypes.func,
}