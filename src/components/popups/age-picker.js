import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';
import times from 'lodash/times';
import { func, number, oneOfType, string } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const ages = times(87, (i) => `${i + 13}`);

const AgePicker = ({
  onClose, onConfirm, selectedValue, t: translate,
}) => {
  const initialAge = selectedValue ? (selectedValue - 13) : 5;
  const [age, setAge] = React.useState(initialAge);

  const onItemSelection = (value) => {
    setAge(value + 13);
  };

  return (
    <AnimatedModal visible>
      <View style={PopupStyles.container}>
        <View style={PopupStyles.wrapper}>
          <Text style={PopupStyles.header}>{translate('Select Your Age')}</Text>
          <View style={PopupStyles.divider} />
          <View style={PopupStyles.pickersContainer}>
            <WheelPicker
              initPosition={0}
              itemTextSize={16}
              selectedItemTextSize={16}
              itemTextFontFamily="SFProRounded-Regular"
              selectedItemTextFontFamily="SFProRounded-Regular"
              style={[PopupStyles.picker, PopupStyles.agePicker]}
              itemStyle={PopupStyles.pickerItem}
              selectedItemTextColor={Constants.Colors.WHITE}
              data={ages}
              onItemSelected={onItemSelection}
              indicatorColor={Constants.Colors.PRIVCYTEXT}
            />
          </View>
          <TouchableOpacity style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={() => onConfirm(age)} activeOpacity={0.7}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Ok')}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={OTPStyles.button} onPress={onClose}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedModal>
  );
};

AgePicker.propTypes = {
  onClose: func.isRequired,
  onConfirm: func.isRequired,
  selectedValue: oneOfType([number, string]),
  t: func.isRequired,
};

AgePicker.defaultProps = { selectedValue: null };

export default withTranslation()(React.memo(AgePicker));
