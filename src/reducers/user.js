import { LOGIN_FAILURE,
  LOGIN_REQUESTED,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUESTED,
  LOGOUT_SUCCESS } from '../actions/user-action-types';

const initialState = {
  isAuthorized: false,
  loginStatus: 'pending',
  logoutStatus: 'pending',
  userDetail: {},
};

export default function app(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthorized: false,
        loginStatus: 'failure',
      };

    case LOGIN_REQUESTED:
      return {
        ...state,
        isAuthorized: false,
        loginStatus: 'logging',
        userDetails: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        loginStatus: 'success',
        userDetails: payload || {},
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutStatus: 'failure',
      };

    case LOGOUT_REQUESTED:
      return {
        ...state,
        logoutStatus: 'logout',
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        logoutStatus: 'success',
      };

    default:
      return state;
  }
}
