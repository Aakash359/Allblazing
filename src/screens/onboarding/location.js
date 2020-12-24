import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { AuthStyle, UsernameStyle, CommonStyles, LocationStyles, OTPStyles, ConnectUserTypeStyles } from '../../styles';
import { StepBar } from '../../components';
import { loginSuccess } from '../../actions/user-action-types';

const Location = ({ t: translate }) => {
  const dispatch = useDispatch();
  const goToSettings = async () => {
    dispatch(loginSuccess());
  };

  return (
    <View style={CommonStyles.container}>
      <ScrollView style={[ConnectUserTypeStyles.wrapper, LocationStyles.container]}>
        <StepBar count={5} selected={[0, 1, 2, 3, 4]} />
        <View style={[UsernameStyle.inputWrapper, LocationStyles.inputWrapper]}>
          <Text style={[AuthStyle.selectText, LocationStyles.locationText]}>{translate('profile.TurnOnLocation')}</Text>
          <Text style={[AuthStyle.privcyText, OTPStyles.header]}>{translate('profile.TurnOnLocationDescription')}</Text>
        </View>
        <Image source={Constants.Images.location} resizeMode='contain' style={LocationStyles.logo} />
      </ScrollView>
      <View style={LocationStyles.buttonsWrapper}>
        <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={() => null}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('profile.Share My Location')}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[OTPStyles.button, LocationStyles.button]} onPress={() => goToSettings()}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('profile.Select It Manually')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Location.propTypes = { t: func.isRequired };

export default withTranslation()(Location);
