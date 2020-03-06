import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayErrorAction } from './errors';

const ENTITY_NAME = 'topics';

// REDUCER
const topicsReducer = createApiReducer(ENTITY_NAME);
export default topicsReducer;

// OPERATIONS
export const createTopic = topic => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(`${API_URL}/${ENTITY_NAME}/`, topic)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to create topic"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveTopic = (id) => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/${id}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve topic"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateTopic = topic => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(`${API_URL}/${ENTITY_NAME}/${topic.id}/`, topic)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to update topic"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteTopic = id => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(`${API_URL}/${ENTITY_NAME}/${id}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, id));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to delete topic"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listTopics = () => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve topics"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
    ;
};

// SELECTORS
export const selectTopicsListed = (state) => state.topicsReducer.isLoading[METHODS.LIST] === false;
export const selectTopicRetrieved = (state) => state.topicsReducer.isLoading[METHODS.RETRIEVE] === false;
export const selectTopics = (state) => state.topicsReducer.items;
export const selectTopic = (state, id) => state.topicsReducer.items.find(item => item.id === id);