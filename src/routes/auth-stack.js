import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import SelectLanguage from '../screens/onboarding/language';
import Welcome from '../screens/onboarding/welcome';
import Intro from '../screens/onboarding/introduction';
import Login from '../screens/onboarding/login';
import ForgotPassword from '../screens/onboarding/forgot-password';
import OTP from '../screens/onboarding/otp-verification';
import ForgotOTP from '../screens/onboarding/forgot-otp-verification';
import ResetPassword from '../screens/onboarding/ResetPassword';
import Register from '../screens/onboarding/register';
import StaticContent from '../screens/settings/static-content';
import Username from '../screens/user-profile/user-name';
import Userage from '../screens/user-profile/user-age';
import ConnectUserType from '../screens/user-profile/connect-user-type';
import UserPersonalBest from '../screens/user-profile/user-personal-best';
import Distance from '../screens/user-profile/distance';
import Location from '../screens/onboarding/location';
import Constants from '../constants';
import { CommonStyles } from '../styles';

const AuthStack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  const { t: translate } = useTranslation();

  return (
    <AuthStack.Navigator headerMode="screen" initialRouteName="SelectLanguage">
      <AuthStack.Screen
        name="SelectLanguage"
        options={options}
        component={SelectLanguage}
      />
      <AuthStack.Screen
        name="Welcome"
        options={options}
        component={Welcome}
      />
      <AuthStack.Screen
        name="Intro"
        options={options}
        component={Intro}
      />
      <AuthStack.Screen
        name="Login"
        options={options}
        component={Login}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
          headerTitleAlign: 'center',
        })}
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name="OTP"
        component={OTP}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="ForgotOTP"
        component={ForgotOTP}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="StaticContent"
        component={StaticContent}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title ? translate(`settings.${route.params.title}`) : '',
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="Username"
        component={Username}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title ? translate(`profile.${route.params.title}`) : '',
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="Userage"
        component={Userage}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title ? translate(`profile.${route.params.title}`) : '',
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="ConnectUserType"
        options={options}
        component={ConnectUserType}
      />
      <AuthStack.Screen
        name="UserPersonalBest"
        component={UserPersonalBest}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title ? translate(`profile.${route.params.title}`) : '',
          headerTitleAlign: 'center',
        })}
      />
      <AuthStack.Screen
        name="Distance"
        options={options}
        component={Distance}
      />
      <AuthStack.Screen
        name="Location"
        options={options}
        component={Location}
      />
    </AuthStack.Navigator>
  );
}
