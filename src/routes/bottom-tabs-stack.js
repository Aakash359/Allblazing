import * as React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTab } from '../components';
import Constants from '../constants';
import Home from '../screens/home';
import MyProfile from '../screens/profile/myProfile';
import { BottomTabsStyles, HeaderStyles } from '../styles';
import Username from '../screens/onboarding/user-name';
import Userage from '../screens/onboarding/user-age';
import ConnectUserType from '../screens/onboarding/connect-user-type';
import Recent5KTime from '../screens/onboarding/recent-5k-time';
import Distance from '../screens/onboarding/distance';
import Location from '../screens/onboarding/location';
import InviteFriends from '../screens/home/invite-friends';
import Runners from '../screens/home/runners';
// import Dashboard from './bottom-tabs-stack';
import Events from '../screens/events';
import UserProfile from '../screens/userProfile/userProfile';
import FollowersList from '../screens/profile/followersList';
import FollowingList from '../screens/profile/followingList';
import EditProfile from '../screens/profile/EditProfile';
import SearchScreen from '../screens/search/seachScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();
const DiscoverStack = createStackNavigator();
const AddStack = createStackNavigator();
const ChatStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const options = { headerShown: false };

const homeNavigator = () => (

  <HomeStack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
    <HomeStack.Screen
      name="Username"
      options={options}
      component={Username}
    />
    <HomeStack.Screen
      name="Userage"
      options={options}
      component={Userage}
    />
    <HomeStack.Screen
      name="ConnectUserType"
      options={options}
      component={ConnectUserType}
    />
    <HomeStack.Screen
      name="Recent5KTime"
      options={options}
      component={Recent5KTime}
    />
    <HomeStack.Screen
      name="Distance"
      options={options}
      component={Distance}
    />
    <HomeStack.Screen
      name="Location"
      options={options}
      component={Location}
    />
    <HomeStack.Screen
      name="Home"
      options={options}
      component={Home}
    />
    <HomeStack.Screen
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
    <HomeStack.Screen
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
  </HomeStack.Navigator>
);

const discoverNavigator = () => (
  <DiscoverStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' />
);

const createNavigator = () => (
  <AddStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' />
);
const chatNavigator = () => (
  <ChatStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' />
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
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';
    // const routeName = route.name;

    if (routeName === 'Username' || routeName === 'Userage' || routeName === 'ConnectUserType' || routeName === 'Recent5KTime'
        || routeName === 'Distance' || routeName === 'Location') {
      return false;
    }

    return true;
  };
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
      <Tab.Screen
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
        name="Home"
        component={homeNavigator}
      />
      <Tab.Screen
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
        name="Discover"
        component={discoverNavigator}
      />
      <Tab.Screen
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
        name="Create"
        component={createNavigator}
      />
      <Tab.Screen
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
        name="Chat"
        component={chatNavigator}
      />
      <Tab.Screen
        options={({ route }) => ({ tabBarVisible: getTabBarVisibility(route) })}
        name="MyProfile"
        component={profileNavigator}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
