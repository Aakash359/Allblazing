import {REMOVE_AUTH_TOKEN, SET_LOGIN_DETAILS} from '../../actions/auth-action-types';

const initialState = {
  token:'',
  user_id: null,
  role: null,
  email: '',
  device_token: null,
  device_type: null,
  image: '',
};

export default function auth(state = initialState, {payload, type}) {
  switch (type) {
    case SET_LOGIN_DETAILS:
      return {
        ...state,
        ...payload,
      };
      case REMOVE_AUTH_TOKEN:
        return {
          ...state,
          token:'',
        };

    default:
      return state;
  }
}

export function setLoginDetails(params) {
    return dispatch => {
      dispatch({ type: SET_LOGIN_DETAILS, payload: params });
    };
  }

  export function removeAuthTokenFromRedux(params) {
    return dispatch => {
      dispatch({ type: REMOVE_AUTH_TOKEN, payload: params });
    };
  }