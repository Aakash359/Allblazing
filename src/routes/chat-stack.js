import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import Chats from '../screens/home/chats';

const ChatStack = createStackNavigator();

function Chat() {
  return (

    <ChatStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Chats'>
      <ChatStack.Screen
        name="Chats"
        component={Chats}
      />

      {/* <ChatStack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={({ route }) => ({
          headerBackTitleVisible: false,

          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      /> */}

    </ChatStack.Navigator>
  );
}

const ChatNavigator = () => (
  <ChatStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Chat'>
    <ChatStack.Screen
      name="Chat"
      component={Chat}
      options={() => ({
        headerBackTitleVisible: false,
        headerShown: false,
        headerTintColor: Constants.Colors.WHITE,
        headerTitle: 'Chat',
      })}
    />
  </ChatStack.Navigator>
);

export default ChatNavigator;
