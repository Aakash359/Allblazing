import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { BottomTab } from '../components';
import Constants from '../constants';
import Home from '../screens/home';
import { BottomTabsStyles } from '../styles';

const Tab = createBottomTabNavigator();

function Screen() {
  return (
    <View>
      <Text>{'Home'}</Text>
    </View>
  );
}

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

export default function Dashboard() {
  return (
    <Tab.Navigator {...tabProps} tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Discover" component={Screen} />
      <Tab.Screen name="Create" component={Screen} />
      <Tab.Screen name="Chat" component={Screen} />
      <Tab.Screen name="Me" component={Screen} />
    </Tab.Navigator>
  );
}
