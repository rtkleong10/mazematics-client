import { API_URL } from "../../utils/constants";
import axios from 'axios';

// ACTION TYPES
export const FETCH_USERS = 'FETCH_USERS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

// REDUCER
const initialState = {
    items: [],
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS:
            console.log(action.payload)
            return {
                ...state,
                items: action.payload
            };
        case CREATE_USER_SUCCESS:
            // state.items.push(action.payload)
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case CREATE_USER_FAIL:
            // state.items.push(action.payload)
            alert("FAIL TO CREATE USERS")
            console.log(action.payload)
            return {
                ...state
            };

        case UPDATE_USER_SUCCESS:
            console.log(state.items)
            const index = state.items.findIndex(user => user.email === action.payload.email)
            state.items.splice(index, 1, action.payload)
            return {
                ...state,
                items: [...state.items]
            };

        case UPDATE_USER_FAIL:
            alert("FAIL TO UPDATE USER")
            return {
                ...state
            };

        case DELETE_USER_SUCCESS:
            let newState = state.items.filter(function (user) { return user.email !== action.payload.email });
            return {
                ...state,
                items: newState
            };
        case DELETE_USER_FAIL:
            // state.items.push(action.payload)
            alert("FAIL TO DELETE USERS")
            console.log(action.payload)
            return {
                ...state
            };
        default:
            return state;
    }
}

// ACTION CREATORS
export const fetchUsers = () => dispatch => {
    return (
        axios.get(`${API_URL}/users/`, {
            headers: {
                Authorization: `bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then(res => { if (!res.data===true) { throw res } return res.data })
            .then(users =>
                dispatch({
                    type: FETCH_USERS,
                    payload: users.content
                })
            )
            .catch(err => {
                alert("Unable to fetch user data");
            })
    )

};

export const createUser = newUser => dispatch => {
    return (
        axios.post(`${API_URL}/users/create/`, 
        
            {
                name: newUser.name,
                email: newUser.email,
                pass: newUser.pass,
                role: newUser.role
            }
            ,
            {headers: {
                Authorization: `bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
                }
            },
            
        )
            .then(res => { if (!res.data==true) { throw res } return res.data  })
            .then(user =>
                dispatch({
                    type: CREATE_USER_SUCCESS,
                    payload: user
                }))
            .catch(error =>
                dispatch({
                    type: CREATE_USER_FAIL,
                    payload: error
                }))
    )
};

export const updateUser = (newUserData, oldUserData) => dispatch => {
    return (
        axios.patch(`${API_URL}/users/${oldUserData.email}`, 
        {
            name: newUserData.name,
            email: newUserData.email,
            pass: newUserData.pass,
            role: newUserData.role
        },
           { headers: {
                Authorization: `bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json"
            }
        }
        )
           
            .then(res => { if (!res.data==true) { throw res } return res.data })
            .then(user =>
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: user
                })
            )
            .catch(error =>
                dispatch({
                    type: UPDATE_USER_FAIL,
                    payload: error
                })
            )
    )
};

export const deleteUser = UserData => dispatch => {
    return (
        axios.delete(`${API_URL}/users/${UserData.email}`, {
            headers: {
                Authorization: `bearer ${localStorage.getItem("access_token")}`
            },
        })
            .then(res => { if (!res.data==true) { throw res } return res.data })
            .then(user =>
                dispatch({
                    type: DELETE_USER_SUCCESS,
                    payload: UserData
                }))
            .catch(error =>
                dispatch({
                    type: DELETE_USER_FAIL,
                    payload: error
                }))
    )
};


