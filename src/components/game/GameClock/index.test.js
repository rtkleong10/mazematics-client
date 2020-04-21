import React from "react";
import GameClock from "./index.js";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ReactDOM from "react-dom";

afterEach(cleanup);

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<GameClock elapsedTime = {0} penaltyTime = {0} />, div);
});

it('should take a snapshot', async () => {
    const elapsedTime = 0;
    const penaltyTime = 0;
    const { asFragment, getByText } = render(<GameClock elapsedTime = {0} penaltyTime = {0} />);
    expect(asFragment()).toMatchSnapshot();
})