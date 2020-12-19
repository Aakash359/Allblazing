import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import Chats from '../screens/chat';

const ChatStack = createStackNavigator();

const ChatNavigator = () => (
  <ChatStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Chats'>
    <ChatStack.Screen
      name="Chats"
      component={Chats}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Chat',
        headerTitleAlign: 'center',
      })}
    />
  </ChatStack.Navigator>
);

export default ChatNavigator;
