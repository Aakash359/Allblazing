import React from 'react';
import { View, ViewPropTypes, TextInput } from 'react-native';
import { string, func } from 'prop-types';
import Constants from '../constants';
import { InputStyles } from '../styles';

const InputField = React.forwardRef((props, ref) => {
  const {
    style, onChangeText, value, ...inputProps
  } = props;

  return (
    <View style={InputStyles.container}>
      <TextInput
        ref={ref}
        placeholderTextColor={Constants.Colors.TEXT_COLOR}
        style={[InputStyles.input, style]}
        value={value}
        onChangeText={onChangeText}
        {...inputProps}
        underlineColorAndroid={Constants.Colors.TRANSPARENT}
      />
    </View>
  );
});

InputField.propTypes = {
  onChangeText: func.isRequired,
  style: ViewPropTypes.style,
  value: string.isRequired,
};

InputField.defaultProps = { style: {} };

export default InputField;
