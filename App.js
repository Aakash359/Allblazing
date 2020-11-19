/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local                                                                          
 */

import React from 'react';
import {
 
  View,
  Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Navigation from './src/Navigation/Navigation'
class App extends React.Component{

   componentDidMount() {
        SplashScreen.hide();
    }
   render(){
     return (
      <Navigation/>
//       <View style={{flex: 1,alignItems:'center',justifyContent:'center' }}>
//        <Text>App Screen</Text>
// </View>
    ) 
    
    // <SafeAreaView>
    //   <StatusBar barStyle="dark-content" />
    // <ScrollView>
    //   <Text>App Screen</Text>
    //   </ScrollView>
    // </SafeAreaView> 
  
    }
    }


export default App;
