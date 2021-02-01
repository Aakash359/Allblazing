import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {func} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {
  AuthStyle,
  UsernameStyle,
  CommonStyles,
  LocationStyles,
  OTPStyles,
  ConnectUserTypeStyles,
} from '../../styles';
import {StepBar} from '../../components';
import axios from 'axios';
import {
  getUserName,
  getUserAge,
  getUserConnectType,
  getUserDistance,
  getUserRecentTime,
  getOtpToken,
} from '../../helpers/auth';
import API from '../../constants/baseApi';

class Location extends Component {
  onSubmit = async () => {
    const {
      navigation: {navigate},
    } = this.props;

    this.setState({
      isLoading: true,
    });
    // markwinz06@gmail.com/mark@1234
    const name = await getUserName();
    const Age = await getUserAge();
    const Type = await getUserConnectType();
    const Distance = await getUserDistance();
    const Time = await getUserRecentTime();
    const token = await getOtpToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    // console.log(name, Age, Type, Distance, Time);
    // console.log(config);
    axios
      .post(
        API.COMPLETE_PROFILE,
        {
          full_name: name,
          age: Age,
          type: Type,
          distance: Distance,
          time: Time,
          latitude:74.777899,
          longitude:25.345678,
          country:'india',
          state:'up',
          level:1
        },
        config,
      )
      .then((response) => {
        // console.log('response ====', response.data);
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
      navigation: {goBack, navigate},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          style={[ConnectUserTypeStyles.wrapper, LocationStyles.container]}>
          <StepBar count={5} selected={[0, 1, 2, 3, 4]} />
          <View
            style={[UsernameStyle.inputWrapper, LocationStyles.inputWrapper]}>
            <Text style={[AuthStyle.selectText, LocationStyles.locationText]}>
              {translate('profile.TurnOnLocation')}
            </Text>
            <Text style={[AuthStyle.privcyText, OTPStyles.header]}>
              {translate('profile.TurnOnLocationDescription')}
            </Text>
          </View>
          <Image
            source={Constants.Images.location}
            resizeMode="contain"
            style={LocationStyles.logo}
          />
        </ScrollView>
        <View style={LocationStyles.buttonsWrapper}>
          <TouchableOpacity
            // activeOpacity={0.7}
            style={[
              AuthStyle.loginTouchable,
              {backgroundColor: Constants.Colors.TEXT_COLOR2},
            ]}
            onPress={() => null}>
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('profile.Share My Location')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // activeOpacity={0.7}
            style={[OTPStyles.button, LocationStyles.button]}
            onPress={this.onSubmit}>
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('profile.Select It Manually')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Location.propTypes = {t: func.isRequired};

export default withTranslation()(Location);
