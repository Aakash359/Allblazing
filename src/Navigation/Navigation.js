import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectLanguage from '../Screens/Auth/SelectLanguage';
import Welcome from '../Screens//Auth/Welcome'
import Intro from '../Screens//Auth/Intro'
import Login from '../Screens//Auth/Login'
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import OTP from '../Screens/Auth/OTP';

const Stack = createStackNavigator();


export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectLanguage">
        <Stack.Screen
          name="SelectLanguage"
          options={{headerShown: false}}
          component={SelectLanguage}
        />
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={Welcome}
        />
         <Stack.Screen
          name="Intro"
          options={{headerShown: false}}
          component={Intro}
        />
         <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={Login}
              />
              <Stack.Screen
                  name="ForgotPassword"
                  options={{ headerShown: false }}
                  component={ForgotPassword}
        />
        <Stack.Screen
                  name="OTP"
                  options={{ headerShown: false }}
                  component={OTP}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
