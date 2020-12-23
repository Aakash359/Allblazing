import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { InviteFriendsStyles } from '../../styles';

export const InvitedUser = ({ t: translate }) => {
  const [checked, setCheck] = useState(false);

  return (
    <View activeOpacity={0.7} onPress={() => setCheck(!checked)} style={[InviteFriendsStyles.invitedUserContainer]}>
      <View style={[InviteFriendsStyles.userWrapper, InviteFriendsStyles.invitedUserWrapper]}>
        <Image source={Constants.Images.inviteUser2} style={[InviteFriendsStyles.userImage, InviteFriendsStyles.invitedUserImage]} />
        <View style={InviteFriendsStyles.userDetailView}>
          <View style={InviteFriendsStyles.userInformation}>
            <Text style={[InviteFriendsStyles.username, InviteFriendsStyles.namePadding]}>Shane Watson</Text>
            <Text style={[InviteFriendsStyles.invitedUserDescription, InviteFriendsStyles.namePadding]}>{translate('events.invited')}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} source={Constants.Images.check} resizeMode='contain' style={[InviteFriendsStyles.pendingBtn]}>
            <Text style={InviteFriendsStyles.pending}>{translate('events.Pending')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

InvitedUser.propTypes = { t: func.isRequired };

export default withTranslation()(InvitedUser);
