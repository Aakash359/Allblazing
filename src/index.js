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
import { GoogleSignin,} from '@react-native-community/google-signin';
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
    GoogleSignin.configure({
      
      webClientId: '328851660223-13g6jah84kce1h77745npdi3ul2reavn.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      
    });
    if (!firebase.apps.length) {
       
    }
  //      await firebase.initializeApp({
  //         apiKey: "AIzaSyADwYfhbpfWVdz-aoa4VM5oCRQrmCW3Wmw",
  // authDomain: "testingapp-fc6e8.firebaseapp.com",
  // databaseURL: "https://testingapp-fc6e8-default-rtdb.firebaseio.com",
  // projectId: "testingapp-fc6e8",
  // storageBucket: "testingapp-fc6e8.appspot.com",
  //  messagingSenderId: "454768514842",
  // appId: "1:454768514842:web:5e858a5ed1b2d523d3fea3",
  // measurementId: "G-6HF5W72G91"
  //       });
  //     }
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
