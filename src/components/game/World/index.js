import React, { Component } from "react";

import Player from "../Player";
import Map from "../Map";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../../utils/constants";
import QuestionModal from "../QuestionModal";
import ElapsedTime from "../ElapsedTime";
import PokemonClock from "../../../images/pokemon-clock.png";
import "./style.css";
import formatDuration from "format-duration";
/**
 * This component displays the world in the game for the user. It renders the player and map.
 */
class World extends Component {
  state = {
    tiles: this.props.tiles,
    questionModal: {
      isVisible: false,
      question: {
        id: null,
        questionText: "",
        options: [],
      },
      pos: null,
    },
    timingEvents: [],
    nonce: 0,
    penaltyCount: 0,
  };

  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.addTimerEvent = this.addTimerEvent.bind(this);
    this.poll = setInterval(this.tick, 1000);
  }

  componentDidMount() {
    this.mapRef.focus();
    this.addTimerEvent();
  }

  componentWillUnmount() {
    clearInterval(this.poll);
  }

  handleEncounterObstacle = (pos) => {
    this.addTimerEvent(false); //pause the timer
    const y = pos[1] / SPRITE_SIZE; //40 divide 40 = 1 step
    const x = pos[0] / SPRITE_SIZE;

    const question = this.props.questions.find(
      (question) => question.coordinates.x === x && question.coordinates.y === y
    );

    this.setState({
      questionModal: {
        isVisible: true,
        question: question,
        pos: pos,
      },
    });
  };

  handleQuestionModalClose = (correctAnswer) => {
    this.mapRef.focus();

    this.setState({
      questionModal: {
        ...this.state.questionModal,
        isVisible: false,
      },
    });

    if (correctAnswer) {
      const pos = this.state.questionModal.pos;
      const y = pos[1] / SPRITE_SIZE; //40 divide 40 = 1 step
      const x = pos[0] / SPRITE_SIZE;
      var newTiles = this.state.tiles;
      newTiles[y][x] = 0;

      this.setState({
        tiles: newTiles,
      });

      this.addTimerEvent(false); //add a time event to resume the timer
    } else {
      this.addTimerEvent(true); //add penalty count and resume the timer
    }
  };

  addTimerEvent(penalty) {
    if (penalty) {
      this.setState({
        penaltyCount: this.state.penaltyCount + 1,
      });
    }
    this.setState({
      timingEvents: [...this.state.timingEvents, new Date()],
    });
  }

  tick() {
    this.setState({ nonce: this.state.nonce + 1 });
  }

  /*this function is to get the final timing to store at the backend
  if you have other alternatives can just forego this :) */
  getFinalTiming() {
    var elapsed = 0;
    for (var i = 0; i < this.state.timingEvents.length; i += 2) {
      const start = this.state.timingEvents[i];
      const stop = this.state.timingEvents[i + 1] || new Date();
      elapsed += stop - start;
    }
    elapsed += this.state.penaltyCount * 10000;
    return formatDuration(elapsed);
  }

  render() {
    const { levelId } = this.props;

    const { questionModal } = this.state;

    return (
      <div
        style={{
          position: "relative",
          width: `${MAP_WIDTH * 40}px`,
          height: `${MAP_HEIGHT * 40}px`,
          margin: "20px auto",
        }}
      >
        <Map
          tiles={this.state.tiles}
          onKeyDown={(e) => this.playerRef.handleKeyDown(e)}
          ref={(mapRef) => (this.mapRef = mapRef)}
        />
        <Player
          ref={(playerRef) => (this.playerRef = playerRef)}
          tiles={this.state.tiles}
          showPopup={this.state.questionModal.isVisible}
          handleEncounterObstacle={this.handleEncounterObstacle}
        />
        <QuestionModal
          question={questionModal.question}
          isVisible={questionModal.isVisible}
          onClose={this.handleQuestionModalClose}
          levelId={levelId}
        />
        <div className="cnt">
          <div className="itm-side">
            <img
              src={PokemonClock}
              alt="Pokemon Clock"
              width="25px"
              height="25px"
              align="left"
            />
            <ElapsedTime timingEvents={this.state.timingEvents} />
            &nbsp;&nbsp;&nbsp;{" "}
            <medium className="redcode">
              penalty: {this.state.penaltyCount * 10}s{" "}
            </medium>
          </div>
        </div>
      </div>
    );
  }
}

export default World;
