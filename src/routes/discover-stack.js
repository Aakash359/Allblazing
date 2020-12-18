import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import { HeaderStyles } from '../styles';
import Feed from '../screens/discover/index';

const DiscoverStack = createStackNavigator();

const DiscoverNavigator = () => (
  <DiscoverStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Discover'>
    <DiscoverStack.Screen
      name="Feed"
      component={Feed}
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
        headerTitle: 'Feed',
      })}
    />
  </DiscoverStack.Navigator>
);

export default DiscoverNavigator;
