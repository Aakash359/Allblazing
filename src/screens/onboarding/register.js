import React, { Component } from 'react';
import { View,
  findNodeHandle,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  ScrollView,
  TextInput } from 'react-native';
import { func, shape } from 'prop-types';
import { InputField } from '../../components';
import { AuthStyle, CommonStyles, RegisterStyle } from '../../styles';
import Constants from '../../constants';

export default class Register extends Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isPasswordVisible: false,
      password: '',
    };
  }

  onContinue = () => {
    const { navigation: { navigate } } = this.props;

    navigate('OTP');
  };

  handleScrollView = (ref) => {
    const scrollResponder = this.scrollViewRef.current.getScrollResponder();

    setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ref,
        (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 20,
        true,
      );
    }, 300);
  };

  resetScrollView = (ref) => {
    const scrollResponder = this.scrollViewRef.current.getScrollResponder();

    setTimeout(() => {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(ref, 0, true);
    }, 300);
  };

  onStaticRoutes = (route, title) => () => {
    const { navigation: { navigate } } = this.props;

    navigate(route, { title });
  };

  render() {
    const {
      email, password, isPasswordVisible,
    } = this.state;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={RegisterStyle.wrapper}>
            <View style={CommonStyles.headerWrapper}>
              <Text style={{
                ...AuthStyle.selectText,
                fontSize: Constants.BaseStyle.scale(30),
              }}
              >
                Sign Up
              </Text>
            </View>
            <View>
              <InputField
                value={email}
                returnKeyType="next"
                placeholder="Email"
                ref={this.emailRef}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({ email: text })}
                onFocus={() => this.handleScrollView(findNodeHandle(this.emailRef.current))}
                onBlur={() => this.resetScrollView(findNodeHandle(this.emailRef.current))}
                onSubmitEditing={() => this.passwordRef.current.focus()}
              />
              <View style={RegisterStyle.passwordInput}>
                <TextInput
                  ref={this.passwordRef}
                  style={RegisterStyle.password}
                  returnKeyType="done"
                  placeholder="Password"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(text) => this.setState({ password: text })}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  onFocus={() => {
                    this.handleScrollView(findNodeHandle(this.passwordRef.current));
                  }}
                  onBlur={() => {
                    this.resetScrollView(findNodeHandle(this.passwordRef.current));
                  }}
                  onSubmitEditing={this.onContinue}
                />
                <TouchableOpacity onPress={() => this.setState({ isPasswordVisible: !isPasswordVisible })}>
                  {isPasswordVisible
                    ? (<Image source={Constants.Images.eyeon} resizeMode='contain' style={AuthStyle.checkImg} />)
                    : (<Image source={Constants.Images.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />)}
                </TouchableOpacity>
              </View>
            </View>
            <View style={RegisterStyle.textLinkView}>
              <Text style={RegisterStyle.textSmallStyle}>{'By signing up, you agree to our'}</Text>
              <TouchableOpacity activeOpacity={1} onPress={this.onStaticRoutes('StaticContent', 'Privacy Policy')}>
                <Text style={RegisterStyle.textSmallLinkStyle}>{' Privacy Policy '}</Text>
              </TouchableOpacity>
              <Text style={RegisterStyle.textSmallStyle}>and</Text>
              <TouchableOpacity activeOpacity={1} onPress={this.onStaticRoutes('StaticContent', 'Terms & Conditions')}>
                <Text style={RegisterStyle.textSmallLinkStyle}>{' Terms & Conditions.'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={RegisterStyle.button} activeOpacity={0.7} onPress={this.onContinue}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Register.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};
