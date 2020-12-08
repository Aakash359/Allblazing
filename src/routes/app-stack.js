import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Username from '../screens/onboarding/user-name';
import Userage from '../screens/onboarding/user-age';
import UserGender from '../screens/onboarding/user-gender';
import ConnectUserType from '../screens/onboarding/connect-user-type';
import UserPersonalBest from '../screens/onboarding/user-personal-best';
import UserMotto from '../screens/onboarding/user-motto';
import Distance from '../screens/onboarding/distance';
import Location from '../screens/onboarding/location';
import EditLocation from '../screens/onboarding/edit-location';
import InviteFriends from '../screens/home/invite-friends';
import Dashboard from './bottom-tabs-stack';
import Events from '../screens/events';
import Filter from '../screens/filter';
import SearchScreen from '../screens/search/seachScreen';
import StaticContent from '../screens/static-content';
import SingleEventDetail from '../screens/events/detail';
import Constants from '../constants';
import Notification from '../screens/home/notifications';
import FeedScreen from '../screens/discover/feed';
import { CommonStyles, HeaderStyles } from '../styles';
import FeedDetailScreen from '../screens/discover/feedDetail';

const Stack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  return (
    <Stack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
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
      <Stack.Screen
        name="Dashboard"
        options={options}
        component={Dashboard}
      />
      <Stack.Screen
        name="EditLocation"
        component={EditLocation}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Location',
        })}
      />
      <Stack.Screen
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
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (route?.params?.title ? null : (
            <TouchableOpacity activeOpacity={0.7}><Text style={HeaderStyles.headerRightTextStyle}>Select All</Text></TouchableOpacity>
          )),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Strava Users',
        })}
      />
      <Stack.Screen
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
      <Stack.Screen
        name="SingleEventDetail"
        component={SingleEventDetail}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Event Details',
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
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            </View>
          ),
          headerTitle: 'Search',
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
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
      <Stack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          headerBackTitleVisible: true,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            </View>
          ),
          headerTitle: 'Feed',
        }}
      />
      <Stack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            </View>
          ),
          headerTitle: 'Feed',
        }}
      />
    </Stack.Navigator>
  );
}
