import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import AuthStack from './auth-stack';
import AppStack from './app-stack';

const RootStack = createStackNavigator();

const AppNavigator = ({ isAuthorized }) => (
  <RootStack.Navigator initialRouteName='AuthStack' headerMode="none">
    {isAuthorized
      ? <RootStack.Screen name='AppStack' component={AppStack} />
      : <RootStack.Screen name='AuthStack' component={AuthStack} />}
  </RootStack.Navigator>
);

AppNavigator.propTypes = { isAuthorized: bool };
AppNavigator.defaultProps = { isAuthorized: false };

const mapStateToProps = (state) => ({ isAuthorized: state.user.isAuthorized });

export default connect(mapStateToProps)(AppNavigator);
