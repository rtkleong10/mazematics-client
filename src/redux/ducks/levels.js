import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayErrorAction } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'gameMaps';

// REDUCER
const levelsReducer = createApiReducer(ENTITY_NAME);
export default levelsReducer;

// OPERATIONS
export const createLevel = (topicId, level) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/create/`,
            level,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to create level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveLevel = (topicId, levelId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/${levelId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateLevel = (topicId, level) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/${level.id}/`,
            level,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to update level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const publishLevel = (topicId, levelId) => updateLevel(topicId, {id: levelId, playable: true});

export const deleteLevel = (topicId, levelId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/${levelId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            if (res.data === true) {
                dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, levelId));
            } else {
                throw new Error("Unable to delete level");
            }
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to delete level"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listLevels = (topicId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(
            `${API_URL}/topics/${topicId}/${ENTITY_NAME}/`,
            getTokenConfig(getState),
        )
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
export const selectLevelsLoading = state => state.levelsReducer.isLoading[METHODS.LIST] === true;
export const selectLevelsFailed = state => state.levelsReducer.isLoading[METHODS.LIST] === false && state.levelsReducer.hasFailed[METHODS.LIST] === true;
export const selectLevels = state => state.levelsReducer.items;

export const selectLevelLoading = state => state.levelsReducer.isLoading[METHODS.RETRIEVE] === true;
export const selectLevelFailed = state => state.levelsReducer.isLoading[METHODS.RETRIEVE] === false && state.levelsReducer.hasFailed[METHODS.RETRIEVE] === true;
export const selectLevel = state => state.levelsReducer.item;

export const selectPlayableLevels = state => state.levelsReducer.items.filter(item => item.playable);
export const selectPlayableLevel = state => (state.levelsReducer.item && state.levelsReducer.item.playable) ? state.levelsReducer.item : null;