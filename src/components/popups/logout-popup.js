import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const LogoutPopup = ({
  onCancel, onLogout,
}) => (
  <AnimatedModal visible>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapper}>
        <Text style={PopupStyles.header}>{'Logout'}</Text>
        <Text style={PopupStyles.subHeader}>{'Are you sure you want to logout?'}</Text>
        <TouchableOpacity style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]} onPress={onCancel} activeOpacity={0.7}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'No'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[OTPStyles.button, AuthStyle.logoutBtn]} onPress={onLogout}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Yes'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

LogoutPopup.propTypes = {
  onCancel: func.isRequired,
  onLogout: func.isRequired,
};

export default LogoutPopup;
