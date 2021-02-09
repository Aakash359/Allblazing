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
import { authHeader } from '../../helpers/auth';
import API from '../../constants/baseApi';
import {setLoginDetails} from '../../reducers/baseServices/auth';
import { getAuthToken } from '../../helpers/auth';


class ChangePassword extends Component {
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
      isLoading: false,
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

    const {password, newPassword,confirmPassword} = this.state;
    if (password.length < 1) {
      Alert.alert(
        '',
        'Please fill old password',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('ok pressed'),
          },
        ],
        {Cancelable:false}
      );
      return;
    } else if (newPassword.length < 1) {
      Alert.alert(
        '',
        'Please fill  new password',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('ok pressed'),
          },
        ],
        {Cancelable:false}
        
      );
      return;
    }else if(password == newPassword ){
      Alert.alert(
        '',
        'you have recently used this password',
        [
          {
            text:'Cancel',
            onPress:()=>console.log('Cancel pressed'),
            style:'Cancel',
          },
          {
            text:'Ok',
            onPress: () => console.log('ok pressed'),
          },
        ],
        {Cancelable:false}
      );
      return;
    }else if(confirmPassword.length < 1){
      Alert.alert(
          '',
          'Please fill confirm password!',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel pressed'),
              style: 'Cancel',
            },
            {
              text: 'OK',
              onPress: () => console.log('ok pressed'),
            },
          ],
          {Cancelable:false}
          
      );
      return;
    }else if(newPassword != confirmPassword){
      Alert.alert(
        '',
        'Please enter new password and confirm password same',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('ok pressed'),
          },
        ],
        {Cancelable:false}
      );
      return;
    }
    this.setState({
      isLoading: true,
    });
    // markwinz06@gmail.com/mark@1234
    const token = await getAuthToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  // console.log(config);

    axios
      .post(API.CHANGE_PASSWORD, {
        old_password: password,
        password: newPassword,
        confirm_password:confirmPassword,
      },config)
      .then((response) => {
        // console.log('token ====', response.data);
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
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('Settings'),
              },
            ],
            {Cancelable:false}
            
          );

          // navigate('Settings');

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
            <View style={RegisterStyle.passwordInput}>
              <TextInput
                maxLength={16}
                ref={this.passwordRef}
                style={RegisterStyle.password}
                returnKeyType="next"
                placeholder={translate('password.OldPassword')}
                secureTextEntry={!visiblePasswords.includes('password')}
                value={password}
                onChangeText={(text) => this.setState({password: text})}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(
                    findNodeHandle(this.passwordRef.current),
                  );
                }}
                onBlur={() => {
                  this.resetScrollView(
                    findNodeHandle(this.passwordRef.current),
                  );
                }}
                onSubmitEditing={() => this.newPasswordRef.current.focus()}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.onPasswordVisibilityChange('password')}>
                {visiblePasswords.includes('password') ? (
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
                    findNodeHandle(this.passwordRef.current),
                  );
                }}
                onBlur={() => {
                  this.resetScrollView(
                    findNodeHandle(this.passwordRef.current),
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
                    findNodeHandle(this.passwordRef.current),
                  );
                }}
                onBlur={() => {
                  this.resetScrollView(
                    findNodeHandle(this.passwordRef.current),
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
            {this.state.isLoading ? (
              <ActivityIndicator  color="white" size={25}/>
            ):(
              <Text style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('Save')}
            </Text>
            )}
          
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
