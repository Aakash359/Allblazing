import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Text, Platform, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {func, shape} from 'prop-types';
import * as actions from '../../actions/user-action-types';
import Constants from '../../constants';
import {AuthStyle, CommonStyles, OTPStyles} from '../../styles';
import axios from 'axios';
import API from '../../constants/baseApi';
import { setOtpToken, getUserId, getForgotPasswordUserId, setForgotOtpToken } from '../../helpers/auth';

class ForgotOTP extends Component {
  constructor() {
    super();
    this.state = {otp: ''};
  }

  onVerify = () => {
    const {
      navigation: {navigate},
    } = this.props;

    navigate('ResetPassword');
  };

  // verify OTP
  _handleVerify = async() => {
    const {
      navigation: {navigate},
    } = this.props;

    const {otp} = this.state;
    if (otp.length < 1) {
      Alert.alert(
        '',
        'Please fill otp!',
        
      );
      return;
    }
     const UserId = await getForgotPasswordUserId();
    console.log('UserId===>',UserId);

    axios
      .post(API.VERIFY_OTP, {
        user_id: UserId,
        otp: otp,
      })
      .then((response) => {
        console.log(response?.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 422) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('ResetPassword'),
              },
            ],
            {Cancelable:false}
          );
          setForgotOtpToken(response?.data?.data?.data?.token);
          console.log('token==>',response?.data?.data?.data?.token);
          // navigate('ResetPassword');
        }
      });
  };

  // Resend OTP
  _handleResendOTP = () => {
    axios
      .post(API.RESEND_OTP, {
        user_id: 1,
      })
      .then((response) => {
        if (response?.data?.code === 422) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancel', onPress: () => console.log('Cancel Pressed')
              },
              {
                text: 'OK', onPress: () => console.log('OK Pressed')
              },
            ],
            {Cancelable: true},
          );
        }
      });
  };

  render() {
    const {otp} = this.state;
    const {
      route: {params},
    } = this.props;
    const email = this.props.route.params.email;

    return (
      <View style={CommonStyles.container}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={CommonStyles.headerWrapper}>
            <Text style={AuthStyle.selectText}>Verification Code</Text>
            <Text style={[AuthStyle.buttonText, OTPStyles.header]}>
              {'Please enter the code sent to'}
            </Text>
            <Text style={[AuthStyle.buttonText, OTPStyles.header]}>
              {email}
            </Text>
          </View>
          <OTPInputView
            style={OTPStyles.inputView}
            pinCount={4}
            keyboardType="number-pad"
            onCodeChanged={(code) => {
              this.setState({otp: code});
            }}
            autoFocusOnLoad={false}
            codeInputFieldStyle={OTPStyles.input}
            code={otp}
            codeInputHighlightStyle={OTPStyles.inputHighlight}
            onCodeFilled={(code) => {
              this.setState({otp: code});
            }}
          />
        </KeyboardAwareScrollView>
        <View style={OTPStyles.buttonsWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              AuthStyle.loginTouchable,
              {backgroundColor: Constants.Colors.TEXT_COLOR2},
            ]}
            // onPress={this.onVerify}
            onPress={this._handleVerify}
          >
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {'Verify'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={OTPStyles.button}
            onPress={this._handleResendOTP}>
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {'Resend Link'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ForgotOTP.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default connect(null, {loginSuccess: actions.loginSuccess})(ForgotOTP);
