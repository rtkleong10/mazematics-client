import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayErrorAction } from './errors';

const ENTITY_NAME = 'levels';

// REDUCER
const levelsReducer = createApiReducer(ENTITY_NAME);
export default levelsReducer;

// OPERATIONS
export const createLevel = level => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(`${API_URL}/${ENTITY_NAME}/`, level)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to create level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveLevel = (id) => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/${id}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateLevel = level => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(`${API_URL}/${ENTITY_NAME}/${level.id}/`, level)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to update level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteLevel = id => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(`${API_URL}/${ENTITY_NAME}/${id}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, id));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to delete level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listLevels = () => (dispatch) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve levels"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
    ;
};

// SELECTORS
export const selectLevelsListed = (state) => state.levelsReducer.isLoading[METHODS.LIST] === false;
export const selectLevelRetrieved = (state) => state.levelsReducer.isLoading[METHODS.RETRIEVE] === false;
export const selectLevels = (state, topicId) => state.levelsReducer.items.filter(item => item.topic === topicId);
export const selectLevel = (state, levelId) => state.levelsReducer.items.find(item => item.id === levelId);
export const selectPublishedLevels = (state, topicId) => state.levelsReducer.items.filter(item => item.topic === topicId && item.isPublished);
export const selectPublishedLevel = (state, levelId) => state.levelsReducer.items.find(item => item.id === levelId && item.isPublished);