import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, LocationStyles, OTPStyles, ConnectUserTypeStyles } from '../../styles';
import { StepBar } from '../../components';
import { loginSuccess } from '../../actions/user-action-types';

const Location = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const goToSettings = async () => {
    navigation.navigate('Dashboard');
    // const url = 'app-settings:';

    // try {
    //   const canOpenHealthApp = await Linking.canOpenURL(url);

    //   if (canOpenHealthApp) {
    //     Linking.openURL(url);
    //   }
    // } catch (e) {
    //   // eslint-disable-next-line no-console
    //   console.log('error', e);
    // }
  };

  // eslint-disable-next-line no-unused-vars
  const onSkip = () => {
    dispatch(loginSuccess());
    navigation.navigate('Dashboard');
  };

  return (
    <View style={CommonStyles.container}>
      <View style={ConnectUserTypeStyles.wrapper}>
        <StepBar count={5} selected={[0, 1, 2, 3, 4]} />

        <View>
          <Text>{' '}</Text>
          <Text style={[AuthStyle.selectText, LocationStyles.locationText]}>Turn on location</Text>
          <Text style={[AuthStyle.privcyText, OTPStyles.header]}>{'Find runners closer to you by enabling your location.'}</Text>
        </View>
        <Image
          source={Constants.Images.location}
          resizeMode='contain'
          style={LocationStyles.logo}
        />
        <View style={OTPStyles.buttonsWrapper}>
          <TouchableOpacity style={OTPStyles.button} activeOpacity={0.7} onPress={() => goToSettings()}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Select It Manually'}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={OTPStyles.button} activeOpacity={0.7} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Skip'}</Text>
        </TouchableOpacity> */}
          <TouchableOpacity style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={() => null}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Share My Location'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Location;
