import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import QuestionsList from '../QuestionsList';
import { retrieveLevel, selectLevel, selectLevelRetrieved } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    constructor(props) {
        super(props);

        const levelId = parseInt(props.match.params.level);
        props.retrieveLevel(levelId);
    }

    onPublish = () => {
        // TODO: Publish
        console.log("publish");
    }
    
    render() {
        const {
            levelRetrieved,
            level,
            match: {
                url
            }
        } = this.props;

        if (!levelRetrieved)
            return <Loader />;

        if (levelRetrieved && !level)
            return <Redirect to="/not-found" />;

        return (
          <div className="container">
            <h1>{level.title} <span className="badge badge-secondary">{level.isPublished ? 'Published' : 'Unpublished'}</span></h1>
            <div className="mb-4">
                {
                    level.isPublished
                        ? <Link className="btn btn-primary" to={`${url}/student-reports`}>
                            View Student Reports
                        </Link>
                        : <button className="btn btn-primary" onClick={this.onPublish}>
                            Publish Level
                        </button>
                }
            </div>
            <h2>Learning Material</h2>
            <LearningMaterial level={level.id} isPublished={level.isPublished} />
            <br />
            <h2>Questions</h2>
            <QuestionsList level={level.id} isPublished={level.isPublished} />
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelId = parseInt(ownProps.match.params.level);

    return {
        levelRetrieved: selectLevelRetrieved(state),
        level: selectLevel(state, levelId),
    }
};

const dispatchers = {
    retrieveLevel,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);