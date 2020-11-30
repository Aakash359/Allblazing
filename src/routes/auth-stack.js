import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SelectLanguage from '../screens/onboarding/language';
import Welcome from '../screens/onboarding/welcome';
import Intro from '../screens/onboarding/introduction';
import Login from '../screens/onboarding/login';
import ForgotPassword from '../screens/onboarding/forgot-password';
import OTP from '../screens/onboarding/otp-verification';
import Register from '../screens/onboarding/register';

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="SelectLanguage">
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
    </Stack.Navigator>
  );
}
