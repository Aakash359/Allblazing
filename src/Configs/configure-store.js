import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createNetworkMiddleware } from 'react-native-offline';
import rootReducer from '../reducers';
import sagas from '../sagas';

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
    composeEnhancers(applyMiddleware(networkMiddleware, sagaMiddleware)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return {
    persistor,
    store,
  };
};

export default ConfigureStore;
