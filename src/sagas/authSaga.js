import { all, call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN,
  LOGOUT,
  loginFailure,
  loginRequested,
  loginSuccess, } from '../actions/auth-action-types';
import httpClient from './http-client';
import { navigate } from '../routes/navigation-service';
import {
  setAuthToken,
  setUserId
} from '../helpers/auth';
export function* login(data) {
  yield put(loginRequested());

  const {
    error, result,
  } = yield call(httpClient, {
    data:data.payload,
    method: 'post',
    url: '/login',
  },
  );

    if (error) {
      console.log("Eooorrrrrr",error,result)
    yield put(loginFailure(error));
    } else {
       
       setAuthToken(result.data.token);
    setUserId(result.data.user_id.toString());
      yield put(loginSuccess(result.data));
     
    
  }
}

// export function* logout() {
//   yield put(logoutRequested());

//   const { error } = yield call(httpClient, {
//     data: {
//       email: '',
//       password: '',
//     },
//     method: 'put',
//     url: '/abc',
//   });

//   if (error) {
//     yield put(logoutFailure(error));
//   } else {
//     yield put(logoutSuccess());
//   }
// }

// export function* getMovies() {
//   yield put(getMoviesRequested());
//   const payload = {
//     baseURL: 'https://facebook.github.io/react-native/',
//     method: 'get',
//     url: 'movies.json',
//   };
//   const {
//     error, result,
//   } = yield call(httpClient, payload, true, false);

//   if (error) {
//     yield put(getMoviesFailure(error));
//   } else {
//     yield put(getMoviesSuccess(result.movies));
//   }
// }

function* Auth() {
  yield all([
    //takeLatest(GET_MOVIES, getMovies),
    takeLatest(LOGIN, login),
  
  ]);
}

export default Auth;
