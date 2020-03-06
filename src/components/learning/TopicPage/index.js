import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import { retrieveTopic, selectTopicRetrieved, selectTopic } from '../../../redux/ducks/topics';
import { listLevels, selectLevelsListed, selectPublishedLevels } from '../../../redux/ducks/levels';

class TopicPage extends Component {
    constructor(props) {
        super(props);

        const topicId = parseInt(props.match.params.topic);
        props.retrieveTopic(topicId);
        props.listLevels();
    }

    render() {
        const {
            topicRetrieved,
            topic,
            levelsRetrieved,
            levels,
            match: {
                url
            }
        } = this.props;
        
        if (!topicRetrieved || !levelsRetrieved)
            return <Loader />;

        if (topicRetrieved && !topic)
            return <Redirect to="/not-found" />;
        
        return (
            <div className="container">
                <h1>{topic.title}</h1>
                <h2>Levels</h2>
                {
                    levels.length !== 0
                        ? levels.map((level) => (
                            <div href="#" className="card mb-4" key={level.id}>
                                <div className="card-body">
                                    <Link to={`${url}/${level.id}`}>
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
    const topicId = parseInt(ownProps.match.params.topic);

    return {
        topicRetrieved: selectTopicRetrieved(state),
        topic: selectTopic(state, topicId),
        levelsRetrieved: selectLevelsListed(state),
        levels: selectPublishedLevels(state, topicId),
    }
};

const dispatchers = {
    retrieveTopic,
    listLevels
};

export default connect(mapStateToProps, dispatchers)(TopicPage);