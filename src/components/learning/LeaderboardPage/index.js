import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import formatDuration from "format-duration";
import PropTypes from 'prop-types'

import { fetchLeaderboard, selectLeaderboardLoading, selectLeaderboardFailed, selectLeaderboard } from '../../../redux/ducks/progress';
import Loader from '../../common/Loader';

/**
 * This component displays the leaderboard for a level for a student. It is ranked based on completion time for a level.
 */
export class LeaderboardPage extends Component {
    componentDidMount() {
        const levelId = parseInt(this.props.match.params.levelId);
        this.props.fetchLeaderboard(levelId);
    }

    render() {
        const {
            match,
            leaderboardLoading,
            leaderboardFailed,
            leaderboard
        } = this.props;

        if (leaderboardLoading)
            return <Loader />;

        if (leaderboardFailed || !leaderboard)
            return <Redirect to="/not-found" />;

        const topicId = parseInt(match.params.topicId);
        const levelId = parseInt(match.params.levelId);

        return (
            <div className="container">
                <Link className="btn btn-light mb-2" to={`/topics/${topicId}/levels/${levelId}/`}>
                    <FontAwesomeIcon icon={faChevronLeft}/> Back to Level Page
                </Link>
                <h1>Leaderboard</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Timing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaderboard.length !== 0 && leaderboard 
                                ? (
                                    leaderboard.map(row =>
                                        <tr key={row.name}>
                                            <th scope="row">{row.name}</th>
                                            <td>{formatDuration(row.timing)}</td>
                                        </tr>
                                    )
                                )
                                : <tr>
                                    <td colSpan="2">No results found.</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

LeaderboardPage.propTypes = {
    /** An object containing the topic ID and level ID based on which data is displayed */
   match: PropTypes.object.isRequired,
   /** A boolean to determine if the leaderboard is still being loaded by the `fetchLeaderboard` action creator (true: still loading, false: fully loaded)*/
   leaderboardLoading: PropTypes.bool.isRequired,
   /** A boolean to determine if the leaderboard is still being loaded by the `fetchLeaderboard` action creator (true: still loading or failed to load, false: successful load) */
   leaderboardFailed: PropTypes.bool,
   /** An array of leaderboard rankings loaded by the `fetchLeaderboard` action creator */
   leaderboard: PropTypes.array.isRequired,
   /** An action creator for listing leaderboard rankings */
   fetchLeaderboard: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    leaderboardLoading: selectLeaderboardLoading(state),
    leaderboardFailed: selectLeaderboardFailed(state),
    leaderboard: selectLeaderboard(state),
});

const dispatchers = {
    fetchLeaderboard,
};

export default connect(mapStateToProps, dispatchers)(LeaderboardPage);