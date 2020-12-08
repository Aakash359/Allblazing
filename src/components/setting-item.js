import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import Constants from '../constants';
import { SettingStyles } from '../styles';

export const SettingItem = ({
  hasArrow, label, onPress,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={SettingStyles.container}>
      <Text style={SettingStyles.title}>{label}</Text>
      {hasArrow ? (
        <Image
          source={Constants.Images.arrowRight}
          resizeMode='contain'
          style={SettingStyles.arrow}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setIsEnabled(!isEnabled)}>
          <Image source={isEnabled ? Constants.Images.toggleOn : Constants.Images.toggleOff} style={SettingStyles.switch} />
        </TouchableOpacity>
      ) }
    </TouchableOpacity>
  );
};

SettingItem.propTypes = {
  hasArrow: bool,
  label: string.isRequired,
  onPress: func.isRequired,
};

SettingItem.defaultProps = { hasArrow: true };

export default SettingItem;
