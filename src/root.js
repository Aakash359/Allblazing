import React from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import Routes from './routes';
import Constants from './constants';
import { Loader } from './components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
});

const Root = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.container}>
      <Loader />
      <Routes />
    </View>
  </SafeAreaView>
);

export default Root;
