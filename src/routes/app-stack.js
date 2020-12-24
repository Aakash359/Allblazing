import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
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
import ChatOneToOne from '../screens/chat/chat-one-to-one';
import ChatsGroup from '../screens/chat/chat-group';
import GroupInfo from '../screens/chat/group-info';
import BlockReportUser from '../screens/block-report-user';
import SingleEventDetail from '../screens/events/detail';
import CreateEvent from '../screens/create/create-event';
import CreateGroup from '../screens/create/create-group';
import AddMember from '../screens/create/add-member';
import LiveFeed from '../screens/discover/live-feed';
import CreatePost from '../screens/create/create-post';
import GroupDetail from '../screens/chat/group-detail';
import EditGroupName from '../screens/chat/edit-group-name';
import EditGroupDisc from '../screens/chat/edit-group-disc';
import FeedDetailScreen from '../screens/discover/feed-detail';
import Notifications from '../screens/home/notifications';
import Runners from '../screens/home/runners';
import LiveStream from '../screens/streams';
import FollowersList from '../screens/user-profile/followers-list';
import FollowingList from '../screens/user-profile/following-list';
import EditProfile from '../screens/user-profile/edit-profile';

const AppStack = createStackNavigator();
const options = { headerShown: false };

export default function MainNavigator() {
  const { t: translate } = useTranslation();

  return (
    <AppStack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
      <AppStack.Screen
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
      <AppStack.Screen
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
      <AppStack.Screen
        name="UserGender"
        component={UserGender}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('profile.Edit Gender'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="UserMotto"
        component={UserMotto}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('profile.Edit Motto'),
          headerTitleAlign: 'center',
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
          headerTitle: route?.params?.title ? translate(`profile.${route.params.title}`) : '',
          headerTitleAlign: 'center',
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
          headerTitle: translate('profile.Edit Location'),
          headerTitleAlign: 'center',
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
          headerTitle: translate('events.title'),
          headerTitleAlign: 'center',
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
          headerTitle: route?.params?.title ? translate(route.params.title) : translate('settings.Invite Friends'),
          headerTitleAlign: 'center',
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
          headerTitle: route?.params?.title ? translate(route.params.title) : translate('settings.Strava Users'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="Filter"
        component={Filter}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
              <Image source={Constants.Images.close} resizeMode='contain' style={CommonStyles.crossImage} />
            </TouchableOpacity>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('filters.Filters'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="SingleEventDetail"
        component={SingleEventDetail}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('events.Event Details'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="ChatOneToOne"
        component={ChatOneToOne}
        options={{
          header: null,
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="ChatsGroup"
        component={ChatsGroup}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Groups',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="EditGroupName"
        component={EditGroupName}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Edit Group Name',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="EditGroupDisc"
        component={EditGroupDisc}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Edit Description',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="StaticContent"
        component={StaticContent}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title ? translate(route.params.title) : '',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="Notifications"
        component={Notifications}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                <Image resizeMode='contain' style={HeaderStyles.crossIcon} source={Constants.Images.close} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Notifications',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('settings.Change Password'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="ContactUS"
        component={ContactUS}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('settings.Contact Us'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="ChangeLanguage"
        component={ChangeLanguage}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('settings.Change Language'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="Settings"
        component={Settings}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: translate('settings.Settings'),
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="BlockReportUser"
        component={BlockReportUser}
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
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Filter')}>
                <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} />
              </TouchableOpacity>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Search',
          headerTitleAlign: 'center',
        })}
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
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Create Event',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Create Group',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="AddMember"
        component={AddMember}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            <View style={HeaderStyles.row}>
              <Text style={HeaderStyles.headerRightTextStyle}>Select All</Text>
            </View>
          ),
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Add Member',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name="CreatePost"
        component={CreatePost}
        options={() => ({
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Create Post',
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: '',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={() => ({
          headerBackTitleVisible: false,
          headerShown: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
          headerTitleAlign: 'center',
        })}
      />
      <AppStack.Screen
        name="LiveFeed"
        component={LiveFeed}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Live',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name="FollowersList"
        component={FollowersList}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Followers',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name="FollowingList"
        component={FollowingList}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Following',
          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
      />
    </AppStack.Navigator>
  );
}
