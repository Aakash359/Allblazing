import {
  SET_PROFILE_DETAILS,
  SET_FULLNAME,
  SET_AGE,
  SET_GENDER,
  SET_MOTTO_DESCRIPTION,
  SET_FOLLOWLIST,
  SET_TIME,
  SET_FOLLOW_ID,
  SET_FOLLOW_USERID,
  SET_PROFILE_IMAGE,
  SET_LOCATION,
} from '../../actions/auth-action-types';

const initialState = {
  blocked: null,
  followingCount: null,
  followerCount: null,
  postCount: null,
  groupCount: null,
  user_id: null,
  full_name: '',
  age: null,
  gender: '',
  motto_description: '',
  level: null,
  time: null,
  distance: null,
  runnres_type: '',
  phone: null,
  role: null,
  email: '',
  image: 'N/A',

  // FOLLOWLIST
  id: 0,
  follow_id: null,
  folowing_id: 0,
  created_at: 0,
  followingName: '',
  followName: '',
};

export default function profile(state = initialState, {payload, type}) {
  switch (type) {
    case SET_PROFILE_DETAILS:
      return {
        ...state,
        ...payload,
      };
    case SET_FULLNAME:
      return {
        ...state,
        full_name: payload,
      };
    case SET_AGE:
      return {
        ...state,
        age: payload,
      };
    case SET_GENDER:
      return {
        ...state,
        gender: payload,
      };
    case SET_MOTTO_DESCRIPTION:
      return {
        ...state,
        motto_description: payload,
      };
    case SET_TIME:
      return {
        ...state,
        time: payload,
      };
    case SET_FOLLOWLIST:
      return {
        ...state,
        follow_id: '',
        // ...payload
      };
    case SET_FOLLOW_USERID:
      return {
        ...state,
        id: payload
      };
    case SET_FOLLOW_ID:
      return {
        ...state,
        follow_id: '',
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        image: payload,
      };
    default:
      return state;
  }
}

export function setProfileDetails(params) {
  return (dispatch) => {
    dispatch({type: SET_PROFILE_DETAILS, payload: params});
  };
}

export function setFullName(params) {
  return (dispatch) => {
    dispatch({type: SET_FULLNAME, payload: params});
  };
}

export function setProfileImage(params) {
  return (dispatch) => {
    dispatch({type: SET_PROFILE_IMAGE, payload: params});
  };
}

export function setAge(params) {
  return (dispatch) => {
    dispatch({type: SET_AGE, payload: params});
  };
}
export function setGender(params) {
  return (dispatch) => {
    dispatch({type: SET_GENDER, payload: params});
  };
}
export function setLocation(params) {
  return (dispatch) => {
    dispatch({type: SET_LOCATION, payload: params});
  };
}
export function setMottoDescription(params) {
  return (dispatch) => {
    dispatch({type: SET_MOTTO_DESCRIPTION, payload: params});
  };
}
export function setTime(params) {
  return (dispatch) => {
    dispatch({type: SET_TIME, payload: params});
  };
}

export function setFollowList(params) {
  console.log('===>', params);
  return (dispatch) => {
    dispatch({type: SET_FOLLOWLIST, payload: params});
  };
}

export function setFollowUserId(params) {
  console.log('===>', params);
  return (dispatch) => {
    dispatch({type: SET_FOLLOW_USERID, payload: params});
  };
}
export function setFollowId(params) {
  console.log('===>', params);
  return (dispatch) => {
    dispatch({type: SET_FOLLOW_ID, payload: params});
  };
}
