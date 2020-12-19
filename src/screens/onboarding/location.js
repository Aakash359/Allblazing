import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import Constants from '../../constants';
import { AuthStyle, UsernameStyle, CommonStyles, LocationStyles, OTPStyles, ConnectUserTypeStyles } from '../../styles';
import { StepBar } from '../../components';
import { loginSuccess } from '../../actions/user-action-types';

const Location = () => {
  const dispatch = useDispatch();
  const goToSettings = async () => {
    dispatch(loginSuccess());
  };

  return (
    <View style={CommonStyles.container}>
      <ScrollView style={[ConnectUserTypeStyles.wrapper, LocationStyles.container]}>
        <StepBar count={5} selected={[0, 1, 2, 3, 4]} />
        <View style={[UsernameStyle.inputWrapper, LocationStyles.inputWrapper]}>
          <Text style={[AuthStyle.selectText, LocationStyles.locationText]}>Turn on location</Text>
          <Text style={[AuthStyle.privcyText, OTPStyles.header]}>{'Find runners closer to you by enabling your location.'}</Text>
        </View>
        <Image source={Constants.Images.location} resizeMode='contain' style={LocationStyles.logo} />
      </ScrollView>
      <View style={LocationStyles.buttonsWrapper}>
        <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={() => null}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Share My Location'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[OTPStyles.button, LocationStyles.button]} onPress={() => goToSettings()}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Select It Manually'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;
