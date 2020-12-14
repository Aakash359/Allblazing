import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import { HeaderStyles } from '../styles';
import Feed from '../screens/discover/index';
import FeedDetailScreen from '../screens/discover/feed-detail';
import LiveFeed from '../screens/discover/live-feed';

const DiscoverStack = createStackNavigator();

const DiscoverNavigator = () => (
  <DiscoverStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Discover'>
    <DiscoverStack.Screen
      name="Feed"
      component={Feed}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} /></TouchableOpacity>
          </View>
        ),
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Feed',
      }}
    />
    <DiscoverStack.Screen
      name="FeedDetailScreen"
      component={FeedDetailScreen}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: '',
      })}
    />
    <DiscoverStack.Screen
      name="LiveFeed"
      component={LiveFeed}
      options={{
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Live',
      }}
    />
  </DiscoverStack.Navigator>
);

export default DiscoverNavigator;
