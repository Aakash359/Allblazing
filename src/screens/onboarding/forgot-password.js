import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, ForgotPassStyles } from '../../styles';
import { InputField, ForgotPasswordModal } from '../../components';

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
    const { navigation: { navigate } } = this.props;

    return (
      <View style={CommonStyles.container}>
        <TouchableOpacity onPress={() => navigate('Login')}>
          <Image
            source={Constants.Images.close}
            resizeMode='contain'
            style={CommonStyles.crossImage}
          />
        </TouchableOpacity>
        <View style={ForgotPassStyles.wrapper}>
          <Text style={AuthStyle.selectText}>Forgot Password</Text>
          <Text style={[AuthStyle.buttonText, ForgotPassStyles.buttonText]}>
            {'Please enter your registered email address to reset your password '}
          </Text>
          <InputField value={email} placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
        </View>
        <View style={ForgotPassStyles.buttonsWrapper}>
          <TouchableOpacity
            style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
            activeOpacity={0.7}
            onPress={() => this.onContinue()}
          >
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Submit'}</Text>
          </TouchableOpacity>
        </View>
        <ForgotPasswordModal
          visible={visible}
          onClick={() => this.setState({ visible: false }, () => navigate('OTP'))}
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
};

export default ForgotPassword;
