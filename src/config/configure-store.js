import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createNetworkMiddleware } from 'react-native-offline';
import rootReducer from '../reducers';
import sagas from '../sagas';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)


const ConfigureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const networkMiddleware = createNetworkMiddleware({ queueReleaseThrottle: 200 });

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      }))
    || compose;
  /* eslint-enable no-underscore-dangle */

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(networkMiddleware, sagaMiddleware, logger)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return {
    persistor,
    store,
  };
};

export default ConfigureStore;
