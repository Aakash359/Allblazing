import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SelectLanguage from '../screens/onboarding/language';
import Welcome from '../screens/onboarding/welcome';
import Intro from '../screens/onboarding/introduction';
import Login from '../screens/onboarding/login';
import ForgotPassword from '../screens/onboarding/forgot-password';
import OTP from '../screens/onboarding/otp-verification';
import Register from '../screens/onboarding/register';
import Username from '../screens/onboarding/user-name';
import Userage from '../screens/onboarding/user-age';
import ConnectUserType from '../screens/onboarding/connect-user-type';
import Recent5KTime from '../screens/onboarding/recent-5k-time';
import Distance from '../screens/onboarding/distance';
import Location from '../screens/onboarding/location';
import Dashboard from '../screens/dashboard';

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Distance">
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
        <Stack.Screen
          name="Userage"
          options={options}
          component={Userage}
        />
        <Stack.Screen
          name="ConnectUserType"
          options={options}
          component={ConnectUserType}
        />
        <Stack.Screen
          name="Recent5KTime"
          options={options}
          component={Recent5KTime}
        />
        <Stack.Screen
          name="Distance"
          options={options}
          component={Distance}
        />
        <Stack.Screen
          name="Location"
          options={options}
          component={Location}
        />
        <Stack.Screen
          name="Dashboard"
          options={options}
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
