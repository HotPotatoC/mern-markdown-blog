import {
  VERIFY_AUTH_SUCCESS,
  VERIFY_AUTH_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./types";

export const authReducer = (state, {type, payload}) => {
  switch (type) {
    case VERIFY_AUTH_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: payload,
        isAuthenticated: true,
      };
    case VERIFY_AUTH_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
      return {...state, data: null, isAuthenticated: false};
    default:
      return state;
  }
};

export default authReducer;
