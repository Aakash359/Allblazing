import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import { HeaderStyles } from '../styles';
import CreateNew from '../screens/create/create-new';
import CreateGroup from '../screens/create/create-group';
import AddMember from '../screens/create/add-member';
import CreateEvent from '../screens/create/create-event';
import CreatePost from '../screens/create/create-post';

const CreatePostStack = createStackNavigator();

const CreatePostNavigator = () => (
  <CreatePostStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='CreatePost'>
    <CreatePostStack.Screen
      name="CreateNew"
      component={CreateNew}
      options={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'CreateNew',
      }}
    />
    <CreatePostStack.Screen
      name="CreateGroup"
      component={CreateGroup}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Create Post',
      })}
    />
    <CreatePostStack.Screen
      name="AddMember"
      component={AddMember}
      options={{
        headerBackTitleVisible: false,
        headerRight: () => (
          <View style={HeaderStyles.row}>
            <Text style={HeaderStyles.headerRightTextStyle}>Select All</Text>
          </View>
        ),
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Add Member',
      }}
    />
    <CreatePostStack.Screen
      name="CreateEvent"
      component={CreateEvent}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Create Event',
      })}
    />
    <CreatePostStack.Screen
      name="CreatePost"
      component={CreatePost}
      options={() => ({
        headerBackTitleVisible: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Create Post',
      })}
    />
  </CreatePostStack.Navigator>
);

export default CreatePostNavigator;
