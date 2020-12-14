import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { CommonStyles, HeaderStyles } from '../styles';
import Constants from '../constants';
import Username from '../screens/user-profile/user-name';
import Userage from '../screens/user-profile/user-age';
import UserGender from '../screens/user-profile/user-gender';
import ConnectUserType from '../screens/user-profile/connect-user-type';
import UserPersonalBest from '../screens/user-profile/user-personal-best';
import UserMotto from '../screens/user-profile/user-motto';
import UserProfile from '../screens/user-profile/user-profile';
import Distance from '../screens/user-profile/distance';
import Location from '../screens/onboarding/location';
import ChangePassword from '../screens/settings/change-password';
import ContactUS from '../screens/settings/contact-us';
import ChangeLanguage from '../screens/settings/change-language';
import EditLocation from '../screens/user-profile/edit-location';
import Settings from '../screens/settings';
import InviteFriends from '../screens/settings/invite-friends';
import StravaUsers from '../screens/settings/invite-friends/strava-users';
import Dashboard from './bottom-tabs-stack';
import Events from '../screens/events';
import Filter from '../screens/filter';
import SearchScreen from '../screens/search';
import StaticContent from '../screens/settings/static-content';
import BlockReportUser from '../screens/block-report-user';
import SingleEventDetail from '../screens/events/detail';

import FeedDetailScreen from '../screens/discover/feed-detail';
import Notifications from '../screens/home/notifications';
import Runners from '../screens/home/runners';
import LiveStream from '../screens/streams';

const AppStack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  return (
    <AppStack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
      <AppStack.Screen
        name="Username"
        component={Username}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <AppStack.Screen
        name="Userage"
        component={Userage}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <AppStack.Screen
        name="UserGender"
        component={UserGender}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Gender',
        })}
      />
      <AppStack.Screen
        name="UserMotto"
        component={UserMotto}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Motto',
        })}
      />
      <AppStack.Screen
        name="ConnectUserType"
        options={options}
        component={ConnectUserType}
      />
      <AppStack.Screen
        name="UserPersonalBest"
        component={UserPersonalBest}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerShown: !!route?.params?.title,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <AppStack.Screen
        name="Distance"
        options={options}
        component={Distance}
      />
      <AppStack.Screen
        name="Location"
        options={options}
        component={Location}
      />
      <AppStack.Screen
        name="Dashboard"
        options={options}
        component={Dashboard}
      />
      <AppStack.Screen
        name="EditLocation"
        component={EditLocation}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Location',
        })}
      />
      <AppStack.Screen
        name="Events"
        component={Events}
        options={({
          navigation, route,
        }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Filter')}>
                <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.setParams({ isMapView: !route?.params?.isMapView })}>
                <Image resizeMode='contain' style={HeaderStyles.mapIcon} source={Constants.Images.map} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
        })}
      />
      <AppStack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (route?.params?.title ? null : (
            <TouchableOpacity activeOpacity={0.7}><Text style={HeaderStyles.headerRightTextStyle}>Select All</Text></TouchableOpacity>
          )),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Invite Friends',
        })}
      />
      <AppStack.Screen
        name="StravaUsers"
        component={StravaUsers}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (route?.params?.title ? null : (
            <TouchableOpacity activeOpacity={0.7}><Text style={HeaderStyles.headerRightTextStyle}>Select All</Text></TouchableOpacity>
          )),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Strava Users',
        })}
      />
      <AppStack.Screen
        name="Filter"
        component={Filter}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Filters',
        })}
      />
      <AppStack.Screen
        name="SingleEventDetail"
        component={SingleEventDetail}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Event Details',
        })}
      />
      <AppStack.Screen
        name="StaticContent"
        component={StaticContent}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <AppStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.crossIcon} source={Constants.Images.close} /></TouchableOpacity>
            </View>
          ),
          headerTitle: 'Notifications',
        }}
      />
      <AppStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Change Password',
        })}
      />
      <AppStack.Screen
        name="ContactUS"
        component={ContactUS}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Contact Us',
        })}
      />
      <AppStack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Change Language',
        })}
      />
      <AppStack.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Settings',
        })}
      />
      <AppStack.Screen
        name="BlockReportUser"
        component={BlockReportUser}
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
      <AppStack.Screen
        name="LiveStream"
        component={LiveStream}
        options={options}
      />
      <AppStack.Screen
        name="Runners"
        component={Runners}
        options={({
          navigation, route,
        }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Filter')}>
                <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.setParams({ isMapView: !route?.params?.isMapView })}>
                <Image resizeMode='contain' style={HeaderStyles.mapIcon} source={Constants.Images.map} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Runners',
        })}
      />
      <AppStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Search',
        }}
      />
      <AppStack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Feed Detail',
        }}
      />
      <AppStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.setParams({ visible: true })}>
                <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.more} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
        })}
      />
    </AppStack.Navigator>
  );
}
