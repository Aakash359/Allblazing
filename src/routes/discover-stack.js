import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import { BottomTabsStyles } from '../styles';

const DiscoverStack = createStackNavigator();

function Discover() {
  return (
    <View>
      <Text style={BottomTabsStyles.label}>{'Discover'}</Text>
    </View>
  );
}

const DiscoverNavigator = () => (
  <DiscoverStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card'>
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
