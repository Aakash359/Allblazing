import {REMOVE_AUTH_TOKEN, SET_INTRO_COMPLETE, SET_LOGIN_DETAILS ,LOGIN_REQUESTED} from '../../actions/auth-action-types';

const initialState = {
  token:'',
  user_id: null,
  role: null,
  email: '',
  device_token: null,
  device_type: null,
  image: '',
  count: 1,
  intro: false
};

export default function auth(state = initialState, {payload, type}) {
  switch (type) {
     case LOGIN_REQUESTED:
      return {
        ...state,
        
      };
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
    case SET_INTRO_COMPLETE:
      return {...state, intro: true}
    case 'COUNT':
      return {...state, count: state.count+1}
    default:
      return state;
  }
}

export function setLoginDetails(params) {
    return ({ type: SET_LOGIN_DETAILS, payload: params });
    
  }

  export function removeAuthTokenFromRedux(params) {
    return ({ type: REMOVE_AUTH_TOKEN, payload: params })
    
  }

export function setIntroComplete() {
  return ({type: SET_INTRO_COMPLETE})
  
}