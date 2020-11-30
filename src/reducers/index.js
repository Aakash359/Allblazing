import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import { reducer as network } from 'react-native-offline';
import app from './app';
import user from './user';

const config = {
  blacklist: ['app', 'user'],
  key: 'primary',
  storage: AsyncStorage,
};

const reducers = persistCombineReducers(config, {
  app,
  network,
  user,
});

export default reducers;
