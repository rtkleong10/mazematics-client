import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import { YOUTUBE_LINK_PATTERN } from '../../../utils/constants';

/** This component displays a learning material*/
export default function LearningMaterial(props) {
    const {
        classes,
        editable,
        learningMaterial,
        learningMaterial: {
            title,
            description,
            link,
        },
        handleUpdate,
        handleDelete,
    } = props;

    return (
        <div className={`card${classes ? ` ${classes}` : ""}`}>
            {
                YOUTUBE_LINK_PATTERN.test(link) &&
                <div className="video-box card-img-top">
                    <div>
                        <iframe
                            title="Learning Material Video"
                            src={link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                    </div>
                </div>
            }
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{description}</p>
                {
                    editable &&
                    <div>
                        <button className="btn btn-success mr-2" onClick={() => handleUpdate(learningMaterial)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(learningMaterial)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

LearningMaterial.propTypes = {
    /** A string storing the html to be included in the component */
    classes: PropTypes.string,
    /** A boolean to determine if the learning material object is editable or not (true: editable, false: cannot be edited) */
    editable: PropTypes.bool.isRequired,
    /** A learning material object containing the title, description, and link */
    learningMaterial: PropTypes.object.isRequired,

    /** An action creator for handling learning material update request */
    handleUpdate: PropTypes.func,
    /** An action creator for handling learning material deletion request */
    handleDelete: PropTypes.func,
};