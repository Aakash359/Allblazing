import React from 'react';
import { View, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, LocationStyles, OTPStyles } from '../../styles';
import { StepBar } from '../../components';

const Location = () => {
  const navigation = useNavigation();
  const goToSettings = async () => {
    const url = 'app-settings:';

    try {
      const canOpenHealthApp = await Linking.canOpenURL(url);

      if (canOpenHealthApp) {
        Linking.openURL(url);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error', e);
    }
  };

  return (
    <View style={CommonStyles.container}>
      <StepBar count={5} selected={[0, 1, 2, 3, 4]} />
      <View style={CommonStyles.headerWrapper}>
        <Text style={AuthStyle.selectText}>Turn on location</Text>
        <Text style={[AuthStyle.buttonText, OTPStyles.header]}>{'Find runners closer to you by enabling your location.'}</Text>
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
        <TouchableOpacity style={OTPStyles.button} activeOpacity={0.7} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Skip'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={() => Geolocation.requestAuthorization()}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Share My Location'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;
