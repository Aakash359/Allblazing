import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import {InputField} from '../../components';
import {AuthStyle, CommonStyles, RegisterStyle} from '../../styles';
import Constants from '../../constants';
import axios from 'axios';
import API from '../../constants/baseApi';
import {setSignUpDetails} from '../../reducers/baseServices/signUp';
import * as actions from '../../actions/user-action-types';
import {setSignUpToken, setUserId} from '../../helpers/auth';

class Register extends Component {
  emailRef = React.createRef();
  passwordRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isPasswordVisible: false,
      password: '',
      isLoading: false,
    };
  }

  onContinue = () => {
    const {
      navigation: {navigate},
    } = this.props;

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
    const {
      navigation: {navigate},
    } = this.props;

    navigate(route, {title});
  };

  onSignUp = () => {
    const {
      navigation: {navigate},
    } = this.props;
    const {signupSuccess, addSignUpDetail} = this.props;

    const {email, password} = this.state;
    if (email.length < 1) {
      Alert.alert('', 'Please enter email id',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('Ok Pressed'),
        },
      ],
      {Cancelable:false}
      );
      return;
    } else if (password.length < 8) {
      Alert.alert('', 'Please enter password at least 8 characters!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {Cancelable:false}
      );
      return;
    }

    this.setState({
      isLoading: true,
    });
    axios
      .post(API.SIGN_UP, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response?.data?.code === 422) {
          Alert.alert(
            '',
            response?.data?.message?.email ?? '',
            // console.log('res===>', response?.data?.message?.email),
          );
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
                onPress: () => navigate('OTP', {email: this.state.email}),
              },
            ],
            {Cancelable: false},
          );
          addSignUpDetail(response?.data?.data);
          // console.log('data=====>', response?.data?.data);
          setUserId(response?.data?.data?.user_id.toString());
          // console.log('UserId====>>>',response?.data?.data?.user_id);
          signupSuccess();
          // navigate('OTP',{email:this.state.email});
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const {email, password, isPasswordVisible, isLoading} = this.state;
    const {t: translate} = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={RegisterStyle.wrapper}>
            <View style={CommonStyles.headerWrapper}>
              <Text
                style={{
                  ...AuthStyle.selectText,
                  fontSize: Constants.BaseStyle.scale(30),
                }}>
                {translate('Sign Up')}
              </Text>
            </View>
            <View>
              <View style={RegisterStyle.emailInput}>
                <TextInput
                  ref={this.emailRef}
                  style={RegisterStyle.email}
                  returnKeyType="next"
                  placeholder={translate('Email')}
                  value={email}
                  onChangeText={(text) => this.setState({email: text})}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  onSubmitEditing={() => this.passwordRef.current.focus()}
                  underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
              </View>
              {/* <InputField
                value={email}
                returnKeyType="next"
                placeholder={translate('Email')}
                ref={this.emailRef}
                keyboardType="email-address"
                onChangeText={(text) => this.setState({email: text})}
                onSubmitEditing={() => this.passwordRef.current.focus()}
              /> */}
              <View style={RegisterStyle.passwordInput}>
                <TextInput
                  ref={this.passwordRef}
                  style={RegisterStyle.password}
                  returnKeyType="done"
                  placeholder={translate('Password')}
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(text) => this.setState({password: text})}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  onSubmitEditing={this.onContinue}
                  underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.setState({isPasswordVisible: !isPasswordVisible})
                  }>
                  {isPasswordVisible ? (
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
            <View style={RegisterStyle.textLinkView}>
              <Text style={RegisterStyle.textSmallStyle}>
                {translate('SignUpInstructions')}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.onStaticRoutes(
                  'StaticContent',
                  'settings.Privacy Policy',
                )}>
                <Text style={RegisterStyle.textSmallLinkStyle}>{` ${translate(
                  'settings.Privacy Policy',
                )} `}</Text>
              </TouchableOpacity>
              <Text style={RegisterStyle.textSmallStyle}>
                {translate('and')}
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={this.onStaticRoutes(
                  'StaticContent',
                  'settings.Terms & Conditions',
                )}>
                <Text style={RegisterStyle.textSmallLinkStyle}>{` ${translate(
                  'settings.Terms & Conditions',
                )} `}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          disabled={isLoading}
          style={RegisterStyle.button}
          activeOpacity={0.7}
          // onPress={this.onContinue}
          onPress={this.onSignUp}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('Sign Up')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

Register.propTypes = {
  signupSuccess: func.isRequired,
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
  addSignUpDetail: (params) => setSignUpDetails(params),
  signupSuccess: actions.signupSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Register));
