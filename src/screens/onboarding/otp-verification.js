import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity, Text, Platform, Alert,ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {func, shape} from 'prop-types';
import * as actions from '../../actions/user-action-types';
import Constants from '../../constants';
import {AuthStyle, CommonStyles, OTPStyles} from '../../styles';
import axios from 'axios';
import API from '../../constants/baseApi';
import {setOtpToken, getUserId} from '../../helpers/auth';

class OTP extends Component {
  constructor() {
    super();
    this.state = {otp: '', isLoading: false, Loading: false};
  }

  onVerify = () => {
    const {
      navigation: {navigate},
    } = this.props;

    navigate('Username');
  };

  // verify OTP
  _handleVerify = async () => {
    const {
      navigation: {navigate},
    } = this.props;

    const {otp} = this.state;
    if (otp.length < 4) {
      Alert.alert(
        '',
        'Please fill otp!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('ok Pressed'),
          },
        ],
        {Cancelable: false},
      );
      return;
    }
    const UserId = await getUserId();
    console.log('UserId===>', UserId);
    this.setState({
      isLoading: true,
    });
    axios
      .post(API.VERIFY_OTP, {
        user_id: UserId,
        otp: otp,
      })
      .then((response) => {
        if (response?.data?.code === 401) {
          Alert.alert('', response?.data?.message ?? '');
        }
        if (response?.data?.code === 422) {
          Alert.alert('', response?.data?.message ?? '');
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
              },
              {
                text: 'OK',
                onPress: () => navigate('Username'),
              },
            ],
            {Cancelable: false},
          );
          setOtpToken(response?.data?.data?.data?.token);
          console.log('otptoken=======>', response?.data?.data?.data?.token);
          // navigate('Username');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  // Resend OTP
  _handleResendOTP = () => {
    this.setState({
      Loading: true,
    });
    axios
      .post(API.RESEND_OTP, {
        user_id: 1,
      })
      .then((response) => {
        if (response?.data?.code === 422) {
          Alert.alert('', response?.data?.message ?? '');
        }
        if (response?.data?.code === 200) {
          Alert.alert('', response?.data?.message ?? '');
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
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
            onPress={this._handleVerify}>
            {this.state.isLoading ? (
              <ActivityIndicator color="white" size={25} />
            ) : (
              <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {'Verify'}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={OTPStyles.button}
            onPress={this._handleResendOTP}>
            {this.state.Loading ? (
              <ActivityIndicator color="white" size={25} />
            ) : (
              <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {'Resend Link'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

OTP.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default connect(null, {loginSuccess: actions.loginSuccess})(OTP);
