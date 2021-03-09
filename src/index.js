import React from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import configureStore from './config/configure-store';
import Root from './root';
import Constants from './constants';
import { Loader } from './components';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { firebase }  from '@react-native-firebase/app';
const {
   persistor,
   store
} = configureStore();
// const store = createStore(reducers, {}, applyMiddleware(thunk));
const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
});

class AllBlazing extends React.Component {
  unsubscribe = null;
  constructor(props) {
    super(props);
    this.init();
  }

  async componentDidMount() {
    if (!firebase.apps.length) {
       
        firebase.initializeApp({
          apiKey: "AIzaSyA25bOWCXl-gc-Vyk95cncTm2WrEJa5KGw",
          authDomain: "fir-642c3.firebaseapp.com",
          projectId: "fir-642c3",
          storageBucket: "fir-642c3.appspot.com",
          messagingSenderId: "328851660223",
          appId: "1:328851660223:web:4e30db50851ff95604150a",
          measurementId: "G-JMKPNG8J97"
        });
      }
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
          <PersistGate  persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

export default AllBlazing;
