import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import SimpleForm from '../SimpleForm';
import DeleteForm from '../DeleteForm';
import { createLearningMaterial, listLearningMaterials, updateLearningMaterial, deleteLearningMaterial, selectLearningMaterialsListed, selectLearningMaterial } from '../../../redux/ducks/learningMaterials';
import './styles.css';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';

export class LearningMaterial extends Component {
    constructor(props) {
        super(props);

        props.listLearningMaterials();
        
        this.state = {
            modalForm: {
                isVisible: false,
                type: null,
                selectedLearningMaterial: null,
            },
        }
    }

    openModalForm = (type, selectedLearningMaterial) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedLearningMaterial: selectedLearningMaterial,
            }
        });
    }

    handleModalClose = () => {
        this.setState({
            modalForm: {
                ...this.state.modalForm,
                isVisible: false,
            }
        });
    }

    getModalFormComponent = () => {
        const {
            modalForm: {
                isVisible,
                type,
                selectedLearningMaterial
            },
        } = this.state;

        const {
            level
        } = this.props;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Learning Material"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={EMPTY}
                        onSubmit={question => this.props.createLearningMaterial({...question, level: level})}
                        />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Learning Material"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={selectedLearningMaterial}
                        onSubmit={question => this.props.updateLearningMaterial({...question, id: selectedLearningMaterial.id})}
                        />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Learning Material"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteLearningMaterial(selectedLearningMaterial.id)}
                        />
                );

            default:
                return null;
        }
    }

    render() {
        const {
            learningMaterialsListed,
            learningMaterial
        } = this.props;

        if (!learningMaterialsListed)
            return <Loader />;

        const modalFormComponent = this.getModalFormComponent();

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
                                <button href="#" className="btn btn-success mr-2" onClick={() => this.openModalForm(UPDATE, learningMaterial)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button href="#" className="btn btn-danger" onClick={() => this.openModalForm(DELETE, learningMaterial)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                        : <div>
                            <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Learning Material
                            </button>
                        </div>
                }
                {modalFormComponent}
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelId = ownProps.level;

    return {
        learningMaterialsListed: selectLearningMaterialsListed(state),
        learningMaterial: selectLearningMaterial(state, levelId),
    }
};

const dispatchers = {
    createLearningMaterial,
    listLearningMaterials,
    updateLearningMaterial,
    deleteLearningMaterial
};

export default connect(mapStateToProps, dispatchers)(LearningMaterial);
