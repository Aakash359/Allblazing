import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {func, shape} from 'prop-types';
import {connect,useDispatch} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {InputField} from '../../components';
import {AuthStyle, CommonStyles, LoginStyles} from '../../styles';
import Constants from '../../constants';
import * as actions from '../../actions/user-action-types';
import {setLoginDetails} from '../../reducers/baseServices/auth';
import axios from 'axios';
import API from '../../constants/baseApi';
import { setAuthToken, setLoginUserId } from '../../helpers/auth';
const socialIcons = [
  {
    icon: Constants.Images.email,
    name: 'google',
  },
  {
    icon: Constants.Images.fb,
    name: 'facebook',
  },
  {
    icon: Constants.Images.insta,
    name: 'insta',
  },
  {
    icon: Constants.Images.twitter,
    name: 'twitter',
  },
  {
    icon: Constants.Images.tiktok,
    name: 'tiktok',
  },
];

class Login extends Component {

  timer = null;
  constructor() {
    super();
    this.state = {
      emailId: '',
      isRemember: false,
      isShow: false,
      password: '',
      isLoading: false,
    };
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onLogin = async () => {
    console.log('dsgbdfghhg');
    
    const {loginSuccess, addLoginDetail} = this.props;
    const {
      navigation: {goBack, navigate},
    } = this.props;
    navigate('Overview');
    const {emailId, password} = this.state;
    if (emailId.length < 1) {
      Alert.alert(
        '',
        'Please enter email id',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        {Cancelable: false},
      );
      return;
    } else if (password.length < 1) {
      Alert.alert(
        '',
        'Please enter password',
        
      );
      return;
    }
    this.setState({
      isLoading: true,
    });
    axios
      .post(API.LOG_IN, {
        email: emailId,
        password: password,
      })
      .then((response) => {
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 200) {
          console.log("=======>>>responselogin",response?.data?.data);
          setAuthToken(response?.data?.data?.token);
          addLoginDetail(response?.data?.data);
          setLoginUserId(JSON.stringify(response?.data?.data));
          // loginSuccess();
          // navigate('Overview');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const {emailId, password, isShow, isRemember, isLoading} = this.state;
    const {
      navigation: {navigate},
      t: translate,
      email,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={LoginStyles.wrapper}>
            <Image
              source={Constants.Images.slectLangLogo2x}
              resizeMode="contain"
              style={LoginStyles.logo}
            />
            <View>
              <InputField
                value={emailId}
                placeholder={translate('Email')}
                onChangeText={(text) => this.setState({emailId: text})}
              />
              <View style={LoginStyles.passwordInput}>
                <TextInput
                  style={LoginStyles.password}
                  placeholder={translate('Password')}
                  secureTextEntry={!isShow}
                  value={password}
                  onChangeText={(text) => this.setState({password: text})}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
                {isShow ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setState({isShow: !isShow})}>
                    <Image
                      source={Constants.Images.eyeon}
                      resizeMode="contain"
                      style={AuthStyle.checkImg}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.setState({isShow: !isShow})}>
                    <Image
                      source={Constants.Images.eyeoff}
                      resizeMode="contain"
                      style={AuthStyle.checkImg}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={LoginStyles.remember}>
                <View style={LoginStyles.row}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.setState({isRemember: !isRemember})}>
                    <Image
                      source={
                        isRemember
                          ? Constants.Images.checkbox
                          : Constants.Images.checkoff
                      }
                      resizeMode="contain"
                      style={LoginStyles.rememberIcon}
                    />
                  </TouchableOpacity>
                  <Text style={LoginStyles.rememberText}>
                    {translate('Remember me')}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigate('ForgotPassword')}>
                  <Text
                    style={[
                      AuthStyle.buttonText,
                      LoginStyles.forgotPasswordText,
                    ]}>
                    {`${translate('Forgot password')}?`}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                disabled={isLoading}
                style={[AuthStyle.loginTouchable, LoginStyles.loginBtn]}
                activeOpacity={0.7}
                onPress={this.onLogin}
                >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text
                    style={[
                      AuthStyle.buttonText,
                      {color: Constants.Colors.WHITE},
                    ]}>
                    {translate('Login')}
                  </Text>
                )}
              </TouchableOpacity>
              <View style={LoginStyles.orContainer}>
                <Image
                  source={Constants.Images.line}
                  resizeMode="contain"
                  style={{width: Constants.BaseStyle.scale(80)}}
                />
                <Text style={LoginStyles.loginText}>
                  {translate('or login using')}
                </Text>
                <Image
                  source={Constants.Images.line}
                  resizeMode="contain"
                  style={{width: Constants.BaseStyle.scale(80)}}
                />
              </View>
              <View style={LoginStyles.socialIconsWrapper}>
                {socialIcons.map((social) => (
                  <TouchableOpacity activeOpacity={0.7} key={social.name}>
                    <Image
                      source={social.icon}
                      resizeMode="contain"
                      style={LoginStyles.socialIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={LoginStyles.accountWrapper}>
          <Text style={LoginStyles.account}>
            {translate('Do not have account?')}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('Register')}>
            <Text style={LoginStyles.createAccount}>
              {translate('Create account')}
            </Text>
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
  t: func.isRequired,
};

const mapStateToProps = ({auth: {email}}) => ({
  email,
});

const mapDispatchToProps = {
  addLoginDetail: (params) => setLoginDetails(params),
  // loginSuccess: actions.loginSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Login));
