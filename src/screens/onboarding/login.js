import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  ScrollView,
  Alert, Platform,
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
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

Geolocation?.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always'
});

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
      emailId: 'abcd@yopmail.com',
      isRemember: true,
      isShow: false,
      password: 'tarun123',
      isLoading: false,
    };
  }

  


  getLastUserCred = async () => {
    try {
      const userCred = JSON.parse(await AsyncStorage.getItem('userCred') || '{}')
      this.setState({emailId: userCred?.email, password: userCred?.password})
    } catch (error) {
      console.log('Unable to get User Last Cred');
    }
    
  }
  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'AllBlazing',
          'message': 'AllBlazing access to your location ',
          buttonPositive: "OK"
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        // alert("You can use the location");
      } else {
        console.log("location permission denied")
        // alert("Location permission denied");
      }
    } catch (err) {
      console.log(err)
    }
  }
  


  componentDidMount() {
    // this.getLastUserCred()
    if(Platform.OS === 'ios') {

      Geolocation.requestAuthorization()
    }else {
      this.getLocation()
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  componentDidUpdate(prevProps ,nextProps) {
    console.log("LOGINNNNNNN", nextProps)
    // if(prevProps.changedProp !== this.props.changedProp){
    //     this.setState({          
    //         changedProp: this.props.changedProp
    //     });
    // }
}



  onLogin = async () => {
   
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
    // this.setState({
    //   isLoading: true,
    // });
let data = {
        email: emailId,
        password: password,
      }
    this.props.login(data)
    // axios
    //   .post(API.LOG_IN, {
    //     email: emailId,
    //     password: password,
    //   })
    //   .then(async (response) => {
    //     if (response?.data?.code === 401) {
    //       Alert.alert(
    //         '',
    //         response?.data?.message ?? '',
            
    //       );
    //     }
    //     if (response?.data?.code === 200) {
    //       console.log("=======>>>responselogin",response?.data?.data);
    //       setAuthToken(response?.data?.data?.token);
    //       addLoginDetail(response?.data?.data);
    //       setLoginUserId(JSON.stringify(response?.data?.data));
    //       if(this.state.isRemember) {
    //         try {
    //           await AsyncStorage.setItem('userCred', JSON.stringify({email: emailId, password}))
    //           console.log('CRED SAVED', JSON.stringify({email: emailId, password}));
    //         } catch (error) {
    //           console.log("CRED NOT SAVED", error.message);
    //         }
    //     }
    //     else {
    //       console.log('remember is false');
    //       await AsyncStorage.removeItem('userCred')
          
    //     }
    //       loginSuccess();
    //       if(response?.data?.data?.completeProfile) {
    //         navigate('Overview');

    //       }else {
    //         navigate('Username')
    //       }
    //     }
    //   })
    //   .finally(() => {
    //     this.setState({
    //       isLoading: false,
    //     });
    //   });
  };

  render() {
    const {emailId, password, isShow, isRemember, isLoading} = this.state;
    const {
      navigation: {navigate},
      t: translate,
      email,
     loginStatus
    } = this.props;
    console.log("LOGINNNNNNN",  loginStatus)

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
                autoCapitalize={'none'}
                autoCorrect={false}

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
                  autoCapitalize={'none'}
                autoCorrect={false}
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
                disabled={loginStatus ==='requesting'}
                style={[AuthStyle.loginTouchable, LoginStyles.loginBtn]}
                activeOpacity={0.7}
                onPress={this.onLogin}
                >
                {loginStatus ==='requesting'? (
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

const mapStateToProps = ({auth: {email,status,data,code},user:{loginStatus}}) => ({
  email,status,data ,code ,loginStatus
});

const mapDispatchToProps = {
  addLoginDetail: (params) => setLoginDetails(params),
  loginSuccess: actions.loginSuccess,
  login: actions.login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Login));
