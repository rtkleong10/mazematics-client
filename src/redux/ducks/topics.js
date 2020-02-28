import axios from 'axios';
import { API_URL } from '../../utils/constants';

// ACTION TYPES
const CREATE_TOPIC = 'app/topics/CREATE_TOPIC';
const RETRIEVE_TOPICS_SUCCESS = 'app/topics/RETRIEVE_TOPICS_SUCCESS';
const RETRIEVE_TOPICS_ERROR = 'app/topics/RETRIEVE_TOPICS_ERROR';
const UPDATE_TOPIC = 'app/topics/UPDATE_TOPIC';
const DELETE_TOPIC = 'app/topics/DELETE_TOPIC';

// REDUCER
const initialState = {
    topics: [],
    topicsRetrieved: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_TOPIC:
            return {
                ...state,
                topics: [...state.topics, action.payload]
            }

        case RETRIEVE_TOPICS_SUCCESS:
            return {
                ...state,
                topics: action.payload,
                topicsRetrieved: true,
            }
        
        case RETRIEVE_TOPICS_ERROR:
            return {
                ...state,
                topicsRetrieved: true,
            }

        case UPDATE_TOPIC:
            return {
                ...state,
                topics: state.topics.map(topic => (topic.id === action.payload.id) ? action.payload : topic)
            }

        case DELETE_TOPIC:
            return {
                ...state,
                topics: state.topics.filter(topic => topic.id !== action.payload)
            }

        default:
            return state;
    }
};

// ACTION CREATORS
export function createTopicAction(topic) {
    return {
        type: CREATE_TOPIC,
        payload: topic
    }
}

export function retrieveTopicsSuccessAction(topics) {
    return {
        type: RETRIEVE_TOPICS_SUCCESS,
        payload: topics
    }
}

export function retrieveTopicsErrorAction(topics) {
    return {
        type: RETRIEVE_TOPICS_ERROR
    }
}

export function updateTopicAction(topic) {
    return {
        type: UPDATE_TOPIC,
        payload: topic
    }
}

export function deleteTopicAction(id) {
    return {
        type: DELETE_TOPIC,
        payload: id
    }
}

// OPERATIONS
export const createTopic = topic => dispatch => {
    axios
        .post(`${API_URL}/topics/`, topic)
        .then(res => {
            dispatch(createTopicAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const retrieveTopics = () => (dispatch) => {
    axios
        .get(`${API_URL}/topics/`)
        .then(res => {
            dispatch(retrieveTopicsSuccessAction(res.data));
        })
        .catch(err => {
            console.log(err);;
            dispatch(retrieveTopicsErrorAction());
        });
    ;
};

export const updateTopic = topic => (dispatch) => {
    axios
        .patch(`${API_URL}/topics/${topic.id}/`, topic)
        .then(res => {
            dispatch(updateTopicAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const deleteTopic = id => (dispatch) => {
    axios
        .delete(`${API_URL}/topics/${id}/`)
        .then(res => {
            dispatch(deleteTopicAction(id));
        })
        .catch(err => console.log(err));
    ;
};