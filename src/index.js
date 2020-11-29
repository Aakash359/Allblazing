import React from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './Configs/configure-store';
import i18nLocale, { getLocaleClient } from './Configs/configure-i18n';
import Root from './root';
import Constants from './constants';
import { Loader } from './Components';

const {
  store, persistor,
} = configureStore();

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PR,
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

    if (!getLocaleClient()) {
      i18nLocale(store);
    }
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
