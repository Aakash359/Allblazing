import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';

const HomeStack = createStackNavigator();

const options = { headerShown: false };

const HomeNavigator = () => (
  <HomeStack.Navigator keyboardHandlingEnabled headerMode='screen' initialRouteName="Overview" mode='card'>
    <HomeStack.Screen name="Overview" options={options} component={Home} />
  </HomeStack.Navigator>
);

export default HomeNavigator;
