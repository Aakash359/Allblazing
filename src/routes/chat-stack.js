import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import Chats from '../screens/home/chats';
import ChatOneToOne from '../screens/chat/chat-one-to-one';
import ChatsGroup from '../screens/chat/chat-group';
import GroupInfo from '../screens/chat/group-info';
import EditGroupName from '../screens/chat/edit-group-name';
import EditGroupDisc from '../screens/chat/edit-group-disc';

const ChatStack = createStackNavigator();

function Chat() {
  return (

    <ChatStack.Navigator keyboardHandlingEnabled headerMode='screen' mode='card' initialRouteName='Chats'>
      <ChatStack.Screen
        name="Chats"
        component={Chats}
      />
      <ChatStack.Screen
        name="ChatsGroup"
        component={ChatsGroup}
        options={({ route }) => ({
          headerBackTitleVisible: false,

          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Groups',
        })}
      />
      <ChatStack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={({ route }) => ({
          headerBackTitleVisible: false,

          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || '',
        })}
      />
      <ChatStack.Screen
        name="EditGroupName"
        component={EditGroupName}
        options={({ route }) => ({
          headerBackTitleVisible: false,

          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Edit Group Name',
        })}
      />
      <ChatStack.Screen
        name="EditGroupDisc"
        component={EditGroupDisc}
        options={({ route }) => ({
          headerBackTitleVisible: false,

          headerTintColor: Constants.Colors.WHITE,
          headerTitle: route?.params?.title || 'Edit Description',
        })}
      />
      <ChatStack.Screen
        name="ChatOneToOne"
        component={ChatOneToOne}
        options={() => ({
          headerBackTitleVisible: false,
          headerLeft: null,
          headerTintColor: Constants.Colors.WHITE,
          headerTitle: null,
        })}
      />
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
