import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import { BottomTabsStyles } from '../styles';

const CreatePostStack = createStackNavigator();

function CreatePost() {
  return (
    <View>
      <Text style={BottomTabsStyles.label}>{'Create Post'}</Text>
    </View>
  );
}

const CreatePostNavigator = () => (
  <CreatePostStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card'>
    <CreatePostStack.Screen
      name="CreatePost"
      component={CreatePost}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Create Post',
      })}
    />
  </CreatePostStack.Navigator>
);

export default CreatePostNavigator;
