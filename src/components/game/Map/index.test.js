import React from "react";
import { render, cleanup } from "@testing-library/react";
import Map from "./index.js";
import { tiles } from "../../../utils/data/maps/1";
import { renderWithRedux } from "../../../utils/tests";

afterEach(cleanup);

it("render maps without crashing", () => {
  renderWithRedux(<Map tiles={tiles} />);
});

it("map matches snapshot", async () => {
  const { asFragment } = render(<Map tiles={tiles} />);
  expect(asFragment()).toMatchSnapshot();
});
