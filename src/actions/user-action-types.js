import { createAction } from 'redux-actions';

// LOGIN
export const LOGIN = 'LOGIN';
export const login = createAction(LOGIN);


export const SET_AUTH = 'SET_AUTH';
export const setAuthenticationToken = createAction(SET_AUTH);
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const loginFailure = createAction(LOGIN_FAILURE);

export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const loginRequested = createAction(LOGIN_REQUESTED);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = createAction(LOGIN_SUCCESS);

// LOGOUT
export const LOGOUT = 'LOGOUT';
export const logout = createAction(LOGOUT);

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutFailure = createAction(LOGOUT_FAILURE);

export const LOGOUT_REQUESTED = 'LOGOUT_REQUESTED';
export const logoutRequested = createAction(LOGOUT_REQUESTED);

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = createAction(LOGOUT_SUCCESS);

// SIGNUP
export const SIGNUP = 'SIGNUP';
export const signup = createAction(SIGNUP);

export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const signupFailure = createAction(SIGNUP_FAILURE);

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const signupRequested = createAction(SIGNUP_REQUESTED);

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const signupSuccess = createAction(SIGNUP_SUCCESS);
