import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {AuthStyle, CommonStyles, ForgotPassStyles} from '../../styles';
import {InputField, SuccessPopup} from '../../components';
import axios from 'axios';
import API from '../../constants/baseApi';
import {setForgotPasswordUserId} from '../../helpers/auth';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      visible: false,
      isLoading: false,
    };
  }

  onContinue = () => {
    this.setState({visible: true});
  };

  onSubmit = () => {
    const {
      navigation: {navigate},
    } = this.props;
    const {email} = this.state;
    if (email.length < 1) {
      Alert.alert('', 'Please enter your email Id');
      return;
    }
    this.setState({
      isLoading: true,
    });
    axios
      .post(API.FORGOT_PASSWORD, {
        email: email,
      })
      .then((response) => {
        console.log("Forgot=====>", response)

        if (response?.data?.code === 422) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
          );
        }
        if (response?.data?.code === 200) {
          this.setState({visible:true})
          setForgotPasswordUserId(response?.data?.data?.user_id.toString());
          console.log(response?.data?.data?.user_id.toString());
        }
        
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const {email, visible, isLoading} = this.state;
    const {
      navigation: {navigate},
      t,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={ForgotPassStyles.wrapper}>
          <Text style={AuthStyle.selectText}>{t('Forgot Password')}</Text>
          <Text style={[AuthStyle.buttonText, ForgotPassStyles.buttonText]}>
            {t('Forgot Password Instructions')}
          </Text>
          <View style={ForgotPassStyles.wrapper2}>
            <InputField
              value={email}
              placeholder="Email"
              onChangeText={(text) => this.setState({email: text})}
            />
          </View>
        </View>

        <SuccessPopup
          hasResendBtn
          instructions={`${t('Forgot Password Success')} ${this.state.email}`}
          visible={visible}
          onClick={() => this.setState({visible: false}, () =>navigate('ForgotOTP',{email:this.state.email}))}
          hasResendBtn={false}
        />
        <View style={ForgotPassStyles.buttonsWrapper}>
          <TouchableOpacity
            style={[
              AuthStyle.loginTouchable,
              {backgroundColor: Constants.Colors.TEXT_COLOR2},
            ]}
            activeOpacity={0.7}
            // onPress={() => this.onContinue()}
            onPress={() => this.onSubmit()}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {t('Submit')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ForgotPassword.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(ForgotPassword);
