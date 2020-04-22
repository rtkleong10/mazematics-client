import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { QuestionForm } from '../QuestionForm';
import { submitAnswer, selectAnswerResult, selectAnswerResultFailed } from '../../../redux/ducks/progress';
import Modal from '../../common/Modal';
import { EMPTY } from '../../../utils/constants';

export class QuestionModal extends Component {
    state = {
        attempts: 0
    };

    handleClose = isCorrect => {
        const penaltyCount = isCorrect ? this.state.attempts - 1 : this.state.attempts;
        this.props.addPenalty(penaltyCount);
        this.props.onClose(isCorrect);

        this.setState({
            attempts: 0
        });
    }

    handleSubmit = answer => {
        const {
            levelId,
            question,
            submitAnswer,
        } = this.props;
        
        submitAnswer(levelId, question.id, answer);

        this.setState({
            attempts: this.state.attempts + 1
        });
    }

    render() {
        const {
            question,
            isVisible,
            answerResult,
        } = this.props;

        const isCorrect = (answerResult.question === question.id) ? answerResult.isCorrect : null;

        if (isCorrect === true) {
            return (
                <Modal
                    title="Correct Answer"
                    isVisible={isVisible}
                    onClose={() => this.handleClose(true)}>
                        <button className="btn btn-success" onClick={() => this.handleClose(true)}>Return to Maze</button>
                </Modal>
            )
        }

        return (
            <Modal
                title={question.questionText}
                isVisible={isVisible}
                onClose={() => this.handleClose(false)}>
                    {isCorrect === false && <p className="text-danger">Incorrect Answer</p>}
                    <QuestionForm
                        options={question.options}
                        onSubmit={this.handleSubmit}
                        initialState={isVisible ? EMPTY : null}
                        />
            </Modal>
        )
    }
};

QuestionModal.propTypes = {
    /** A number to indicate the level user is currently on */
    levelId: PropTypes.number.isRequired,
    /** A function to call when user submits a correct answer */
    onClose: PropTypes.func.isRequired,
    /** A question object displayed on Question Model and is fetched by API*/
    question: PropTypes.object.isRequired,
    /** A boolean to indicate if Question Form Modal is visible to player */
    isVisible: PropTypes.bool.isRequired,
    /** A function to add penalty time */
    addPenalty: PropTypes.func.isRequired,

    /** A boolean to determine if the answer result failed to be loaded by the `submitAnswer` action creator (true: still loading or failed to load, false: successful load) */
    answerResultFailed: PropTypes.bool,
    /** A answer result object to indicate whether the user's selected option is correct */
    answerResult: PropTypes.object,
    
    /** A function to call when the user clicks submit button, function contains parameters of user's answer, question id, and level id */
    submitAnswer: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    answerResultFailed: selectAnswerResultFailed(state), 
    answerResult: selectAnswerResult(state),
});

const dispatchers = {
    submitAnswer,
};

export default connect(mapStateToProps, dispatchers)(QuestionModal);
