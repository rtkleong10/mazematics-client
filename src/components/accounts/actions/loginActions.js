import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, API, FETCH_ME } from './types';

export const authenticateLogin = userData => dispatch =>{

    var formdata = new FormData();
    formdata.append("username", userData.username);
    formdata.append("password", userData.password);
    formdata.append("grant_type", "password");

        fetch(`${API}/oauth/token`, {
            method: 'POST',
            headers: {
            'Authorization': 'Basic bXktY2xpZW50Om15LXNlY3JldA==' //+ btoa('my-client:my-secret')
            },
            body: formdata,
        }).then(res =>
          { 
            if(!res.ok){
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
        .catch(error =>{
          dispatch({
          type: AUTH_LOGIN_FAIL,
          payload: error
        })});
    };

export const fetchMe = access_token => dispatch => { 
  fetch(`${API}/users/me`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${access_token}`
    },
  })
    .then(res => res.json())
    .then(user =>{
      dispatch({
        type: FETCH_ME,
        payload: user
      })
    }
    );
};