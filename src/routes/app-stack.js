import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Username from '../screens/onboarding/user-name';
import Userage from '../screens/onboarding/user-age';
import ConnectUserType from '../screens/onboarding/connect-user-type';
import Recent5KTime from '../screens/onboarding/recent-5k-time';
import Distance from '../screens/onboarding/distance';
import Location from '../screens/onboarding/location';
import InviteFriends from '../screens/home/invite-friends';
import Dashboard from './bottom-tabs-stack';
import Events from '../screens/events';
import Constants from '../constants';
import { HeaderStyles } from '../styles';

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
      <Stack.Screen
        name="Dashboard"
        options={options}
        component={Dashboard}
      />
      <Stack.Screen
        name="Events"
        component={Events}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.mapIcon} source={Constants.Images.map} /></TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
        }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7}><Text style={HeaderStyles.headerRightTextStyle}>Select All</Text></TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Strava Users',
        }}
      />
    </Stack.Navigator>
  );
}
