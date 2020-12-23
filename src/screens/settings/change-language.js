import React, { Component } from 'react';
import { Platform, ScrollView, Image, View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, ChangePassStyles, UsernameStyle } from '../../styles';

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
    const {
      navigation: { goBack },
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
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
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, ChangePassStyles.saveBtn]} onPress={() => goBack()}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Save')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ChangeLanguage.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(ChangeLanguage);
