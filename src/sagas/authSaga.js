import { GET_NETWORK_INFO_REQUEST, GET_NETWORK_INFO_SUCCESS, GET_NETWORK_INFO_FAILED, UPDATE_LANGUAGE_REQUEST, UPDATE_LANGUAGE_SUCCESS, UPDATE_LANGUAGE_FAILED } from "../Types/Type";
import { put, call, takeEvery } from 'redux-saga/effects';
// import Api from '../../Services/Api';
// ====================== NETWORK UPDATE ======================

export const loginSaga = function* loginSaga({ params }) {
    try {
    const response = yield call(Api.signupApi, params)
    yield put({ type: SIGNUP_SUCCESS, payload: response });
    }
    catch (e) {
    console.log(e, 'error');
    yield put({ type: SIGNUP_FAILED, payload: e });
    }
    }

export function* authSaga() {
    
}
export default authSaga;