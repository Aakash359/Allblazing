import { all, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import Auth from './authSaga';

const sagas = function* sagas() {
  yield all([fork(networkSaga, { pingInterval: 20000 }), Auth()]);
};

export default sagas;
