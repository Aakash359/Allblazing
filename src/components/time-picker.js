import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import times from 'lodash/times';
import { bool, func, string } from 'prop-types';
import { WheelPicker } from 'react-native-wheel-picker-android';
import AnimatedModal from './animate-modal';
import { AuthStyle, PopupStyles, OTPStyles } from '../styles';
import Constants from '../constants';

const hours = times(24, (i) => (i > 9 ? `${i}` : `0${i}`));
const minutes = times(60, (i) => (i > 9 ? `${i}` : `0${i}`));
const seconds = times(60, (i) => (i > 9 ? `${i}` : `0${i}`));

const TimePopup = ({
  hour,
  minute,
  onClose,
  onPress,
  onValueChange,
  second,
  visible,
}) => (
  <AnimatedModal visible={visible}>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapper}>
        <Text style={PopupStyles.header}>{'What is your recent 1km time?'}</Text>
        <View style={PopupStyles.divider} />
        <View style={PopupStyles.pickersContainer}>
          <Text style={PopupStyles.hourLabel}>{'HH'}</Text>
          <Text style={PopupStyles.minuteLabel}>{'MM'}</Text>
          <Text style={PopupStyles.secondLabel}>{'SS'}</Text>
        </View>
        <View style={PopupStyles.divider} />
        <View style={PopupStyles.pickersContainer}>
          <WheelPicker
            style={PopupStyles.picker}
            itemStyle={PopupStyles.pickerItem}
            selectedItem={Number(hour)}
            selectedItemTextColor={Constants.Colors.WHITE}
            data={hours}
            onItemSelected={(value) => onValueChange(value, 'hour')}
          />
          <WheelPicker
            style={PopupStyles.picker}
            itemStyle={PopupStyles.pickerItem}
            selectedItem={Number(minute)}
            data={minutes}
            selectedItemTextColor={Constants.Colors.WHITE}
            onItemSelected={(value) => onValueChange(value, 'minute')}
          />
          <WheelPicker
            style={PopupStyles.picker}
            itemStyle={PopupStyles.pickerItem}
            selectedItem={Number(second)}
            data={seconds}
            selectedItemTextColor={Constants.Colors.WHITE}
            onItemSelected={(value) => onValueChange(value, 'second')}
          />
        </View>
        <TouchableOpacity
          style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Ok'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={OTPStyles.button}
          onPress={onClose}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Cancel'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

TimePopup.propTypes = {
  hour: string.isRequired,
  minute: string.isRequired,
  onClose: func,
  onPress: func,
  onValueChange: func,
  second: string.isRequired,
  visible: bool,
};

TimePopup.defaultProps = {
  onClose: () => true,
  onPress: () => true,
  onValueChange: () => true,
  visible: false,
};

export default TimePopup;
