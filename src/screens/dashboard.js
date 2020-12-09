import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styles } from '../components/forgot-password-modal';

function HomeScreen() {
  return (
    <View style={styles.dashBoardstyles}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    // eslint-disable-next-line no-use-before-define
    <View style={dashBoardstyles.dashboardContainer}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
const dashBoardstyles = StyleSheet.create({
  dashboardContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
