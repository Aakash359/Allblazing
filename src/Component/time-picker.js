import React from 'react';
import { Text, View, Pressable } from 'react-native';
import times from 'lodash/times';
import { bool, func, string } from 'prop-types';
import { WheelPicker } from 'react-native-wheel-picker-android';
import { useTranslation } from 'react-i18next';
import AnimatedModal from './animate-modal';
import { PopupStyles } from '../styles';

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
}) => {
  const { t: translate } = useTranslation();

  return (
    <AnimatedModal visible={visible}>
      <View style={PopupStyles.container}>
        <View style={PopupStyles.wrapper}>
          <View style={PopupStyles.pickersContainer}>
            <Text style={PopupStyles.timeStartLabel}>{'HH'}</Text>
            <Text style={PopupStyles.timeStartLabel}>{'MM'}</Text>
            <Text style={PopupStyles.timeStartLabel}>{'SS'}</Text>
          </View>
          <View style={PopupStyles.pickersContainer}>
            <WheelPicker
              style={PopupStyles.picker}
              itemStyle={PopupStyles.pickerItem}
              selectedItem={Number(hour)}
              data={hours}
              onItemSelected={(value) => onValueChange(value, 'hour')}
            />
            <WheelPicker
              style={PopupStyles.picker}
              itemStyle={PopupStyles.pickerItem}
              selectedItem={Number(minute)}
              data={minutes}
              onItemSelected={(value) => onValueChange(value, 'minutes')}
            />
            <WheelPicker
              style={PopupStyles.picker}
              itemStyle={PopupStyles.pickerItem}
              selectedItem={Number(second)}
              data={seconds}
              onItemSelected={(value) => onValueChange(value, 'seconds')}
            />
          </View>
          <Pressable transparent style={PopupStyles.closeButton} onPress={onPress}>{translate('ok')}</Pressable>
          <Pressable transparent style={PopupStyles.closeButton} onPress={onClose}>{translate('cancel')}</Pressable>
        </View>
      </View>
    </AnimatedModal>
  );
};

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
