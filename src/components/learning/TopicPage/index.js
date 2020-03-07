import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../common/Loader';
import { retrieveTopic, selectTopicRetrieved, selectTopic } from '../../../redux/ducks/topics';
import { listLevels, selectLevelsListed, selectPlayableLevels } from '../../../redux/ducks/levels';

class TopicPage extends Component {
    constructor(props) {
        super(props);

        const topicID = parseInt(props.match.params.topicID);
        props.retrieveTopic(topicID);
        props.listLevels();
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
        
        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to="/">
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Home
                </Link>
                <h1>{topic.title}</h1>
                <h2>Levels</h2>
                {
                    levels.length !== 0
                        ? levels.map((level) => (
                            <div href="#" className="card mb-4" key={level.id}>
                                <div className="card-body">
                                    <Link to={`/levels/${level.id}`}>
                                        <h3 className="card-title">{level.title}</h3>
                                    </Link>
                                    <p className="card-text">{level.description}</p>
                                </div>
                            </div>
                        ))
                        : <p>No levels found.</p>
                }
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
        levels: selectPlayableLevels(state, topicID),
    }
};

const dispatchers = {
    retrieveTopic,
    listLevels
};

export default connect(mapStateToProps, dispatchers)(TopicPage);