import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, LanguageStyles, UsernameStyle } from '../../styles';

const languages = [{
  label: 'English',
  value: 'english',
}, {
  label: 'Dutch',
  value: 'dutch',
}];

class ChangeLanguage extends Component {
  constructor() {
    super();
    this.state = { language: 'english' };
  }

  onChange = (language) => {
    this.setState({ language });
  }

  render() {
    const { language } = this.state;
    const { navigation: { goBack } } = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={UsernameStyle.wrapper}>
          <View style={UsernameStyle.inputWrapper}>
            {languages.map((t) => (
              <TouchableOpacity
                key={t.value}
                style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
                activeOpacity={0.7}
                onPress={() => this.onChange(t.value)}
              >
                <Text style={AuthStyle.buttonText}>{'     '}</Text>
                <Text style={[AuthStyle.buttonLanguageText, language === t.value ? AuthStyle.buttonActiveText : {}]}>{t.label}</Text>
                {language === t.value ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, LanguageStyles.saveBtn]} onPress={() => goBack()}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ChangeLanguage.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default ChangeLanguage;
