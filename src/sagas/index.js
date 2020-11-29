import { all, fork } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import app from './app';

const sagas = function* sagas() {
  yield all([
    app(),
    fork(networkSaga, { pingInterval: 20000 }),
  ]);
};

export default sagas;
