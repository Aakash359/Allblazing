import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, GenderStyles, UsernameStyle } from '../../styles';

const genders = [{
  label: 'Male',
  value: 'male',
}, {
  label: 'Female',
  value: 'female',
}, {
  label: 'Other',
  value: 'other',
}];

class UserGender extends Component {
  constructor() {
    super();
    this.state = { gender: null };
  }

  onChange = (gender) => {
    this.setState({ gender });
  }

  render() {
    const { gender } = this.state;
    const { navigation: { goBack } } = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={UsernameStyle.wrapper}>
          <View style={UsernameStyle.inputWrapper}>
            {genders.map((t) => (
              <TouchableOpacity
                key={t.value}
                style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
                activeOpacity={0.7}
                onPress={() => this.onChange(t.value)}
              >
                <Text style={AuthStyle.buttonText}>{'     '}</Text>
                <Text style={[AuthStyle.buttonLanguageText, gender === t.value ? AuthStyle.buttonActiveText : {}]}>{t.label}</Text>
                {gender === t.value ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, GenderStyles.saveBtn]} onPress={() => goBack()}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

UserGender.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default UserGender;
