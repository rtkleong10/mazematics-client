import React, { Component } from "react";
import PropTypes from 'prop-types'

import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
import "./styles.css";

function getTileSprite(type) {
    switch (type) {
        case 0:
            return "grass";

        case 4:
            return "house";

        case 5:
            return "rock";

        case 6:
            return "tree";

        case 7:
            return "snorlax";

        case 8:
            return "pikachu";

        case 9:
            return "charizard";

        case 10:
            return "bulbasaur";

        case 11:
            return "dratini";

        case 12:
            return "jigglypuff";

        case 13:
            return "mario";

        case 14:
            return "farfetch";

        case 15:
            return "whale";
            
        default:
            break;
    }
}

function MapTile(props) {
    return (
        <div
            className={`tile ${getTileSprite(props.tile)}`}
            style={{
                height: SPRITE_SIZE,
                width: SPRITE_SIZE
            }}
        >
            {/* {props.tile} */}
        </div>
    );
}

function MapRow(props) {
    return (
        <div
            style={{
                height: SPRITE_SIZE
            }}
        >
            {props.tiles.map((tile, i) => (
                <MapTile key={i} tile={tile} />
            ))}
        </div>
    );
}

/**
 * This component creates the tiles of the map based on numbers given for different obstacles.
 * This component creates the rows of the map based on the tiles created.
 * This component displays the map of the game based on the rows created.
 */
class Map extends Component {
    focus() {
        this.mapRef.focus();
    }

    render() {
        const {
            tiles,
            onKeyDown,
        } = this.props;

        return (
            <div
                style={{
                    position: "relative",
                    top: "0px",
                    left: "0px",
                    width: `${MAP_WIDTH * 40}px`,
                    height: `${MAP_HEIGHT * 40}px`,
                    outline: 0,
                }}
                ref={mapRef => this.mapRef = mapRef}
                onKeyDown={onKeyDown}
                tabIndex="0"
                id="map"
                >
                {tiles.map((row, i) => (
                    <MapRow key={i} tiles={row} />
                ))}
            </div>
        );
    }
}

Map.propTypes = {
    /** The tiles to be displayed on the map. */
    tiles: PropTypes.array.isRequired,
    /** This function is called when every a key is pressed. */
    onKeyDown: PropTypes.func.isRequired,
}

export default Map;
