import React from 'react';
import { Text, View } from 'react-native';
import { func } from 'prop-types';
import { Callout as CallOut } from 'react-native-maps';
import { EventMapStyles } from '../../styles';

const MarkerCallOut = ({ onPress }) => (
  <CallOut
    alphaHitTest
    tooltip
    onPress={(e) => {
      if (e.nativeEvent.action === 'marker-inside-overlay-press' || e.nativeEvent.action === 'callout-inside-press') {
        onPress();
      }
    }}
    style={EventMapStyles.bubbleContainer}
  >
    <View style={EventMapStyles.bubbleContent}>
      <View style={EventMapStyles.bubble}>
        <View style={EventMapStyles.amount}>
          <Text style={EventMapStyles.amountStyle}>
            {'hey'}
          </Text>
        </View>
      </View>
    </View>
  </CallOut>
);

MarkerCallOut.propTypes = { onPress: func.isRequired };

export default MarkerCallOut;
