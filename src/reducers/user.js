import { LOGIN_FAILURE, LOGIN_REQUESTED, LOGIN_SUCCESS } from '../actions/user-action-types';

const initialState = {
  isAuthorized: false,
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
      };

    case LOGIN_REQUESTED:
      return {
        ...state,
        isAuthorized: false,
        userDetails: null,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        userDetails: payload || {},
      };

    default:
      return state;
  }
}
