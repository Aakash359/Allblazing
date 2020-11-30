import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { func, shape } from 'prop-types';
import * as actions from '../../actions/user-action-types';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, OTPStyles } from '../../styles';

class OTP extends Component {
  constructor() {
    super();
    this.state = { otp: '' };
  }

  onVerify = () => {
    const {
      loginSuccess, navigation: { navigate },
    } = this.props;

    loginSuccess();
    setTimeout(() => navigate('Username'), 500);
  }

  render() {
    const { navigation: { navigate } } = this.props;
    const { otp } = this.state;

    return (
      <View style={CommonStyles.container}>
        <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
          <Image
            source={Constants.Images.close}
            resizeMode='contain'
            style={CommonStyles.crossImage}
          />
        </TouchableOpacity>
        <View style={CommonStyles.headerWrapper}>

          <Text style={AuthStyle.selectText}>Verification Code</Text>
          <Text style={[AuthStyle.buttonText, OTPStyles.header]}>{'Please enter the code sent to "xyz@gmail.com" '}</Text>
        </View>
        <OTPInputView
          style={OTPStyles.inputView}
          pinCount={4}
          keyboardType="phone-pad"
          onCodeChanged={(code) => { this.setState({ otp: code }); }}
          autoFocusOnLoad
          codeInputFieldStyle={OTPStyles.input}
          code={otp}
          codeInputHighlightStyle={OTPStyles.inputHighlight}
          onCodeFilled={(code) => {
            this.setState({ otp: code });
          }}
        />
        <View style={OTPStyles.buttonsWrapper}>
          <TouchableOpacity
            style={OTPStyles.button}
            onPress={() => this.onContinue()}
          >
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Resend Link'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
            activeOpacity={0.7}
            onPress={this.onVerify}
          >
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Verify'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

OTP.propTypes = {
  loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default connect(null, { loginSuccess: actions.loginSuccess })(OTP);
