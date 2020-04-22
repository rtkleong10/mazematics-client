import React from "react";
import Player from "../Player";
import Popup from "../Popup";
import Map from "../Map";
import { tiles } from "../../../utils/data/maps/1";
import World from "./index.js";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import { renderWithRedux } from "../../../utils/tests";


afterEach(cleanup);

it('renders without crashing', async () => {
    renderWithRedux(<World tiles={tiles} question={[]} levelId={1} />);
})

