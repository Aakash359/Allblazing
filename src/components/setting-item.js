import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { withTranslation } from 'react-i18next';
import Constants from '../constants';
import { SettingStyles } from '../styles';

export const SettingItem = ({
  hasArrow, label, onPress, t: translate,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={SettingStyles.container}>
      <Text style={SettingStyles.title}>{translate(label)}</Text>
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
  t: func.isRequired,
};

SettingItem.defaultProps = { hasArrow: true };

export default withTranslation()(SettingItem);
