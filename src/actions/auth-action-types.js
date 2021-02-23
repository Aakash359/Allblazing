import { createAction } from 'redux-actions';

export const SET_LOGIN_DETAILS = 'SET_LOGIN_DETAILS';

export const SET_INTRO_COMPLETE = 'SET_INTRO_COMPLETE'

export const SET_SIGNUP_DETAILS = 'SET_SIGNUP_DETAILS';
export const REMOVE_AUTH_TOKEN = ' ';

export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = createAction(LOGIN_FAILURE);

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = createAction(LOGIN_REQUESTED);

export const LOGIN_SUCCESS = 'SET_LOGIN_DETAILS';
export const loginSuccess = createAction(LOGIN_SUCCESS);



