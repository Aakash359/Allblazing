import { AppRegistry } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Application from './src';
import { name as appName } from './app.json';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  skipPermissionRequests: false,
});

AppRegistry.registerComponent(appName, () => Application);
