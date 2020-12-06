import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import times from 'lodash/times';
import { func, number, oneOfType, string } from 'prop-types';
import Constants from '../constants';
import { AuthStyle, PopupStyles, OTPStyles } from '../styles';
import AnimatedModal from './animate-modal';

const ages = times(87, (i) => `${i + 13}`);

const Picker = ({
  onClose, selectedValue, onConfirm,
}) => {
  const initialAge = selectedValue ? (selectedValue - 13) : 5;
  const [age, setAge] = React.useState(initialAge);

  return (
    <AnimatedModal visible>
      <View style={PopupStyles.container}>
        <View style={PopupStyles.wrapper}>
          <Text style={PopupStyles.header}>{'Select Your Age'}</Text>
          <View style={PopupStyles.divider} />
          <View style={PopupStyles.pickersContainer}>
            <WheelPicker
              style={[PopupStyles.picker, PopupStyles.agePicker]}
              itemStyle={PopupStyles.pickerItem}
              selectedItem={Number(age)}
              selectedItemTextColor={Constants.Colors.WHITE}
              data={ages}
              onItemSelected={(value) => setAge(value + 13)}
            />
          </View>
          <TouchableOpacity style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={() => onConfirm(age)} activeOpacity={0.7}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Ok'}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={OTPStyles.button} onPress={onClose}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Cancel'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedModal>
  );
};

Picker.propTypes = {
  onClose: func.isRequired,
  onConfirm: func.isRequired,
  selectedValue: oneOfType([number, string]).isRequired,
};

export default Picker;
