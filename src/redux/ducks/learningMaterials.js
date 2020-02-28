import axios from 'axios';
import { API_URL } from '../../utils/constants';

// ACTION TYPES
const CREATE_LEARNING_MATERIAL = 'app/learningMaterials/CREATE_LEARNING_MATERIAL';
const RETRIEVE_LEARNING_MATERIALS_SUCCESS = 'app/learningMaterials/RETRIEVE_LEARNING_MATERIALS_SUCCESS';
const RETRIEVE_LEARNING_MATERIALS_ERROR = 'app/learningMaterials/RETRIEVE_LEARNING_MATERIALS_ERROR';
const UPDATE_LEARNING_MATERIAL = 'app/learningMaterials/UPDATE_LEARNING_MATERIAL';
const DELETE_LEARNING_MATERIAL = 'app/learningMaterials/DELETE_LEARNING_MATERIAL';

// REDUCER
const initialState = {
    learningMaterialsRetrieved: false,
    learningMaterials: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_LEARNING_MATERIAL:
            return {
                ...state,
                learningMaterials: [...state.learningMaterials, action.payload]
            }

        case RETRIEVE_LEARNING_MATERIALS_SUCCESS:
            return {
                ...state,
                learningMaterialsRetrieved: true,
                learningMaterials: action.payload
            }

        case RETRIEVE_LEARNING_MATERIALS_ERROR:
            return {
                ...state,
                learningMaterialsRetrieved: true
            }

        case UPDATE_LEARNING_MATERIAL:
            return {
                ...state,
                learningMaterials: state.learningMaterials.map(learningMaterial => (learningMaterial.id === action.payload.id) ? action.payload : learningMaterial)
            }

        case DELETE_LEARNING_MATERIAL:
            return {
                ...state,
                learningMaterials: state.learningMaterials.filter(learningMaterial => learningMaterial.id !== action.payload)
            }

        default:
            return state;
    }
};

// ACTION CREATORS
export function createLearningMaterialAction(learningMaterial) {
    return {
        type: CREATE_LEARNING_MATERIAL,
        payload: learningMaterial
    }
}

export function retrieveLearningMaterialsSuccessAction(learningMaterials) {
    return {
        type: RETRIEVE_LEARNING_MATERIALS_SUCCESS,
        payload: learningMaterials
    }
}

export function retrieveLearningMaterialsErrorAction(learningMaterials) {
    return {
        type: RETRIEVE_LEARNING_MATERIALS_ERROR
    }
}

export function updateLearningMaterialAction(learningMaterial) {
    return {
        type: UPDATE_LEARNING_MATERIAL,
        payload: learningMaterial
    }
}

export function deleteLearningMaterialAction(id) {
    return {
        type: DELETE_LEARNING_MATERIAL,
        payload: id
    }
}

// OPERATIONS
export const createLearningMaterial = learningMaterial => dispatch => {
    axios
        .post(`${API_URL}/learning-materials/`, learningMaterial)
        .then(res => {
            dispatch(createLearningMaterialAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const retrieveLearningMaterials = () => (dispatch) => {
    axios
        .get(`${API_URL}/learning-materials/`)
        .then(res => {
            dispatch(retrieveLearningMaterialsSuccessAction(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(retrieveLearningMaterialsErrorAction());
        });
    ;
};

export const updateLearningMaterial = learningMaterial => (dispatch) => {
    axios
        .patch(`${API_URL}/learning-materials/${learningMaterial.id}/`, learningMaterial)
        .then(res => {
            dispatch(updateLearningMaterialAction(res.data));
        })
        .catch(err => console.log(err));
    ;
};

export const deleteLearningMaterial = id => (dispatch) => {
    axios
        .delete(`${API_URL}/learning-materials/${id}/`)
        .then(res => {
            dispatch(deleteLearningMaterialAction(id));
        })
        .catch(err => console.log(err));
    ;
};