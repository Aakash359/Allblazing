import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTab } from '../components';
import Constants from '../constants';
import ChatStack from './chat-stack';
import CreatePostStack from './create-post-stack';
import DiscoverStack from './discover-stack';
import HomeNavigator from './home-stack';
import ProfileStack from './profile-stack';
import { BottomTabsStyles } from '../styles';

const Tab = createBottomTabNavigator();

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

const TabNavigator = () => (
  <Tab.Navigator {...tabProps} tabBar={(props) => <BottomTab {...props} />}>
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Discover" component={DiscoverStack} />
    <Tab.Screen name="Create" component={CreatePostStack} />
    <Tab.Screen name="Chat" component={ChatStack} />
    <Tab.Screen name="Me" component={ProfileStack} />
  </Tab.Navigator>
);

export default TabNavigator;
