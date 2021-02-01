import React, {Component} from 'react';
import {
  View,
  findNodeHandle,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  Alert ,
  ScrollView,
  TextInput,
} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import {connect,useSelector} from 'react-redux';
import {AuthStyle, CommonStyles, RegisterStyle} from '../../styles';
import Constants from '../../constants';
import axios from 'axios';
import { authHeader, getForgotOtpToken, getOtpToken } from '../../helpers/auth';
import API from '../../constants/baseApi';
import {setLoginDetails} from '../../reducers/baseServices/auth';


class ChangePassword extends Component {
  newPasswordRef = React.createRef();
  confirmPasswordRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      newPassword: '',
      visiblePasswords: [],
    };
  }

  onContinue = () => {
    const {
      navigation: {goBack},
    } = this.props;

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
    const {visiblePasswords} = this.state;
    const isExists = visiblePasswords.includes(type);

    let visibilities = [...visiblePasswords];

    if (isExists) {
      visibilities = visibilities.filter((visible) => visible !== type);
    } else {
      visibilities.push(type);
    }

    this.setState({visiblePasswords: visibilities});
  };
  
  onSave = async() => {
    const {
      navigation:{navigate},
  } = this.props;

    const {newPassword,confirmPassword} = this.state;
    if (newPassword.length < 1) {
      Alert.alert(
        '',
        'Please fill the newPassword!',
        
      );
      return;
    }else if(confirmPassword.length < 1){
      Alert.alert(
          '',
          'Please fill the Confirmpassword!',
          
      );
      return;
    }
    this.setState({
      isLoading: true,
    });
    // markwinz06@gmail.com/mark@1234
    const token = await getForgotOtpToken();
    console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
  // console.log(config);

    axios
      .post(API.RESET_PASSWORD, {
        password: newPassword,
        confirm_password:confirmPassword,
      },config)
      .then((response) => {
        console.log('token ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );

          navigate('Login');

        }
        
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };


  render() {
    const {
      confirmPassword,
      password,
      newPassword,
      visiblePasswords,
    } = this.state;
    const {t: translate} = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          scrollEnabled
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={RegisterStyle.wrapper}>
            <Text style={[RegisterStyle.Reset]}>Reset Password</Text>
            <View style={[RegisterStyle.passwordInput, AuthStyle.margin]}>
              <TextInput
                maxLength={16}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
                ref={this.newPasswordRef}
                style={RegisterStyle.password}
                returnKeyType="next"
                placeholder={translate('password.NewPassword')}
                secureTextEntry={!visiblePasswords.includes('newPassword')}
                value={newPassword}
                onChangeText={(text) => this.setState({newPassword: text})}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(
                    findNodeHandle(this.newPasswordRef.current),
                  );
                }}
                onBlur={() => {
                  this.resetScrollView(
                    findNodeHandle(this.newPasswordRef.current),
                  );
                }}
                onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.onPasswordVisibilityChange('newPassword')}>
                {visiblePasswords.includes('newPassword') ? (
                  <Image
                    source={Constants.Images.eyeon}
                    resizeMode="contain"
                    style={AuthStyle.checkImg}
                  />
                ) : (
                  <Image
                    source={Constants.Images.eyeoff}
                    resizeMode="contain"
                    style={AuthStyle.checkImg}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={[RegisterStyle.passwordInput, AuthStyle.margin]}>
              <TextInput
                maxLength={16}
                ref={this.confirmPasswordRef}
                style={RegisterStyle.password}
                returnKeyType="done"
                placeholder={translate('password.ConfirmPassword')}
                secureTextEntry={!visiblePasswords.includes('confirmPassword')}
                value={confirmPassword}
                onChangeText={(text) => this.setState({confirmPassword: text})}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(
                    findNodeHandle(this.newPasswordRef.current),
                  );
                }}
                onBlur={() => {
                  this.resetScrollView(
                    findNodeHandle(this.newPasswordRef.current),
                  );
                }}
                onSubmitEditing={this.onContinue}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  this.onPasswordVisibilityChange('confirmPassword')
                }>
                {visiblePasswords.includes('confirmPassword') ? (
                  <Image
                    source={Constants.Images.eyeon}
                    resizeMode="contain"
                    style={AuthStyle.checkImg}
                  />
                ) : (
                  <Image
                    source={Constants.Images.eyeoff}
                    resizeMode="contain"
                    style={AuthStyle.checkImg}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={RegisterStyle.button}
          activeOpacity={0.7}
          // onPress={this.onContinue}
          onPress={this.onSave}
          >
          <Text style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
            {translate('Save')}
          </Text>
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
  t: func.isRequired,
};

export default withTranslation()(ChangePassword);
