import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import CreateNew from '../screens/create/create-new';

const CreatePostStack = createStackNavigator();

const CreatePostNavigator = () => (
  <CreatePostStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='CreateNew'>
    <CreatePostStack.Screen
      name="CreateNew"
      component={CreateNew}
      options={{
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Create New',
        headerTitleAlign: 'center',
      }}
    />
  </CreatePostStack.Navigator>
);

export default CreatePostNavigator;
