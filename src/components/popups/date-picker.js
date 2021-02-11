import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import times from 'lodash/times';
import { bool, func, number, oneOfType, string } from 'prop-types';
import { DatePicker, WheelPicker } from 'react-native-wheel-picker-android';
import { withTranslation } from 'react-i18next';
import AnimatedModal from '../animate-modal';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import Constants from '../../constants';

const hours = times(24, (i) => ((i) > 9 ? `${i}` : `0${i}`));
const minutes = times(60, (i) => (i > 9 ? `${i}` : `0${i}`));
const seconds = times(60, (i) => (i > 9 ? `${i}` : `0${i}`));

const DatePickerAI = ({
  date,
  onClose,
  onPress,
  onValueChange,
  visible,
  t: translate,
}) => (
  <AnimatedModal visible={visible}>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapper}>
        <Text style={PopupStyles.header}>{translate('What is your recent 1km time?')}</Text>
        <View style={PopupStyles.divider} />
        <View style={PopupStyles.pickersContainer}>
          <Text style={PopupStyles.hourLabel}>{translate('Date')}</Text>
          
        </View>
        <View style={PopupStyles.divider} />
        <View style={PopupStyles.pickersContainer}>
          <DatePicker
          date={date}
          onDateSelected={onValueChange}
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

DatePickerAI.propTypes = {
  
  onClose: func,
  onPress: func,
  onValueChange: func,
  date: string,
  t: func.isRequired,
  visible: bool,
};

DatePickerAI.defaultProps = {
  onClose: () => true,
  onPress: () => true,
  onValueChange: () => true,
  visible: false,
};

export default withTranslation()(DatePickerAI);
