import { API_URL } from "../../utils/constants";
import axios from 'axios';
import { displayError } from './errors';
import { getCurrentTime } from '../../utils/getCurrentTime';

export const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST';
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

// REDUCER
const initialState = {
    loginSucess: false,
    userLoading: true,
    userFailed: null,
    user: {},
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    expires_in: localStorage.getItem("expires_in"),
    time_token_acquired: getCurrentTime()
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            if (action.payload.access_token) {
                return {
                    ...state,
                    loginSuccess: true,
                    access_token: action.payload.access_token,
                    refresh_token: action.payload.refresh_token,
                    expires_in: 0,//action.payload.expires_in
                    time_token_acquired: getCurrentTime()
                }
            }
            else {
                alert("successful authentication but no access_token!")
            }
            break;

        case FETCH_ME_REQUEST:
            return {
                ...state,
                userLoading: true,
                userFailed: false,
            }

        case FETCH_ME_SUCCESS:
            return {
                ...state,
                userLoading: false,
                user: action.payload,
            }

        case FETCH_ME_FAILURE:
            return {
                ...state,
                userLoading: false,
                userFailed: true,
            }


        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                user: '',
                loginSuccess: false,
            };

        case AUTH_LOGOUT:
            //remove refresh and access token in localStorage
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("expires_in");
            localStorage.removeItem("current_user");
            localStorage.removeItem("time_token_acquired");
            return {
                ...state,
                loginSuccess: false,
                user: '',
                access_token: '',
                refresh_token: '',
                expires_in: 0,
                time_token_acquired: ''
            }

        case REFRESH_TOKEN:
            return {
                ...state,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: action.payload.expires_in
            }
        default:
            return state;

    }

}

// ACTION CREATORS
export const authenticateLogin = userData => dispatch => {

    var formdata = new FormData();
    formdata.append("username", userData.username);
    formdata.append("password", userData.password);
    formdata.append("grant_type", "password");

    fetch(`${API_URL}/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic bXktY2xpZW50Om15LXNlY3JldA==' //+ btoa('my-client:my-secret')
        },
        body: formdata,
    }).then(res => {
        if (!res.ok) {
            throw res
        }
        return res.json()
    })
        .then(result =>
            // dispatch(fetchMe(result.access_token))
            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: result
            }))
        .catch(error => {
            dispatch({
                type: AUTH_LOGIN_FAIL,
                payload: error
            })
        });
};

export const fetchMe = access_token => dispatch => {
    dispatch({
        type: FETCH_ME_REQUEST,
    });

    axios
        .post(
            `${API_URL}/users/me/`,
            {},
            {
                headers: {
                    Authorization: `bearer ${access_token}`
                }
            },
        )
        .then(res => {
            dispatch({
                type: FETCH_ME_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            displayError("Unable to fetch me")(dispatch);
            dispatch({
                type: FETCH_ME_FAILURE,
            });
        });
};

export const logout = () => dispatch => {
    fetch(`${API_URL}/oauth/revoke`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('access_token')
        },
    })
        .then(() =>
            dispatch({
                type: AUTH_LOGOUT,
            })
        )
};

// SELECTORS
export const selectUserLoading = state => state.authReducer.userLoading === true;
export const selectUserFailed = state => state.authReducer.userLoading === false && state.authReducer.userFailed === true;
export const selectUser = state => state.authReducer.user;