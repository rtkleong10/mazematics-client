import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'

import Loader from '../../common/Loader';
import World from "../World";
import { retrieveLevel, selectPlayableLevel, selectLevelLoading, selectLevelFailed } from '../../../redux/ducks/levels';
import { listQuestions, selectQuestions, selectQuestionsFailed, selectQuestionsLoading } from '../../../redux/ducks/questions';
import { generateTiles } from "../../../utils/maze";

/**
 * This component displays the GamePage for user. It contains the world component.
 */
export class GamePage extends Component {
    componentDidMount() {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.retrieveLevel(topicId, levelId);
        this.props.listQuestions(levelId);
    }

    handleCompleteGame = () => {
        const topicId = parseInt(this.props.match.params.topicId);
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.history.push(`/topics/${topicId}/levels/${levelId}`);
    }

    render() {
        const {
            levelLoading,
            levelFailed,
            level,
            questionsLoading,
            questionsFailed,
            questions,
        } = this.props;

        if (levelLoading || questionsLoading)
            return <Loader />;

        if (levelFailed || !level || questionsFailed || !questions) {
            return <Redirect to="/not-found" />;
        }

        const mapDescriptor = level.mapDescriptor;
        let tiles = generateTiles(mapDescriptor, questions);

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${level.topic}/levels/${level.id}`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Level Page
                </Link>
                <h1>Game</h1>
                <div className="card">
                    <h2 className="card-header">How to Play</h2>
                    <div className="card-body">
                        <ul>
                            <li>Goal: Reach the house in the shortest amount of time</li>
                            <li>Use the arrow keys to move around.</li>
                            <li>To get rid of a blocking Pokemon, press spacebar when facing it and answer the question. There's a 10s penalty for every incorrect answer.</li>
                            <li>To complete the game, navigate to the house and press spacebar when facing it.</li>
                        </ul>
                    </div>
                </div>
                <World levelId={level.id} tiles={tiles} questions={questions} onCompleteGame={this.handleCompleteGame} />
            </div>
        )
    }
}

GamePage.propTypes = {
    /** An object containing the topic ID and level ID based on which data is displayed */
    match: PropTypes.object.isRequired,

    /** A boolean to determine if the level is still being loaded by the `retrieveLevel` action creator (true: still loading, false: fully loaded) */
    levelLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the level failed to be loaded by the `retrieveLevel` action creator (true: still loading or failed to load, false: successful load) */
    levelFailed: PropTypes.bool,
    /** A level object loaded by the `retrieveLevel` action creator */
    level: PropTypes.object,

    /** A boolean to determine if the questions are still being loaded by the `listQuestions` action creator (true: still loading, false: fully loaded) */
    questionsLoading: PropTypes.bool.isRequired,
    /** A boolean to determine if the questions failed to be loaded by the `listQuestions` action creator (true: still loading or failed to load, false: successful load) */
    questionsFailed: PropTypes.bool,
    /** An array of question objects loaded by the `listQuestions` action creator */
    questions: PropTypes.array,

    /** An action creator for retrieving level name */
    retrieveLevel: PropTypes.func.isRequired,
    /** An action creator for listing questions */
    listQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    levelLoading: selectLevelLoading(state),
    levelFailed: selectLevelFailed(state),
    level: selectPlayableLevel(state),

    questionsLoading: selectQuestionsLoading(state),
    questionsFailed: selectQuestionsFailed(state),
    questions: selectQuestions(state),
});

const dispatchers = {
    retrieveLevel,
    listQuestions,
};

export default connect(mapStateToProps, dispatchers)(GamePage);
