import { USER_TYPES } from "../../utils/constants";

// REDUCER
const initialState = {
    user: {
        name: 'Bob',
        type: USER_TYPES.TEACHER,
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};