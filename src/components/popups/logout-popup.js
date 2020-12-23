import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const LogoutPopup = ({
  onCancel, onLogout, t: translate,
}) => (
  <AnimatedModal visible>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapper}>
        <Text style={PopupStyles.header}>{translate('settings.Logout')}</Text>
        <Text style={PopupStyles.subHeader}>{translate('settings.LogoutConfirmation')}</Text>
        <TouchableOpacity
          style={[AuthStyle.loginTouchable, {
            backgroundColor: Constants.Colors.TEXT_COLOR2, width: Constants.BaseStyle.scale(200),
          }]}
          onPress={onCancel}
          activeOpacity={0.7}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('No')}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[OTPStyles.button, AuthStyle.logoutBtn]} onPress={onLogout}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Yes')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

LogoutPopup.propTypes = {
  onCancel: func.isRequired,
  onLogout: func.isRequired,
  t: func.isRequired,
};

export default withTranslation()(LogoutPopup);
