import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import { createLearningMaterial, retrieveLearningMaterials, updateLearningMaterial, deleteLearningMaterial } from '../../../redux/ducks/learningMaterials';
import './styles.css';

export class LearningMaterial extends Component {
    constructor(props) {
        super(props);

        props.retrieveLearningMaterials();
    }

    render() {
        const {
            learningMaterialsRetrieved,
            learningMaterial
        } = this.props;

        if (!learningMaterialsRetrieved)
            return <Loader />;

        return (
            <Fragment>
                {
                    learningMaterial
                        ? <div className="card">
                            <div className="video-box card-img-top">
                                <div>
                                    <iframe
                                        title="Learning Material Video"
                                        src={learningMaterial.link}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                                </div>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{learningMaterial.title}</h3>
                                <p className="card-text">{learningMaterial.description}</p>
                                <button href="#" className="btn btn-success mr-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button href="#" className="btn btn-danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                        : <p>No learning material found.</p>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelId = ownProps.level;

    return {
        learningMaterialsRetrieved: state.learningMaterialsReducer.learningMaterialsRetrieved,
        learningMaterial: state.learningMaterialsReducer.learningMaterials.find(learningMaterial => learningMaterial.level === levelId)
    }
};

const dispatchers = {
    createLearningMaterial,
    retrieveLearningMaterials,
    updateLearningMaterial,
    deleteLearningMaterial
};

export default connect(mapStateToProps, dispatchers)(LearningMaterial);
