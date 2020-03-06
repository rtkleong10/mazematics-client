import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import QuestionsList from '../QuestionsList';
import { retrieveLevel, selectPublishedLevel, selectLevelRetrieved } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    constructor(props) {
        super(props);

        const levelId = parseInt(props.match.params.level);
        props.retrieveLevel(levelId);
    }
    
    render() {
        const {
            levelRetrieved,
            level,
            match: {
                url
            }
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
                    <Link className="btn btn-primary" to={`${url}/leaderboard`}>
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
                                <LearningMaterial level={level.id} />
                            </div>
                        </div>
                        : <div className="mb-4">
                            <h2>Learning Material</h2>
                            <LearningMaterial level={level.id} />
                        </div>
                }
                <Link className="btn btn-primary mb-4" to={`${url}/game`}>
                    Play Game
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelId = parseInt(ownProps.match.params.level);

    return {
        levelRetrieved: selectLevelRetrieved(state),
        level: selectPublishedLevel(state, levelId),
    }
};

const dispatchers = {
    retrieveLevel,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);