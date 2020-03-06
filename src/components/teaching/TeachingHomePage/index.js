import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import ModalForm from '../../common/ModalForm';
import SimpleForm from '../SimpleForm';
import DeleteForm from '../DeleteForm';
import { createTopic, updateTopic, deleteTopic, listTopics, selectTopicsListed, selectTopics } from '../../../redux/ducks/topics';
import { CREATE, UPDATE, DELETE, EMPTY } from '../../../utils/constants';

class TeachingHomePage extends Component {
    constructor(props) {
        super(props);

        props.listTopics();

        this.state = {
            modalForm: {
                isVisible: false,
                type: null,
                selectedTopic: null,
            },
        }
    }

    openModalForm = (type, selectedTopic) => {
        this.setState({
            modalForm: {
                isVisible: true,
                type: type,
                selectedTopic: selectedTopic,
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
                selectedTopic
            },
        } = this.state;

        switch (type) {
            case CREATE:
                return (
                    <ModalForm
                        title="Create a Topic"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={EMPTY}
                        onSubmit={this.props.createTopic}
                        />
                );

            case UPDATE:
                return (
                    <ModalForm
                        title="Edit Topic"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={SimpleForm}
                        initialState={selectedTopic}
                        onSubmit={topic => this.props.updateTopic({...topic, id: selectedTopic.id})}
                        />
                );

            case DELETE:
                return (
                    <ModalForm
                        title="Delete Topic"
                        isVisible={isVisible}
                        onClose={this.handleModalClose}
                        FormComponent={DeleteForm}
                        onSubmit={isConfirm => isConfirm && this.props.deleteTopic(selectedTopic.id)}
                        />
                );

            default:
                return null;
        }
    }

    render() {
        const {
            topicsListed,
            topics,
            user
        } = this.props;

        if (!topicsListed)
            return <Loader />

        const modalFormComponent = this.getModalFormComponent();
        
        return (
            <div className="container">
                <h1>Welcome {user.name}!</h1>
                <div className="d-sm-flex w-100 justify-content-between">
                    <h2>Topics</h2>
                    <div className="mb-4">
                        <button className="btn btn-primary" onClick={() => this.openModalForm(CREATE, null)}>
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />Create a Topic
                        </button>
                    </div>
                </div>
                {
                    topics.length !== 0
                        ? topics.map((topic) => (
                            <div href="#" className="card mb-4" key={topic.id}>
                                <div className="card-body">
                                    <Link to={`/${topic.id}`}>
                                        <h3 className="card-title">{topic.title}</h3>
                                    </Link>
                                    <p className="card-text">{topic.description}</p>
                                    <div>
                                        <button className="ml-auto btn btn-success mr-2" onClick={() => this.openModalForm(UPDATE, topic)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="ml-auto btn btn-danger" onClick={() => this.openModalForm(DELETE, topic)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p>No teaching topics found.</p>
                }
                {modalFormComponent}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
    user: state.authReducer.user,
    topicsListed: selectTopicsListed(state),
    topics: selectTopics(state),
})};

const dispatchers = {
    createTopic,
    updateTopic,
    deleteTopic,
    listTopics,
};

export default connect(mapStateToProps, dispatchers)(TeachingHomePage);
