import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {
  AuthStyle,
  CommonStyles,
  IntroductionStyles,
  WelcomeStyles,
} from '../../styles';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      navigation: {goBack, navigate},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={WelcomeStyles.wrapper}>
          <View style={WelcomeStyles.headerWrapper}>
            <Text style={[AuthStyle.selectText, WelcomeStyles.headerText]}>
              {translate('welcome.Welcome')}
            </Text>
            <Text style={[AuthStyle.selectText, WelcomeStyles.subHeaderText]}>
              to ALLBLAZING
            </Text>
          </View>
          <View style={AuthStyle.welcomeView}>
            <Text style={[AuthStyle.buttonText, WelcomeStyles.description]}>
              {translate('welcome.Connect with other runners in your area')}
            </Text>
          </View>
          <Image
            source={Constants.Images.path1}
            resizeMode="contain"
            style={WelcomeStyles.leftImage}
          />
          <View style={AuthStyle.welcomeView}>
            <Text style={[AuthStyle.buttonText, WelcomeStyles.description]}>
              {translate('welcome.Train or race together')}
            </Text>
          </View>
          <Image
            source={Constants.Images.path2}
            resizeMode="contain"
            style={WelcomeStyles.rightImage}
          />
          <View style={AuthStyle.welcomeView}>
            <Text style={[AuthStyle.buttonText, WelcomeStyles.description]}>
              {translate('welcome.Capture and share the experience')}
            </Text>
          </View>
        </View>
        <View
          style={[IntroductionStyles.buttonsWrapper, WelcomeStyles.buttons]}>
          <TouchableOpacity
            style={[
              AuthStyle.introButton,
              {backgroundColor: Constants.Colors.TRANSPARENT},
            ]}
            activeOpacity={0.7}
            onPress={() => goBack()}>
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('Back')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              AuthStyle.introButton,
              {backgroundColor: Constants.Colors.TEXT_COLOR2},
            ]}
            onPress={() => navigate('Intro')}>
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('Get Started')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Welcome.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(Welcome);
