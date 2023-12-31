import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {func, shape, string} from 'prop-types';
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import Constants from '../../constants';
import {
  AuthStyle,
  CommonStyles,
  LanguageStyles,
  WelcomeStyles,
} from '../../styles';
import * as actions from '../../actions/app-action-types';
import {getAuthToken} from '../../helpers/auth';
import {setTopLevelNavigator} from '../../routes/navigation-service';
class Language extends Component {

componentDidMount() {
    console.log("my navgation " ,this.props.navigation)
    setTopLevelNavigator(this.props.navigation)
  }

  onSelectLang = (code) => {
    const {setLanguage} = this.props;

    setLanguage(code);

    i18next.changeLanguage(code);
  };

  onContinue = () => {
    const {
      navigation: {navigate},
    } = this.props;
    const {locale} = this.props;

    if (locale) {
      navigate('Intro');
    }
  };

  render() {
    const {locale, t: translate} = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={CommonStyles.centerItems}>
          <Text style={[AuthStyle.selectText, WelcomeStyles.headerText]}>
            {translate('welcome.WelcomeTo')}
          </Text>
          <Image
            source={Constants.Images.slectLangLogo2x}
            resizeMode="contain"
            style={CommonStyles.logo}
          />
          <Text style={[AuthStyle.selectText, AuthStyle.langHeaderText]}>
            {translate('language.Select Your Language')}
          </Text>
          <TouchableOpacity
            style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
            activeOpacity={0.7}
            onPress={() => this.onSelectLang('en')}>
            <Text style={AuthStyle.buttonText}>{'     '}</Text>
            <Text
              style={[
                AuthStyle.buttonLanguageText,
                locale === 'en' ? AuthStyle.buttonActiveText : {},
              ]}>
              {'English'}
            </Text>
            {locale === 'en' ? (
              <Image
                source={Constants.Images.check}
                resizeMode="contain"
                style={AuthStyle.checkImg}
              />
            ) : (
              <Text style={AuthStyle.checkImg}>{}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
            activeOpacity={0.7}
            onPress={() => this.onSelectLang('du')}>
            <Text style={AuthStyle.buttonText}>{'     '}</Text>
            <Text
              style={[
                AuthStyle.buttonLanguageText,
                locale === 'du' ? AuthStyle.buttonActiveText : {},
              ]}>
              {'Dutch'}
            </Text>
            {locale === 'du' ? (
              <Image
                source={Constants.Images.check}
                resizeMode="contain"
                style={AuthStyle.checkImg}
              />
            ) : (
              <Text style={AuthStyle.checkImg}>{}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={LanguageStyles.button}>
          <TouchableOpacity
            style={[
              AuthStyle.loginTouchable,
              {
                backgroundColor:
                  locale === null
                    ? Constants.Colors.SECONDARY_COLOR
                    : Constants.Colors.TEXT_COLOR2,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => this.onContinue()}>
            <Text
              style={[
                AuthStyle.buttonText,
                {
                  color:
                    locale === null
                      ? Constants.Colors.TEXT_COLOR2
                      : Constants.Colors.TEXT_COLOR_WHITE,
                },
              ]}>
              {translate('language.Select & Continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Language.propTypes = {
  locale: string,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  setLanguage: func.isRequired,
  t: func.isRequired,
};

Language.defaultProps = {locale: null};

const LanguageWithTranslation = withTranslation()(Language);

const mapStateToProps = (store) => ({locale: store.app.locale});

export default connect(mapStateToProps, {setLanguage: actions.setLanguage})(
  LanguageWithTranslation,
);
