import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { func, bool } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, PopupStyles, OTPStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const RemoveMemberPopup = ({
  leaveGroup, onCancel, onLogout,
}) => (

  <AnimatedModal visible>
    <View style={PopupStyles.container}>
      <View style={PopupStyles.wrapper}>
        {leaveGroup ? <Text style={PopupStyles.header}>{'Leave Group'}</Text> : <Text style={PopupStyles.header}>{'Remove Memeber'}</Text>}
        {leaveGroup ? <Text style={PopupStyles.subHeader}>{'Are you sure you want to leave this group?'}</Text>
          : <Text style={PopupStyles.subHeader}>{'Are you sure you want to remove this member?'}</Text>}
        <TouchableOpacity
          style={[AuthStyle.loginTouchable, {
            backgroundColor: Constants.Colors.TEXT_COLOR2, width: Constants.BaseStyle.scale(200),
          }]}
          onPress={onCancel}
          activeOpacity={0.7}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'No'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={[OTPStyles.button, AuthStyle.logoutBtn]} onPress={onLogout}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Yes'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

RemoveMemberPopup.propTypes = {
  leaveGroup: bool,
  onCancel: func.isRequired,
  onLogout: func.isRequired,

};
RemoveMemberPopup.defaultProps = { leaveGroup: false };
export default RemoveMemberPopup;
