import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import Discover from '../screens/discover';

const DiscoverStack = createStackNavigator();

const DiscoverNavigator = () => (
  <DiscoverStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Discover'>
    <DiscoverStack.Screen
      name="Discover"
      component={Discover}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Discover',
      })}
    />
  </DiscoverStack.Navigator>
);

export default DiscoverNavigator;
