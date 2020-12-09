import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import Home from '../screens/home';
import { HeaderStyles } from '../styles';
import Runners from '../screens/home/runners';
import SearchScreen from '../screens/search';
import FeedScreen from '../screens/discover/feed';
import FeedDetailScreen from '../screens/discover/feed-detail';

const HomeStack = createStackNavigator();

const options = { headerShown: false };

const HomeNavigator = () => (
  <HomeStack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Dashboard" mode='card'>
    <HomeStack.Screen name="Home" options={options} component={Home} />
    <HomeStack.Screen
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
      })}
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
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Search',
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
        headerTintColor: Constants.Colors.WHITE,
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
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Feed Detail',
      }}
    />
  </HomeStack.Navigator>
);

export default HomeNavigator;
