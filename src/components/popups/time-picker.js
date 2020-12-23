import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import times from 'lodash/times';
import { bool, func, number, oneOfType, string } from 'prop-types';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { withTranslation } from 'react-i18next';
import AnimatedModal from '../animate-modal';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import Constants from '../../constants';

const hours = times(24, (i) => ((i) > 9 ? `${i}` : `0${i}`));
const minutes = times(60, (i) => (i > 9 ? `${i}` : `0${i}`));
const seconds = times(60, (i) => (i > 9 ? `${i}` : `0${i}`));

const TimePicker = ({
  hour,
  minute,
  onClose,
  onPress,
  onValueChange,
  second,
  visible,
  t: translate,
}) => (
  <AnimatedModal visible={visible}>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapper}>
        <Text style={PopupStyles.header}>{translate('What is your recent 1km time?')}</Text>
        <View style={PopupStyles.divider} />
        <View style={PopupStyles.pickersContainer}>
          <Text style={PopupStyles.hourLabel}>{translate('HR')}</Text>
          <Text style={PopupStyles.minuteLabel}>{translate('MIN')}</Text>
          <Text style={PopupStyles.secondLabel}>{translate('SEC')}</Text>
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
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Ok')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={OTPStyles.button} onPress={onClose} activeOpacity={0.7}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Cancel')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

TimePicker.propTypes = {
  hour: oneOfType([string.isRequired, number.isRequired]).isRequired,
  minute: oneOfType([string.isRequired, number.isRequired]).isRequired,
  onClose: func,
  onPress: func,
  onValueChange: func,
  second: oneOfType([string.isRequired, number.isRequired]).isRequired,
  t: func.isRequired,
  visible: bool,
};

TimePicker.defaultProps = {
  onClose: () => true,
  onPress: () => true,
  onValueChange: () => true,
  visible: false,
};

export default withTranslation()(TimePicker);
