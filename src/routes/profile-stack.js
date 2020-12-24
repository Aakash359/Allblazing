import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Constants from '../constants';
import MyProfile from '../screens/user-profile/my-profile';
import { HeaderStyles } from '../styles';

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
        headerTitle: 'Me',
        headerTitleAlign: 'center',
      })}
    />
  </ProfileStack.Navigator>
);

export default ProfileNavigator;
