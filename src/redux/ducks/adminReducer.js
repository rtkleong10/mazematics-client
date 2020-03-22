import { FETCH_USERS, CREATE_USER_FAIL, CREATE_USER_SUCCESS,  UPDATE_USER_SUCCESS, UPDATE_USER_FAIL, DELETE_USER_SUCCESS, DELETE_USER_FAIL} from '../actions/types';

const initialState = {
  items: [],
  item: {}
};

export default function(state = initialState, action) {
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
      let newState = state.items.filter(function(user) {return user.email !== action.payload.email});
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
