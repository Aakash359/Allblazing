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
import { AuthStyle, CommonStyles, RegisterStyle } from '../../styles';
import Constants from '../../constants';

export default class ChangePassword extends Component {
  passwordRef = React.createRef();
  newPasswordRef = React.createRef();
  confirmPasswordRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      newPassword: '',
      password: '',
      visiblePasswords: [],
    };
  }

  onContinue = () => {
    const { navigation: { goBack } } = this.props;

    goBack();
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

  onPasswordVisibilityChange = (type) => {
    const { visiblePasswords } = this.state;
    const isExists = visiblePasswords.includes(type);

    let visibilities = [...visiblePasswords];

    if (isExists) {
      visibilities = visibilities.filter((visible) => visible !== type);
    } else {
      visibilities.push(type);
    }

    this.setState({ visiblePasswords: visibilities });
  };

  render() {
    const {
      confirmPassword, password, newPassword, visiblePasswords,
    } = this.state;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          scrollEnabled
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={RegisterStyle.wrapper}>
            <View style={RegisterStyle.passwordInput}>
              <TextInput
                maxLength={16}
                ref={this.passwordRef}
                style={RegisterStyle.password}
                returnKeyType="next"
                placeholder="Old Password"
                secureTextEntry={!visiblePasswords.includes('password')}
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(findNodeHandle(this.passwordRef.current));
                }}
                onBlur={() => {
                  this.resetScrollView(findNodeHandle(this.passwordRef.current));
                }}
                onSubmitEditing={() => this.newPasswordRef.current.focus()}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={() => this.onPasswordVisibilityChange('password')}>
                {visiblePasswords.includes('password')
                  ? (<Image source={Constants.Images.eyeon} resizeMode='contain' style={AuthStyle.checkImg} />)
                  : (<Image source={Constants.Images.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />)}
              </TouchableOpacity>
            </View>
            <View style={[RegisterStyle.passwordInput, AuthStyle.margin]}>
              <TextInput
                maxLength={16}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
                ref={this.newPasswordRef}
                style={RegisterStyle.password}
                returnKeyType="next"
                placeholder="New Password"
                secureTextEntry={!visiblePasswords.includes('newPassword')}
                value={newPassword}
                onChangeText={(text) => this.setState({ newPassword: text })}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(findNodeHandle(this.passwordRef.current));
                }}
                onBlur={() => {
                  this.resetScrollView(findNodeHandle(this.passwordRef.current));
                }}
                onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={() => this.onPasswordVisibilityChange('newPassword')}>
                {visiblePasswords.includes('newPassword')
                  ? (<Image source={Constants.Images.eyeon} resizeMode='contain' style={AuthStyle.checkImg} />)
                  : (<Image source={Constants.Images.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />)}
              </TouchableOpacity>
            </View>
            <View style={[RegisterStyle.passwordInput, AuthStyle.margin]}>
              <TextInput
                maxLength={16}
                ref={this.confirmPasswordRef}
                style={RegisterStyle.password}
                returnKeyType="done"
                placeholder="Confirm Password"
                secureTextEntry={!visiblePasswords.includes('confirmPassword')}
                value={confirmPassword}
                onChangeText={(text) => this.setState({ confirmPassword: text })}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(findNodeHandle(this.passwordRef.current));
                }}
                onBlur={() => {
                  this.resetScrollView(findNodeHandle(this.passwordRef.current));
                }}
                onSubmitEditing={this.onContinue}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={() => this.onPasswordVisibilityChange('confirmPassword')}>
                {visiblePasswords.includes('confirmPassword')
                  ? (<Image source={Constants.Images.eyeon} resizeMode='contain' style={AuthStyle.checkImg} />)
                  : (<Image source={Constants.Images.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />)}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={RegisterStyle.button} activeOpacity={0.7} onPress={this.onContinue}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ChangePassword.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};
