import React from "react";
import { cleanup } from "@testing-library/react";
import axiosMock from "axios";

import { tiles } from "../../../utils/data/maps/1";
import World from "./index.js";
import { renderWithRedux } from "../../../utils/tests";

jest.mock('axios');

beforeEach(() => {
    axiosMock.get.mockRejectedValueOnce({
        response: {
            status: 404,
        }
    });

    axiosMock.post.mockResolvedValueOnce({});
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

it('renders without crashing', async () => {
    renderWithRedux(<World levelId={1} tiles={tiles} questions={[]} onCompleteGame={() => {}} />);
})
