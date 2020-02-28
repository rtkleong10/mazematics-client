import axios from 'axios';
import { API_URL } from '../../utils/constants';

// ACTION TYPES
const CREATE_QUESTION = 'app/questions/CREATE_QUESTION';
const RETRIEVE_QUESTIONS_SUCCESS = 'app/questions/RETRIEVE_QUESTIONS_SUCCESS';
const RETRIEVE_QUESTIONS_ERROR = 'app/questions/RETRIEVE_QUESTIONS_ERROR';
const UPDATE_QUESTION = 'app/questions/UPDATE_QUESTION';
const DELETE_QUESTION = 'app/questions/DELETE_QUESTION';

// REDUCER
const initialState = {
    questionsRetrieved: false,
    questions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload]
            }

        case RETRIEVE_QUESTIONS_SUCCESS:
            return {
                ...state,
                questionsRetrieved: true,
                questions: action.payload
            }

        case RETRIEVE_QUESTIONS_ERROR:
            return {
                ...state,
                questionsRetrieved: true
            }

        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(question => (question.id === action.payload.id) ? action.payload : question)
            }

        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload)
            }

        default:
            return state;
    }
};

// ACTION CREATORS
export function createQuestionAction(question) {
    return {
        type: CREATE_QUESTION,
        payload: question
    }
}

export function retrieveQuestionsSuccessAction(questions) {
    return {
        type: RETRIEVE_QUESTIONS_SUCCESS,
        payload: questions
    }
}

export function retrieveQuestionsErrorAction(questions) {
    return {
        type: RETRIEVE_QUESTIONS_ERROR
    }
}

export function updateQuestionAction(question) {
    return {
        type: UPDATE_QUESTION,
        payload: question
    }
}

export function deleteQuestionAction(id) {
    return {
        type: DELETE_QUESTION,
        payload: id
    }
}

// OPERATIONS
export const createQuestion = question => dispatch => {
    axios
        .post(`${API_URL}/questions/`, question)
        .then(res => {
            dispatch(createQuestionAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const retrieveQuestions = () => (dispatch) => {
    axios
        .get(`${API_URL}/questions/`)
        .then(res => {
            dispatch(retrieveQuestionsSuccessAction(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(retrieveQuestionsErrorAction());
        });
    ;
};

export const updateQuestion = question => (dispatch) => {
    axios
        .patch(`${API_URL}/questions/${question.id}/`, question)
        .then(res => {
            dispatch(updateQuestionAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const deleteQuestion = id => (dispatch) => {
    axios
        .delete(`${API_URL}/questions/${id}/`)
        .then(res => {
            dispatch(deleteQuestionAction(id));
        })
        .catch(err => console.log(err));
    ;
};