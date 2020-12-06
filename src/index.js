import React from 'react';
import 'react-native-gesture-handler';
import { View, StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './config/configure-store';
import Root from './root';
import Constants from './constants';
import { Loader } from './components';

const {
  store, persistor,
} = configureStore();

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
});

class Runfast extends React.Component {
  unsubscribe = null;
  constructor(props) {
    super(props);
    this.init();
  }

  async componentDidMount() {
    SplashScreen.hide();
  }

  async componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  init = async () => {
    LogBox.ignoreAllLogs();
    this.handleNetwork();
  };

  handleNetwork = () => {
    NetInfo.fetch().then(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <PersistGate loading={<Loader visible={false} />} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

export default Runfast;
