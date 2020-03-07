import { USER_ROLES } from "../../utils/constants";

// REDUCER
const initialState = {
    user: {
        name: 'Bob',
        role: USER_ROLES.TEACHER,
        email: 'bob@e.ntu.edu.sg'
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};