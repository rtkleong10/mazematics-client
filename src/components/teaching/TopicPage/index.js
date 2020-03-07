import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import SimpleForm from '../SimpleForm';
import DeleteForm from '../DeleteForm';
import { retrieveTopic, selectTopicRetrieved, selectTopic } from '../../../redux/ducks/topics';
import { createLevel, updateLevel, deleteLevel, listLevels, selectLevelsListed, selectLevels } from '../../../redux/ducks/levels';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';

class TopicPage extends Component {
    constructor(props) {
        super(props);

        const topicID = parseInt(props.match.params.topicID);
        props.retrieveTopic(topicID);
        props.listLevels();

        this.state = {
            modalForm: {
                isVisible: false,
                type: null,
                selectedLevel: null,
            },
        }
    }

    openModalForm = (type, selectedLevel) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedLevel: selectedLevel,
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
                selectedLevel
            },
        } = this.state;

        const {
            topic
        } = this.props;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Level"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={EMPTY}
                        onSubmit={level => this.props.createLevel({...level, topic: topic.id})}
                        />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Level"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={selectedLevel}
                        onSubmit={level => this.props.updateLevel({...level, id: selectedLevel.id})}
                        />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Level"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteLevel(selectedLevel.id)}
                        />
                );

            default:
                return null;
        }
    }

    render() {
        const {
            topicRetrieved,
            topic,
            levelsRetrieved,
            levels,
        } = this.props;
        
        if (!topicRetrieved || !levelsRetrieved)
            return <Loader />;

        if (topicRetrieved && !topic)
            return <Redirect to="/not-found" />;

        const modalFormComponent = this.getModalFormComponent();
        
        return (
            <div className="container">
                <h1>{topic.title}</h1>
                <h2>Levels</h2>
                <div className="mb-4">
                    <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Level
                    </button>
                </div>
                {
                    levels.length !== 0
                        ? levels.map((level) => (
                            <div href="#" className="card mb-4" key={level.id}>
                                <div className="card-body">
                                    <Link to={`/levels/${level.id}`}>
                                        <h3 className="card-title">{level.title}</h3>
                                    </Link>
                                    <p className="card-text">{level.description}</p>
                                    <div>
                                        <button className="ml-auto btn btn-success mr-2" onClick={() => this.openModalForm(UPDATE, level)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="ml-auto btn btn-danger" onClick={() => this.openModalForm(DELETE, level)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p>No levels found.</p>
                }
                {modalFormComponent}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const topicID = parseInt(ownProps.match.params.topicID);

    return {
        topicRetrieved: selectTopicRetrieved(state),
        topic: selectTopic(state, topicID),
        levelsRetrieved: selectLevelsListed(state),
        levels: selectLevels(state, topicID),
    }
};

const dispatchers = {
    retrieveTopic,
    createLevel,
    updateLevel,
    deleteLevel,
    listLevels
};

export default connect(mapStateToProps, dispatchers)(TopicPage);