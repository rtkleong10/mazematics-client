import React, { Component } from "react";
import Player from "../Player";
import Map from "../Map";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
import Popup from "../Popup";

/**
 * This component displays the world in the game for the user. It renders the player and map.
 */
class World extends Component {
    constructor(props) {
        super(props);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            tiles: props.tiles,
            showPopup: false
            // questions: 
        }
    }

    componentDidMount() {
        this.worldRef.focus();
    }

    hidePopup = () => {
        this.setState({
            showPopup: false
        });
    }

    handleKeyDown = e => {
        e.preventDefault();
        this.playerRef.handleKeyDown(e);

        switch (e.keyCode) {
            case 27:
                this.hidePopup();
                //console.log("SHOWPOPUP: ", this.state.showPopup);
                return;
            default:
                console.log(e.keyCode);
        }
    }

    handleRemoveObstacle = (pos) => {
        var newTiles = this.state.tiles;
        const y = pos[1] / SPRITE_SIZE; //40 divide 40 = 1 step
        const x = pos[0] / SPRITE_SIZE;
        newTiles[y][x] = 0;

        this.setState({
            tiles: newTiles,
            showPopup: true
        });
    }

    render() {
        return (
            <div
                style={{
                    position: "relative",
                    width: `${MAP_WIDTH * 40}px`,
                    height: `${MAP_HEIGHT * 40}px`,
                    margin: "20px auto",
                    outline: 0,
                }}
                tabIndex="0"
                onKeyDown={this.handleKeyDown}
                ref={worldRef => this.worldRef = worldRef}
                >
                <Map tiles={this.state.tiles} />
                <Player ref={playerRef => this.playerRef = playerRef} tiles={this.state.tiles} showPopup={this.state.showPopup} handleRemoveObstacle={this.handleRemoveObstacle} />

                {this.state.showPopup ? (
                    <Popup
                        //TODO: fetches question according to coordinates
                        text="QUIZ QUESTION"
                        closePopup={this.hidePopup.bind(this)}
                    />
                ) : null}
            </div>
        );
    }
}

export default World;
