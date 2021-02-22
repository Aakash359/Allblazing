import {SET_SIGNUP_DETAILS} from '../../actions/auth-action-types';

const initial = {
  user_id: 0,
  role: 0,
  email: '',
  device_token: null,
  device_type: null,
  image: '',
  created: 0
};

export default function signUp(state = initial, {payload, type}) {
  switch (type) {
    case SET_SIGNUP_DETAILS:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}

export function setSignUpDetails(params) {
    return ({ type: SET_SIGNUP_DETAILS, payload: params });
  }