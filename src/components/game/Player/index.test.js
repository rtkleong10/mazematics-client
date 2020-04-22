import React from "react";
import ReactDOM from "react-dom";
import Player from "./index.js";
import { render, cleanup } from "@testing-library/react";
import { tiles } from "../../../utils/data/maps/1";
import "@testing-library/jest-dom";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Player
            position={[1, 1]}
            tiles={tiles}
            onEncounterObstacle={() => {}}
            onChangePosition={() => {}}
            onCompleteGame={() => {}}
            />
    , div);
});

it("should take a snapshot", () => {
    const { asFragment } = render(
        <Player
            position={[1, 1]}
            tiles={tiles}
            onEncounterObstacle={() => {}}
            onChangePosition={() => {}}
            onCompleteGame={() => {}}
            />
    );
    expect(asFragment()).toMatchSnapshot();
});
