import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectLanguage from '../Screens/Auth/SelectLanguage';
import Welcome from '../Screens/Auth/Welcome';
import Intro from '../Screens/Auth/Intro';
import Login from '../Screens/Auth/Login';
import ForgotPassword from '../Screens/Auth/ForgotPassword';
import OTP from '../Screens/Auth/OTP';
import Register from '../Screens/Auth/Register';
import Username from '../Screens/Auth/Username';

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SelectLanguage">
        <Stack.Screen
          name="SelectLanguage"
          options={options}
          component={SelectLanguage}
        />
        <Stack.Screen
          name="Welcome"
          options={options}
          component={Welcome}
        />
        <Stack.Screen
          name="Intro"
          options={options}
          component={Intro}
        />
        <Stack.Screen
          name="Login"
          options={options}
          component={Login}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={options}
          component={ForgotPassword}
        />
        <Stack.Screen
          name="OTP"
          options={options}
          component={OTP}
        />
        <Stack.Screen
          name="Register"
          options={options}
          component={Register}
        />
        <Stack.Screen
          name="Username"
          options={options}
          component={Username}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
