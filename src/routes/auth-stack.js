import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import SelectLanguage from '../screens/onboarding/language';
import Welcome from '../screens/onboarding/welcome';
import Intro from '../screens/onboarding/introduction';
import Login from '../screens/onboarding/login';
import ForgotPassword from '../screens/onboarding/forgot-password';
import OTP from '../screens/onboarding/otp-verification';
import Register from '../screens/onboarding/register';
import StaticContent from '../screens/static-content';
import Username from '../screens/onboarding/user-name';
import Userage from '../screens/onboarding/user-age';
import UserGender from '../screens/onboarding/user-gender';
import ConnectUserType from '../screens/onboarding/connect-user-type';
import UserPersonalBest from '../screens/onboarding/user-personal-best';
import UserMotto from '../screens/onboarding/user-motto';
import Distance from '../screens/onboarding/distance';
import Location from '../screens/onboarding/location';
import Constants from '../constants';
import { CommonStyles } from '../styles';

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  return (
    <Stack.Navigator headerMode="screen" initialRouteName="SelectLanguage">
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
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
        })}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
        })}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
        })}
      />
      <Stack.Screen
        name="StaticContent"
        component={StaticContent}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <Stack.Screen
        name="Username"
        component={Username}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <Stack.Screen
        name="Userage"
        component={Userage}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <Stack.Screen
        name="UserGender"
        component={UserGender}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Gender',
        })}
      />
      <Stack.Screen
        name="UserMotto"
        component={UserMotto}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Motto',
        })}
      />
      <Stack.Screen
        name="ConnectUserType"
        options={options}
        component={ConnectUserType}
      />
      <Stack.Screen
        name="UserPersonalBest"
        component={UserPersonalBest}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
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
