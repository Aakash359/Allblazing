import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {
  AuthStyle,
  CommonStyles,
  ChangePassStyles,
  UsernameStyle,
} from '../../styles';
import axios from 'axios';
import API from '../../constants/baseApi';
import { getAuthToken } from '../../helpers/auth';
import { ActivityIndicator } from 'react-native';

const languages = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Dutch',
    value: 'dutch',
  },
];

class ChangeLanguage extends Component {
  constructor() {
    super();
    this.state = {
      language: 'english',
      isLoading : false,
  };
  }

  onChange = (language) => {
    this.setState({language});
  };

  _handleChangeLanguage = async () => {
    const {
      navigation: {navigate},
    } = this.props;

    const token = await getAuthToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  this.setState({
    isLoading: true,
  });
    axios
      .post(API.CHANGE_LANGUAGE, {
        language: "english",
      },config)
      .then((response) => {
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancle',
                onPress: () => console.log('cancle pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('Settings'),
              },
            ],
            {cancelable:false}
          );
          // navigate('Settings');
        }
      }).finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const {language,isLoading} = this.state;
    const {
      navigation: {goBack},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={UsernameStyle.wrapper}>
            <View style={UsernameStyle.inputWrapper}>
              {languages.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[
                    AuthStyle.loginTouchable,
                    AuthStyle.loginTouchableRow,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => this.onChange(t.value)}>
                  <Text style={AuthStyle.buttonText}>{'     '}</Text>
                  <Text
                    style={[
                      AuthStyle.buttonLanguageText,
                      language === t.value ? AuthStyle.buttonActiveText : {},
                    ]}>
                    {t.label}
                  </Text>
                  {language === t.value ? (
                    <Image
                      source={Constants.Images.check}
                      resizeMode="contain"
                      style={AuthStyle.checkImg}
                    />
                  ) : (
                    <Text style={AuthStyle.checkImg}>{}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[AuthStyle.saveBtn, ChangePassStyles.saveBtn]}
          // onPress={() => goBack()}
          onPress={this._handleChangeLanguage}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size={25}/>
            ):(
              <Text style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
            {translate('Save')}
          </Text>)}
          
        </TouchableOpacity>
      </View>
    );
  }
}

ChangeLanguage.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(ChangeLanguage);
