import React from 'react';
import {
  Platform,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {bool, func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../constants';
import {
  CommonStyles,
  BlockUserStyles,
  AuthStyle,
  ForgotPassStyles,
} from '../styles';
import {blockReportReasons} from '../data';
import Axios from 'axios';
import API from '../constants/baseApi';
import {Alert} from 'react-native';

class BlockUser extends React.Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      reason: null,
    };
  }
  OnBlock = async () => {
    const {
      navigation: {navigate},
    } = this.props;

    this.setState({
      isLoading: true,
    });

    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('Token===>',config);
    Axios.post(
      API.USER_BLOCK,
      {
        user_id: 2,
        type: 'blocked',
        block_type: 'Testing',
      },
      config,
    )
      .then((response) => {
        console.log('token ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );

          navigate('MyProfile');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  OnReport = async () => {
    const {
      navigation: {navigate},
    } = this.props;

    this.setState({
      isLoading: true,
    });

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    Axios.post(
      API.USER_REPORT,
      {
        user_id: 11,
        type: 'report',
        report_type: 'Testing',
      },
      config,
    )
      .then((response) => {
        console.log('response ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );

          navigate('MyProfile');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  render() {
    const {reason, description} = this.state;
    const {
      navigation: {goBack},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={[ForgotPassStyles.wrapper, BlockUserStyles.container]}>
            <Text style={BlockUserStyles.title}>{`${
              params?.isBlockPage
                ? translate('actions.blockBtnTitle')
                : translate('actions.reportBtnTitle')
            }`}</Text>
            <Text style={BlockUserStyles.subtitle}>
              {params?.isBlockPage
                ? translate('actions.blockBtnSubtitle')
                : translate('actions.reportConfirmation')}
            </Text>
          </View>
          {blockReportReasons.map((singleElement) => (
            <TouchableOpacity
              key={singleElement.value}
              style={[
                AuthStyle.loginTouchable,
                AuthStyle.loginTouchableRow,
                BlockUserStyles.button,
                singleElement.value === 'Other' &&
                  reason === 'Other' &&
                  BlockUserStyles.otherBtn,
              ]}
              activeOpacity={0.7}
              onPress={() => this.setState({reason: singleElement.value})}>
              <Text
                style={[
                  AuthStyle.buttonLanguageText,
                  BlockUserStyles.buttonText,
                  reason === singleElement.value
                    ? AuthStyle.buttonActiveText
                    : {},
                ]}>
                {translate(singleElement.label)}
              </Text>
              {reason === singleElement.value && (
                <Image
                  source={Constants.Images.check}
                  resizeMode="contain"
                  style={[AuthStyle.checkImg, BlockUserStyles.select]}
                />
              )}
            </TouchableOpacity>
          ))}
          {reason === 'Other' && (
            <View
              style={[
                CommonStyles.textAreaWrapper,
                BlockUserStyles.textAreaWrapper,
              ]}>
              <TextInput
                multiline
                maxLength={450}
                numberOfLines={20}
                style={CommonStyles.textArea}
                placeholder={translate('Please describe here...')}
                value={description}
                onChangeText={(text) => this.setState({description: text})}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
              />
            </View>
          )}
          <View style={BlockUserStyles.space} />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[AuthStyle.saveBtn, reason == null && BlockUserStyles.saveBtnColor, BlockUserStyles.saveBtn]}
          onPress={() => {
            params?.isBlockPage?this.OnBlock():this.OnReport()
          }}
          // onPress={this.OnSubmit}
        >
          <Text style={[AuthStyle.buttonLanguageText, reason && AuthStyle.buttonActiveText]}>{translate('Submit')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

BlockUser.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({params: shape({isEditMode: bool})}).isRequired,
  t: func.isRequired,
};

export default withTranslation()(BlockUser);
