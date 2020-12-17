import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import MyProfile from '../screens/user-profile/my-profile';
import { HeaderStyles } from '../styles';
import Runners from '../screens/home/runners';
import UserProfile from '../screens/user-profile/user-profile';
import FollowersList from '../screens/user-profile/followers-list';
import FollowingList from '../screens/user-profile/following-list';
import EditProfile from '../screens/user-profile/edit-profile';
import SearchScreen from '../screens/search';

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => (
  <ProfileStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='MyProfile'>
    <ProfileStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={({ navigation }) => ({
        headerBackTitleVisible: false,
        headerLeft: null,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Settings')}>
              <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.settings} />
            </TouchableOpacity>
          </View>
        ),
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'My Profile',
      })}
    />
    <ProfileStack.Screen
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
      })}
    />
    <ProfileStack.Screen
      name="UserProfile"
      component={UserProfile}
      options={({ navigation }) => ({
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Filter')}>
              <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.threeDots} />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: '',
      })}
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
      options={({ navigation }) => ({
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Filter')}>
              <Image resizeMode='contain' style={HeaderStyles.filterIcon} source={Constants.Images.filter} />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: 'Search',
      })}
    />
  </ProfileStack.Navigator>
);

export default ProfileNavigator;
