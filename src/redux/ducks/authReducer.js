import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT, REFRESH_TOKEN, FETCH_ME} from '../actions/types';
import {getCurrentTime} from '../utils/getCurrentTime';

const initialState = {
  loginSucess: false,
  currentUser:'',
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  expires_in: localStorage.getItem("expires_in"),
  time_token_acquired: getCurrentTime()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
        if(action.payload.access_token){
            return {
                ...state,
                loginSuccess: true,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
                expires_in: 0,//action.payload.expires_in
                time_token_acquired: getCurrentTime()
            }}
        else{
          alert("successful authentication but no access_token!")
        }
    
    case FETCH_ME:
      console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload
        //store refresh and access token in localStorage
    }
         
    case AUTH_LOGIN_FAIL:
            return {
              ...state,
              currentUser:'',
              loginSuccess: false,
         };
    
    case AUTH_LOGOUT:
          //remove refresh and access token in localStorage
          localStorage.removeItem("access_token" );
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("expires_in");
          localStorage.removeItem("current_user");
          localStorage.removeItem("time_token_acquired");
          return {
              ...state,
              loginSuccess: false,
              currentUser: '',
              access_token:'',
              refresh_token:'',
              expires_in:0,
              time_token_acquired:''
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
