import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { func, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { AuthStyle, CommonStyles } from '../../styles';

class Language extends Component {
  constructor() {
    super();
    this.state = { languageCode: '' };
  }

    onSelectLang = (code) => {
      this.setState({ languageCode: code });
    }

    onContinue = () => {
      const { navigation: { navigate } } = this.props;

      navigate('Welcome');
    }

    render() {
      const { languageCode } = this.state;
      const { t: translate } = this.props;

      return (
        <View style={CommonStyles.container}>
          <View style={CommonStyles.centerItems}>
            <Image
              source={Constants.Images.slectLangLogo2x}
              resizeMode='contain'
              style={CommonStyles.logo}
            />
            <Text style={AuthStyle.selectText}>{translate('Select Your Language')}</Text>
            <TouchableOpacity
              style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
              activeOpacity={0.7}
              onPress={() => this.onSelectLang('en')}
            >
              <Text style={AuthStyle.buttonText}>{'     '}</Text>
              <Text style={[AuthStyle.buttonLanguageText, languageCode === 'en' ? AuthStyle.buttonActiveText : {}]}>{'English'}</Text>
              {languageCode === 'en' ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
              activeOpacity={0.7}
              onPress={() => this.onSelectLang('du')}
            >
              <Text style={AuthStyle.buttonText}>{'     '}</Text>
              <Text style={[AuthStyle.buttonLanguageText, languageCode === 'du' ? AuthStyle.buttonActiveText : {}]}>{'Dutch'}</Text>
              {languageCode === 'du' ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
            </TouchableOpacity>

          </View>
          <TouchableOpacity
            style={[AuthStyle.loginTouchable, { backgroundColor: languageCode === '' ? Constants.Colors.SECONDARY_COLOR : Constants.Colors.TEXT_COLOR2 }]}
            activeOpacity={0.7}
            onPress={() => this.onContinue()}
          >
            <Text style={[AuthStyle.buttonText, { color: languageCode === '' ? Constants.Colors.TEXT_COLOR2 : Constants.Colors.TEXT_COLOR_WHITE }]}>{translate('Select & Continue')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

Language.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(Language);
