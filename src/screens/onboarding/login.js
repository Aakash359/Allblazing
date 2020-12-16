import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, TextInput, ScrollView, Platform } from 'react-native';
import { func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { InputField } from '../../components';
import { AuthStyle, CommonStyles, LoginStyles } from '../../styles';
import Constants from '../../constants';
import * as actions from '../../actions/user-action-types';

const socialIcons = [{
  icon: Constants.Images.email,
  name: 'google',
}, {
  icon: Constants.Images.fb,
  name: 'facebook',
}, {
  icon: Constants.Images.insta,
  name: 'insta',
}, {
  icon: Constants.Images.twitter,
  name: 'twitter',
}, {
  icon: Constants.Images.tiktok,
  name: 'tiktok',
}];

class Login extends Component {
  timer = null;

  constructor() {
    super();
    this.state = {
      email: '',
      isRemember: false,
      isShow: false,
      password: '',
    };
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onLogin = () => {
    const { loginSuccess } = this.props;

    loginSuccess();
  }

  render() {
    const {
      email, password, isShow, isRemember,
    } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <View style={CommonStyles.container}>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={LoginStyles.wrapper}>
            <Image source={Constants.Images.slectLangLogo2x} resizeMode='contain' style={LoginStyles.logo} />
            <View>
              <InputField value={email} placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
              <View style={LoginStyles.passwordInput}>
                <TextInput
                  style={LoginStyles.password}
                  placeholder="Password"
                  secureTextEntry={!isShow}
                  value={password}
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                />
                {isShow ? (
                  <TouchableOpacity onPress={() => this.setState({ isShow: !isShow })}>
                    <Image source={Constants.Images.eyeon} resizeMode='contain' style={AuthStyle.checkImg} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => this.setState({ isShow: !isShow })}>
                    <Image source={Constants.Images.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />
                  </TouchableOpacity>
                ) }
              </View>
              <View style={LoginStyles.remember}>
                <View style={LoginStyles.row}>
                  {isRemember ? (
                    <TouchableOpacity onPress={() => this.setState({ isRemember: !isRemember })} style={{ }}>
                      <Image
                        source={Constants.Images.checkbox}
                        resizeMode='contain'
                        style={LoginStyles.rememberIcon}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => this.setState({ isRemember: !isRemember })}>
                      <Image
                        source={Constants.Images.checkoff}
                        resizeMode='contain'
                        style={LoginStyles.rememberIcon}
                      />
                    </TouchableOpacity>
                  )}
                  <Text style={LoginStyles.rememberText}>{'Remember me'}</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                  <Text style={[AuthStyle.buttonText, LoginStyles.forgotPasswordText]}>
                    {'Forgot password?'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[AuthStyle.loginTouchable, LoginStyles.loginBtn]}
                activeOpacity={0.7}
                onPress={this.onLogin}
              >
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Login'}</Text>
              </TouchableOpacity>
              <View style={LoginStyles.orContainer}>
                <Image source={Constants.Images.line} resizeMode='contain' style={{ width: Constants.BaseStyle.scale(80) }} />
                <Text style={LoginStyles.loginText}>{'or login using'}</Text>
                <Image source={Constants.Images.line} resizeMode='contain' style={{ width: Constants.BaseStyle.scale(80) }} />
              </View>
              <View style={LoginStyles.socialIconsWrapper}>
                {socialIcons.map((social) => (
                  <TouchableOpacity key={social.name}>
                    <Image source={social.icon} resizeMode='contain' style={LoginStyles.socialIcon} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={LoginStyles.accountWrapper}>
          <Text style={LoginStyles.account}>{'Don\'t have account?'}</Text>
          <TouchableOpacity onPress={() => navigate('Register')}>
            <Text style={LoginStyles.createAccount}>{'Create account'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Login.propTypes = {
  loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default connect(null, { loginSuccess: actions.loginSuccess })(Login);
