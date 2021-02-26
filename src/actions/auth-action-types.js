import { createAction } from 'redux-actions';




export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = createAction(LOGIN_FAILURE);

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = createAction(LOGIN_REQUESTED);

export const LOGIN_SUCCESS = 'SET_LOGIN_DETAILS';
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS';

export const SET_INTRO_COMPLETE = 'SET_INTRO_COMPLETE'

export const SET_SIGNUP_DETAILS = 'SET_SIGNUP_DETAILS';
export const REMOVE_AUTH_TOKEN = ' ';

export const SET_PROFILE_DETAILS = 'SET_PROFILE_DETAILS';

export const SET_FULLNAME = 'SET_FULLNAME';
export const SET_AGE = 'SET_AGE';
export const SET_GENDER = 'SET_GENDER';
export const SET_LOCATION = 'SET_LOCATION';

export const SET_MOTTO_DESCRIPTION = 'SET_MOTTO_DESCRIPTION';
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_TIME = 'SET_TIME';

export const SET_CREATE_GROUP_DETAIL = 'SET_CREATE_GROUP_DETAIL';

export const SET_FOLLOWERS_DETAILS = 'SET_FOLLOWERS_DETAILS';

export const SET_FOLLOW_USERID = 'SET_FOLLOW_USERID';
export const SET_FOLLOW_ID = 'SET_FOLLOW_ID';

export const SET_FEED_DETAILS = 'SET_FEED_DETAILS';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

// post Like
export const SET_POST_LIKE_DETAILS = 'SET_POST_LIKE_DETAILS';
export const SET_POST_LIKECOUNT = 'SET_POST_LIKECOUNT';




