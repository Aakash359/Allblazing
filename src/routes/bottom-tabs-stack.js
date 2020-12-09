import * as React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTab } from '../components';
import Constants from '../constants';
import Home from '../screens/home';
import MyProfile from '../screens/profile/myProfile';
import { BottomTabsStyles, HeaderStyles, CommonStyles } from '../styles';
// import Recent5KTime from '../../screens/onboarding/recent-5k-time';
import InviteFriends from '../screens/home/invite-friends';
import Runners from '../screens/home/runners';
import EditLocation from '../screens/onboarding/edit-location';
import Events from '../screens/events';
import UserProfile from '../screens/userProfile/userProfile';
import FollowersList from '../screens/profile/followersList';
import FollowingList from '../screens/profile/followingList';
import EditProfile from '../screens/profile/EditProfile';
import SearchScreen from '../screens/search/seachScreen';
import Notification from '../screens/home/notifications';
import Filter from '../screens/filter';
import StaticContent from '../screens/static-content';
import SingleEventDetail from '../screens/events/detail';
import FeedScreen from '../screens/discover/feed';
import FeedDetailScreen from '../screens/discover/feedDetail';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const AddStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function Discover() {
  return (
    <View>
      <Text style={BottomTabsStyles.label}>{'Discover'}</Text>
    </View>
  );
}

const options = { headerShown: false };

const homeNavigator = () => (
  <HomeStack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
    <HomeStack.Screen
      name="Home"
      options={options}
      component={Home}
    />
    {/* <HomeStack.Screen
      name="Dashboard"
      options={options}
      component={Dashboard}
    /> */}
    <HomeStack.Screen
      name="EditLocation"
      component={EditLocation}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Edit Location',
      })}
    />
    <HomeStack.Screen
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
    <HomeStack.Screen
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
    <HomeStack.Screen
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
    <HomeStack.Screen
      name="SingleEventDetail"
      component={SingleEventDetail}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Event Details',
      })}
    />
    <HomeStack.Screen
      name="StaticContent"
      component={StaticContent}
      options={({ route }) => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: route?.params?.title || '',
      })}
    />
    <HomeStack.Screen
      name="Runners"
      component={Runners}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.mapIcon} source={Constants.Images.map} /></TouchableOpacity>
          </View>
        ),
      }}
    />
    <HomeStack.Screen
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
    <HomeStack.Screen
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
    <HomeStack.Screen
      name="FeedScreen"
      component={FeedScreen}
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
    <HomeStack.Screen
      name="FeedDetailScreen"
      component={FeedDetailScreen}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
          </View>
        ),
        headerTitle: 'FeedDetail',
      }}
    />
  </HomeStack.Navigator>
);

const discoverNavigator = () => (
  <DiscoverStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card'>
    <DiscoverStack.Screen
      name="Discover"
      component={Discover}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Discover',
      })}
    />
  </DiscoverStack.Navigator>
);

const createNavigator = () => (
  <AddStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card'>
    <AddStack.Screen
      name="Discover"
      component={Discover}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Add',
      })}
    />
  </AddStack.Navigator>
);
const chatNavigator = () => (
  <ChatStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card'>
    <ChatStack.Screen
      name="Discover"
      component={Discover}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Chat',
      })}
    />
  </ChatStack.Navigator>
);

const profileNavigator = () => (
  <ProfileStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card'>
    <ProfileStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.settings} /></TouchableOpacity>
          </View>
        ),
        headerTitle: 'Me',
      }}
    />
    <ProfileStack.Screen
      name="Runners"
      component={Runners}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.mapIcon} source={Constants.Images.map} /></TouchableOpacity>
          </View>
        ),
      }}
    />
    <ProfileStack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.threeDots} /></TouchableOpacity>
          </View>
        ),
        headerTitle: '',
      }}
    />
    <ProfileStack.Screen
      name="FollowersList"
      component={FollowersList}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Followers',
      }}
    />
    <ProfileStack.Screen
      name="FollowingList"
      component={FollowingList}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Following',
      }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerBackTitleVisible: false,
        headerTitle: 'Edit Profile',
      }}
    />
    <ProfileStack.Screen
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
  </ProfileStack.Navigator>
);

// function Screen() {
//   return (
//     <View>
//       <Text>{'Home'}</Text>
//     </View>
//   );
// }

const TabNavigator = () => {
  const tabBarOptions = {
    activeBackgroundColor: Constants.Colors.SECONDARY_COLOR,
    activeTintColor: Constants.Colors.WHITE,
    inactiveBackgroundColor: Constants.Colors.SECONDARY_COLOR,
    inactiveTintColor: Constants.Colors.SECONDARY_COLOR,
    keyboardHidesTabBar: true,
    labelPosition: 'below-icon',
    labelStyle: BottomTabsStyles.label,
    showLabel: true,
    style: BottomTabsStyles.tab,
  };

  const tabProps = {
    backBehavior: 'history',
    initialRouteName: 'Home',
    lazy: true,
    sceneContainerStyle: BottomTabsStyles.container,
    tabBarOptions,
  };

  return (
    <Tab.Navigator {...tabProps} tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={homeNavigator} />
      <Tab.Screen name="Discover" component={discoverNavigator} />
      <Tab.Screen name="Create" component={createNavigator} />
      <Tab.Screen name="Chat" component={chatNavigator} />
      <Tab.Screen name="MyProfile" component={profileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
