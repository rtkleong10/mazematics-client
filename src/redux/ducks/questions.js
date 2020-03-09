import axios from 'axios';

import { createApiReducer, createApiAction, STATUSES, METHODS } from './apiHelper';
import { API_URL } from '../../utils/constants';
import { displayErrorAction } from './errors';

const ENTITY_NAME = 'questions';

// REDUCER
const questionsReducer = createApiReducer(ENTITY_NAME);
export default questionsReducer;

// OPERATIONS
export const createQuestion = question => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.CREATE));

    axios
        .post(`${API_URL}/${ENTITY_NAME}/`, question)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.CREATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to create question"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.CREATE));
        });
    ;
};

export const retrieveQuestion = questionID => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.RETRIEVE));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/${questionID}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.RETRIEVE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to retrieve question"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.RETRIEVE));
        });
    ;
};

export const updateQuestion = question => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.UPDATE));

    axios
        .patch(`${API_URL}/${ENTITY_NAME}/${question.id}/`, question)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.UPDATE, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to update question"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.UPDATE));
        });
};

export const deleteQuestion = questionID => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.DELETE));

    axios
        .delete(`${API_URL}/${ENTITY_NAME}/${questionID}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.DELETE, questionID));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to delete question"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.DELETE));
        });
};

export const listQuestions = () => dispatch => {
    dispatch(createApiAction(ENTITY_NAME, STATUSES.REQUEST, METHODS.LIST));

    axios
        .get(`${API_URL}/${ENTITY_NAME}/`)
        .then(res => {
            dispatch(createApiAction(ENTITY_NAME, STATUSES.SUCCESS, METHODS.LIST, res.data));
        })
        .catch(err => {
            dispatch(displayErrorAction("Unable to obtain questions"));
            dispatch(createApiAction(ENTITY_NAME, STATUSES.FAILURE, METHODS.LIST));
        });
    ;
};

// SELECTORS
export const selectQuestionsLoading = state => state.questionsReducer.isLoading[METHODS.LIST] === true;
export const selectQuestionsFailed = state => state.questionsReducer.isLoading[METHODS.LIST] === false && state.questionsReducer.hasFailed[METHODS.LIST] === true;
export const selectQuestions = (state, levelID) => state.questionsReducer.items.filter(item => item.level === levelID);
