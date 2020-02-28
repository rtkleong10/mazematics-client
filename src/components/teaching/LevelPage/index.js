import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import LearningMaterial from '../LearningMaterial';
import QuestionsList from '../QuestionsList';
import { retrieveLevels } from '../../../redux/ducks/levels';

export class LevelPage extends Component {
    constructor(props) {
        super(props);

        props.retrieveLevels();
    }
    
    render() {
        const {
            levelsRetrieved,
            level,
            match: {
                url
            }
        } = this.props;

        if (!levelsRetrieved)
            return <Loader />;

        if (levelsRetrieved && !level)
            return <Redirect to="/not-found" />;

        return (
          <div className="container">
            <h1>{level.title}</h1>
            <div className="mb-4">
                <Link className="btn btn-primary" to={`${url}/student-reports`}>
                    View Student Reports
                </Link>
            </div>
            <h2>Learning Material</h2>
            <LearningMaterial level={level.id} />
            <br />
            <h2>Questions</h2>
            <QuestionsList level={level.id} />
          </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const levelId = parseInt(ownProps.match.params.level);

    return {
        levelsRetrieved: state.levelsReducer.levelsRetrieved,
        level: state.levelsReducer.levels.find(level => level.id === levelId),
    }
};

const dispatchers = {
    retrieveLevels,
};

export default connect(mapStateToProps, dispatchers)(LevelPage);