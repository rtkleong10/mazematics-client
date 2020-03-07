import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import { retrieveLevel, selectPlayableLevel, selectLevelRetrieved } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    constructor(props) {
        super(props);

        const levelID = parseInt(props.match.params.levelID);
        props.retrieveLevel(levelID);
    }
    
    render() {
        const {
            levelRetrieved,
            level,
        } = this.props;

        // TODO: Fetch this from API
        const viewedBefore = true;

        if (!levelRetrieved)
            return <Loader />;

        if (levelRetrieved && !level)
            return <Redirect to="/not-found" />;

        return (
            <div className="container">
                <h1>{level.title}</h1>
                <div className="mb-4">
                    <Link className="btn btn-primary" to={`/levels/${level.id}/leaderboard`}>
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
                                <LearningMaterial levelID={level.id} />
                            </div>
                        </div>
                        : <div className="mb-4">
                            <h2>Learning Material</h2>
                            <LearningMaterial levelID={level.id} />
                        </div>
                }
                <Link className="btn btn-primary mb-4" to={`/levels/${level.id}/game`}>
                    Play Game
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelID = parseInt(ownProps.match.params.levelID);

    return {
        levelRetrieved: selectLevelRetrieved(state),
        level: selectPlayableLevel(state, levelID),
    }
};

const dispatchers = {
    retrieveLevel,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);