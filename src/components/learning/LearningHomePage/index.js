import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../common/Loader';
import { listTopics, selectTopicsListed, selectTopics } from '../../../redux/ducks/topics';

class LearningHomePage extends Component {
    constructor(props) {
        super(props);

        props.listTopics();
    }

    render() {
        const {
            topicsListed,
            topics,
            user
        } = this.props;

        if (!topicsListed)
            return <Loader />
        
        return (
            <div className="container">
                <h1>Welcome {user.name}!</h1>
                <h2>Topics</h2>
                {
                    topics.length !== 0
                        ? topics.map((topic) => (
                            <div href="#" className="card mb-4" key={topic.id}>
                                <div className="card-body">
                                    <Link to={`/topics/${topic.id}`}>
                                        <h3 className="card-title">{topic.title}</h3>
                                    </Link>
                                    <p className="card-text">{topic.description}</p>
                                </div>
                            </div>
                        ))
                        : <p>No topics found.</p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    topicsListed: selectTopicsListed(state),
    topics: selectTopics(state),
});

const dispatchers = {
    listTopics,
};

export default connect(mapStateToProps, dispatchers)(LearningHomePage);
