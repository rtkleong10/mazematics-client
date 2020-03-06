import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import { createQuestion, listQuestions, updateQuestion, deleteQuestion, selectQuestionsListed, selectQuestions } from '../../../redux/ducks/questions';

export class QuestionsList extends Component {
    constructor(props) {
        super(props);

        props.listQuestions();
    }

    render() {
        const {
            questionsListed,
            questions
        } = this.props;

        if (!questionsListed)
            return <Loader />;

        return (
            <Fragment>
                <ul className="list-group">
                    {
                        questions.length !== 0
                            ? questions.map((question) => (
                                <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{question.title}</span>
                                    <div>
                                        <button href="#" className="btn btn-success mr-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button href="#" className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </li>
                            ))
                            : <p>No questions found.</p>
                    }
                </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelId = ownProps.level;

    return {
        questionsListed: selectQuestionsListed(state),
        questions: selectQuestions(state, levelId)
    }
};

const dispatchers = {
    createQuestion,
    listQuestions,
    updateQuestion,
    deleteQuestion
};

export default connect(mapStateToProps, dispatchers)(QuestionsList);
