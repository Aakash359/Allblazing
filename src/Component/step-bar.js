import React from 'react';
import { arrayOf, number } from 'prop-types';
import lodash from 'lodash';
import { View, StyleSheet } from 'react-native';
import Constants from '../constants';

export const styles = StyleSheet.create({
  bar: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    flex: 1,
    height: Constants.BaseStyle.scale(3),
    marginHorizontal: Constants.BaseStyle.scale(10),
  },
  container: {
    flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: Constants.BaseStyle.scale(10),
  },
  selected: { backgroundColor: Constants.Colors.WHITE },
});

const StepBar = ({
  count, selected,
}) => (
  <View style={styles.container}>
    {lodash.times(count).map((val, index) => <View key={`bar-${val}`} style={selected.includes(index) ? [styles.bar, styles.selected] : styles.bar} />)}
  </View>
);

StepBar.propTypes = {
  count: number.isRequired,
  selected: arrayOf(number.isRequired).isRequired,
};

export default StepBar;
