import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Application from './src';
import { name as appName } from './app.json';
import './src/i18next';
import './src/utilities/string-en';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  skipPermissionRequests: false,
});

AppRegistry.registerComponent(appName, () => Application);
