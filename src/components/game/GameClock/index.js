import React from "react";
import formatDuration from "format-duration";
import PropTypes from 'prop-types';

import PokemonClock from "./pokemonClock.png";
import "./styles.css";

/**
 * This component creates the function of the game's timer which is used to rank players based on completion time for a level.
 * This component displays a game clock.
 */
export default function GameClock(props) {
    const {
        elapsedTime,
        penaltyTime,
    } = props;

    return (
        <div className="clock d-flex align-items-center">
            <img
                src={PokemonClock}
                alt="Pokemon Clock"
                width="20px"
                height="20px"
                className="mr-2"
            />
            <small className="mr-2">
                {formatDuration(elapsedTime)}
            </small>
            <small className="text-danger">
                Penalty: {penaltyTime / 1000}s
            </small>
        </div>
    );
}

GameClock.propTypes = {
    /** The elapsed time in milliseconds (excluding penalty time) */
    elapsedTime: PropTypes.number.isRequired,
    /** The penalty time in milliseconds */
    penaltyTime: PropTypes.number.isRequired,
}