import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { InvitePopupStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const InviteOptionPopup = ({
  onFacebook, onStrava, onWhatsApp, onClose, t: translate,
}) => (
  <AnimatedModal visible>
    <TouchableOpacity style={InvitePopupStyles.popup} activeOpacity={1} onPress={onClose}>
      <View style={InvitePopupStyles.container}>
        <View style={InvitePopupStyles.wrapper}>
          <Text style={InvitePopupStyles.headerText}>{translate('settings.Share to')}</Text>
          <View style={InvitePopupStyles.row}>
            <TouchableOpacity style={InvitePopupStyles.social} activeOpacity={0.7} onPress={onStrava}>
              <Image resizeMode='contain' style={InvitePopupStyles.socialIcon} source={Constants.Images.strava} />
              <Text style={InvitePopupStyles.socialText}>{translate('Strava')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InvitePopupStyles.social} activeOpacity={0.7} onPress={onFacebook}>
              <Image resizeMode='contain' style={InvitePopupStyles.socialIcon} source={Constants.Images.facebook} />
              <Text style={InvitePopupStyles.socialText}>{translate('Facebook')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InvitePopupStyles.social} activeOpacity={0.7} onPress={onWhatsApp}>
              <Image resizeMode='contain' style={InvitePopupStyles.socialIcon} source={Constants.Images.whatsApp} />
              <Text style={InvitePopupStyles.socialText}>{translate('WhatsApp')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  </AnimatedModal>
);

InviteOptionPopup.propTypes = {
  onClose: func.isRequired,
  onFacebook: func.isRequired,
  onStrava: func.isRequired,
  onWhatsApp: func.isRequired,
  t: func.isRequired,
};

export default withTranslation()(InviteOptionPopup);
