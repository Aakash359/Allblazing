import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, ForgotPassStyles } from '../../styles';
import { InputField, SuccessPopup } from '../../components';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      visible: false,
    };
  }

  onContinue = () => {
    this.setState({ visible: true });
  }

  render() {
    const {
      email, visible,
    } = this.state;
    const {
      navigation: { navigate }, t,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={ForgotPassStyles.wrapper}>
          <Text style={AuthStyle.selectText}>{t('Forgot Password')}</Text>
          <Text style={[AuthStyle.buttonText, ForgotPassStyles.buttonText]}>
            {t('Forgot Password Instructions')}
          </Text>
          <InputField value={email} placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
        </View>
        <View style={ForgotPassStyles.buttonsWrapper}>
          <TouchableOpacity
            style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
            activeOpacity={0.7}
            onPress={() => this.onContinue()}
          >
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{t('Submit')}</Text>
          </TouchableOpacity>
        </View>
        <SuccessPopup
          hasResendBtn
          instructions={`${t('Forgot Password Success')} "xyz@gmail.com"`}
          visible={visible}
          onClick={() => this.setState({ visible: false }, () => navigate('OTP'))}
          onResend={() => this.setState({ visible: false })}
        />
      </View>
    );
  }
}

ForgotPassword.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(ForgotPassword);
