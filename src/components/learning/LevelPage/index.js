import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import { retrieveLevel, selectPlayableLevel, selectLevelLoading, selectLevelFailed } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    constructor(props) {
        super(props);

        const topicId = parseInt(props.match.params.topicId);
        const levelId = parseInt(props.match.params.levelId);
        props.retrieveLevel(topicId, levelId);
    }
    
    render() {
        const {
            levelLoading,
            levelFailed,
            level,
        } = this.props;

        // TODO: Fetch this from API
        const viewedBefore = true;

        if (levelLoading)
            return <Loader />;

        if (levelFailed || !level)
            return <Redirect to="/not-found" />;

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${level.topic.id}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Topic Page
                </Link>
                <h1>{level.title}</h1>
                <div className="mb-4">
                    <Link className="btn btn-primary" to={`/topics/${level.topic.id}/levels/${level.id}/leaderboard`}>
                        View Leaderboard
                    </Link>
                </div>
                {
                    viewedBefore
                        ? <div>
                            <button className="btn btn-primary mb-4" type="button" data-toggle="collapse" data-target="#learningMaterialCollapse">
                                View Learning Material
                            </button>
                            <div className="collapse mb-4" id="learningMaterialCollapse">
                                <LearningMaterial levelId={level.id} />
                            </div>
                        </div>
                        : <div className="mb-4">
                            <h2>Learning Material</h2>
                            <LearningMaterial levelId={level.id} />
                        </div>
                }
                <Link className="btn btn-primary mb-4" to={`/topics/${level.topic.id}/levels/${level.id}/game`}>
                    Play Game
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    levelLoading: selectLevelLoading(state),
    levelFailed: selectLevelFailed(state),
    level: selectPlayableLevel(state),
});

const dispatchers = {
    retrieveLevel,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);