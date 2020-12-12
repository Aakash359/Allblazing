import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { func } from 'prop-types';
import Constants from '../../constants';
import { InvitePopupStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const InviteOptionPopup = ({
  onFacebook, onStrava, onWhatsApp,
}) => (
  <AnimatedModal visible>
    <View style={InvitePopupStyles.container}>
      <View style={InvitePopupStyles.wrapper}>
        <Text style={InvitePopupStyles.headerText}>{'Share to'}</Text>
        <View style={InvitePopupStyles.row}>
          <TouchableOpacity style={InvitePopupStyles.social} activeOpacity={0.7} onPress={onStrava}>
            <Image resizeMode='contain' style={InvitePopupStyles.socialIcon} source={Constants.Images.strava} />
            <Text style={InvitePopupStyles.socialText}>{'Strava'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={InvitePopupStyles.social} activeOpacity={0.7} onPress={onFacebook}>
            <Image resizeMode='contain' style={InvitePopupStyles.socialIcon} source={Constants.Images.facebook} />
            <Text style={InvitePopupStyles.socialText}>{'Facebook'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={InvitePopupStyles.social} activeOpacity={0.7} onPress={onWhatsApp}>
            <Image resizeMode='contain' style={InvitePopupStyles.socialIcon} source={Constants.Images.whatsApp} />
            <Text style={InvitePopupStyles.socialText}>{'WhatsApp'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </AnimatedModal>
);

InviteOptionPopup.propTypes = {
  onFacebook: func.isRequired,
  onStrava: func.isRequired,
  onWhatsApp: func.isRequired,
};

export default InviteOptionPopup;
