import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const PermisionPopup = ({
  onCancel, onLogout,
}) => (

  <AnimatedModal visible>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapperPermission}>
        <Image source={Constants.Images.camera2} resizeMode='contain' style={PopupStyles.premissionCamera} />
        <Text style={PopupStyles.subHeader}>{'Allow camera access  for'}</Text>
        <Text style={PopupStyles.subHeader}>{'AllBlazing'}</Text>
        <TouchableOpacity
          style={[AuthStyle.loginTouchable, {
            backgroundColor: Constants.Colors.TEXT_COLOR2, width: Constants.BaseStyle.scale(200),
          }]}
          onPress={onCancel}
          activeOpacity={0.7}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Allow'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[OTPStyles.button, AuthStyle.logoutBtn]} onPress={onLogout}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Deny'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

PermisionPopup.propTypes = {

  onCancel: func.isRequired,
  onLogout: func.isRequired,

};
PermisionPopup.defaultProps = { };
export default PermisionPopup;
