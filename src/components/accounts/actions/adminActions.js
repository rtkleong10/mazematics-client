import { FETCH_USERS, CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER_SUCCESS, DELETE_USER_FAIL, UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, API} from './types';
import {getAccessToken} from '../utils/getAccessToken'

export const fetchUsers = () => dispatch => {
  return(
  fetch(`${API}/users/`,{
      method: 'GET',
      headers:{
        Authorization: `bearer ${localStorage.getItem("access_token")}`
      }
    })
  .then(res => {if(!res.ok){throw res} return res.json()})
  .then(users =>
      dispatch({
        type: FETCH_USERS,
        payload: users.content
      })
     )
   )
  
};



export const createUser = newUser => dispatch => {
  // dispatch(getAccessToken())

  return(
  fetch(`${API}/users/create/`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then(res => {if(!res.ok){throw res} return res.json()})
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

export const updateUser = (newUserData,oldUserData) => dispatch => {
  return(
  fetch(`${API}/users/${oldUserData.email}`, {
    method: 'PATCH',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUserData)
  })
    .then(res => {if(!res.ok){throw res} return res.json()})
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
  return(
  fetch(`${API}/users/${UserData.email}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${localStorage.getItem("access_token")}`
    },
  })
  .then(res => {if(!res.ok){throw res} return res.json()})
  .then(user =>
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: UserData
      }))
  .catch(error=> 
        dispatch({
        type: DELETE_USER_FAIL,
        payload: error
    }))
  )
};


