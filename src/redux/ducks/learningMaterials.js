import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayErrorAction } from './errors';

const ENTITY_NAME = 'learningMaterials';

// REDUCER
const learningMaterialsReducer = createApiReducer(ENTITY_NAME);
export default learningMaterialsReducer;

// OPERATIONS
export const createLearningMaterial = learningMaterial => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(`${API_URL}/${ENTITY_NAME}/`, learningMaterial)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to create learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveLearningMaterial = learningMaterialID => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/${learningMaterialID}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateLearningMaterial = learningMaterial => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(`${API_URL}/${ENTITY_NAME}/${learningMaterial.id}/`, learningMaterial)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to update learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteLearningMaterial = learningMaterialID => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(`${API_URL}/${ENTITY_NAME}/${learningMaterialID}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, learningMaterialID));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to delete learning material"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listLearningMaterials = () => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/`)
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
export const selectLearningMaterialsListed = state => state.learningMaterialsReducer.isLoading[METHODS.LIST] === false;
export const selectLearningMaterial = (state, levelID) => state.learningMaterialsReducer.items.find(item => item.level === levelID);