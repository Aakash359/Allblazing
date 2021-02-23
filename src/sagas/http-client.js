import { call, select, put, delay } from 'redux-saga/effects';
import { showLoader, hideLoader } from '../actions/app-action-types';
import { logoutSuccess, setAuthenticationToken } from '../actions/user-action-types';
import axiosInstance from '../utilities/axios-instance';
function* HttpClient(payload, isLoader = false, authorization = false) {
  console.log("DDAATTAAA" ,payload)
  const networkStatus = yield select(({ network: { isConnected } }) => isConnected);
 
  if (!networkStatus) {
    alert('Please make sure you\'re connected with internet.');

    return {
      error: true,
      result: null,
    };
  }

  if (isLoader) {
    yield put(showLoader());
    yield delay(250);
  }
  const data = { ...payload };

  if (authorization) {
    alert("called")
    const authToken = yield select(({ user: { token } }) => token);

    if (authToken) {
      data.headers = { 'x-authorization': authToken };
    } else {
      yield put(hideLoader());

      return {
        error: true,
        result: null,
      };
    }
  }

  try {
    const {
      data: result,
      // headers: { 'Authorization': authentication = '' },
    } = yield call(axiosInstance, data);
console.log("axoid repsonese ", result)
    yield put(hideLoader());

    

    return {
      error: null,
      result,
    };
  } catch (error) {
    yield put(hideLoader());
    
      if (error.code === 'ECONNABORTED') {
        const message = 'Please make sure you\'re connected with internet or our servers are not responding.';

     
      } else if (error.code === 401) {
        yield delay(250);
        yield put(logoutSuccess());
       
      } else {
        
      }
    

    console.log('err----> ', error);

    return {
      error,
      result: null,
    };
  }
}

export default HttpClient;
