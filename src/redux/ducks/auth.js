import { USER_ROLES } from "../../utils/constants";

// REDUCER
const initialState = {
    user: {
        name: 'Bob',
        role: USER_ROLES.STUDENT,
        email: 'bob@e.ntu.edu.sg',
        accessToken: '24a2f73b-d2a2-49d8-8e69-6cfc9a2f19be',
    },
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};