import axios from 'axios';
import { API_URL } from '../../utils/constants';

// ACTION TYPES
const CREATE_LEVEL = 'app/levels/CREATE_LEVEL';
const RETRIEVE_LEVELS_SUCCESS = 'app/levels/RETRIEVE_LEVELS_SUCCESS';
const RETRIEVE_LEVELS_ERROR = 'app/levels/RETRIEVE_LEVELS_ERROR';
const UPDATE_LEVEL = 'app/levels/UPDATE_LEVEL';
const DELETE_LEVEL = 'app/levels/DELETE_LEVEL';

// REDUCER
const initialState = {
    levelsRetrieved: false,
    levels: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_LEVEL:
            return {
                ...state,
                levels: [...state.levels, action.payload]
            }

        case RETRIEVE_LEVELS_SUCCESS:
            return {
                ...state,
                levelsRetrieved: true,
                levels: action.payload
            }

        case RETRIEVE_LEVELS_ERROR:
            return {
                ...state,
                levelsRetrieved: true
            }

        case UPDATE_LEVEL:
            return {
                ...state,
                levels: state.levels.map(level => (level.id === action.payload.id) ? action.payload : level)
            }

        case DELETE_LEVEL:
            return {
                ...state,
                levels: state.levels.filter(level => level.id !== action.payload)
            }

        default:
            return state;
    }
};

// ACTION CREATORS
export function createLevelAction(level) {
    return {
        type: CREATE_LEVEL,
        payload: level
    }
}

export function retrieveLevelsSuccessAction(levels) {
    return {
        type: RETRIEVE_LEVELS_SUCCESS,
        payload: levels
    }
}

export function retrieveLevelsErrorAction(levels) {
    return {
        type: RETRIEVE_LEVELS_ERROR
    }
}

export function updateLevelAction(level) {
    return {
        type: UPDATE_LEVEL,
        payload: level
    }
}

export function deleteLevelAction(id) {
    return {
        type: DELETE_LEVEL,
        payload: id
    }
}

// OPERATIONS
export const createLevel = level => dispatch => {
    axios
        .post(`${API_URL}/levels/`, level)
        .then(res => {
            dispatch(createLevelAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const retrieveLevels = () => (dispatch) => {
    axios
        .get(`${API_URL}/levels/`)
        .then(res => {
            dispatch(retrieveLevelsSuccessAction(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(retrieveLevelsErrorAction());
        });
    ;
};

export const updateLevel = level => (dispatch) => {
    axios
        .patch(`${API_URL}/levels/${level.id}/`, level)
        .then(res => {
            dispatch(updateLevelAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const deleteLevel = id => (dispatch) => {
    axios
        .delete(`${API_URL}/levels/${id}/`)
        .then(res => {
            dispatch(deleteLevelAction(id));
        })
        .catch(err => console.log(err));
    ;
};