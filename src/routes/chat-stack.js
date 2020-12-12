import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from '../constants';
import { BottomTabsStyles } from '../styles';

const ChatStack = createStackNavigator();

function Chat() {
  return (
    <View>
      <Text style={BottomTabsStyles.label}>{'Chat'}</Text>
    </View>
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
