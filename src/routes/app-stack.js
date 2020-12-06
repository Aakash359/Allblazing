import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Username from '../screens/onboarding/user-name';
import Userage from '../screens/onboarding/user-age';
import ConnectUserType from '../screens/onboarding/connect-user-type';
import Recent5KTime from '../screens/onboarding/recent-5k-time';
import Distance from '../screens/onboarding/distance';
import Location from '../screens/onboarding/location';

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  return (
    <Stack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
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
    </Stack.Navigator>
  );
}
