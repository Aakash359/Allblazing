import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { bool } from 'prop-types';
import { connect } from 'react-redux';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.TRANSPARENT,
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const Loader = ({ visible }) => (visible ? (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" />
  </View>
) : null);

const mapStateToProps = ({ app: { visible } }) => ({ visible });

Loader.propTypes = { visible: bool.isRequired };

export default connect(mapStateToProps)(Loader);
