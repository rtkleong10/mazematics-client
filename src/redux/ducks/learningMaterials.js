import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayErrorAction } from './errors';
import { getTokenConfig } from './authHelper';

const ENTITY_NAME = 'learningMaterials';

// REDUCER
const learningMaterialsReducer = createApiReducer(ENTITY_NAME);
export default learningMaterialsReducer;

// OPERATIONS
export const createLearningMaterial = (levelId, learningMaterial) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/create/`,
            learningMaterial,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to create learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveLearningMaterial = (levelId, learningMaterialId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${learningMaterialId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateLearningMaterial = (levelId, learningMaterial) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${learningMaterial.id}/`,
            learningMaterial,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to update learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteLearningMaterial = (levelId, learningMaterialId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/${learningMaterialId}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, learningMaterialId));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to delete learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listLearningMaterials = (levelId) => (dispatch, getState) => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(
            `${API_URL}/gameMaps/${levelId}/${ENTITY_NAME}/`,
            getTokenConfig(getState),
        )
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve learning materials"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
    ;
};

// SELECTORS
export const selectLearningMaterialsLoading = state => state.learningMaterialsReducer.isLoading[METHODS.LIST] === true;
export const selectLearningMaterialsFailed = state => state.learningMaterialsReducer.isLoading[METHODS.LIST] === false && state.learningMaterialsReducer.hasFailed[METHODS.LIST] === true;
export const selectLearningMaterial = state => state.learningMaterialsReducer.items.find(item => true);