import React from 'react';
import { number } from 'prop-types';
import lodash from 'lodash';
import { View, StyleSheet } from 'react-native';
import { Colors, Scale } from '../Config';

export const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.TEXT_COLOR2,
    flex: 1,
    height: Scale(3),
    marginHorizontal: Scale(10),
  },
  container: {
    flexDirection: 'row', justifyContent: 'space-evenly', marginHorizontal: Scale(10),
  },
  selected: { backgroundColor: Colors.WHITE },
});

const Bar = ({
  count, selected,
}) => (
  <View style={styles.container}>
    {lodash.times(count).map((val, index) => <View style={index === selected ? [styles.bar, styles.selected] : styles.bar} />)}
  </View>
);

Bar.propTypes = {
  count: number.isRequired,
  selected: number.isRequired,
};

export default Bar;
