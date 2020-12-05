import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { func, shape } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
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
    const { otp } = this.state;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={CommonStyles.headerWrapper}>
            <Text style={AuthStyle.selectText}>Verification Code</Text>
            <Text style={[AuthStyle.buttonText, OTPStyles.header]}>{'Please enter the code sent to'}</Text>
            <Text style={[AuthStyle.buttonText, OTPStyles.header]}>{'"xyz@gmail.com"'}</Text>
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
            <TouchableOpacity style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} activeOpacity={0.7} onPress={this.onVerify}>
              <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Verify'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={OTPStyles.button} onPress={() => {}}>
              <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Resend Link'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
