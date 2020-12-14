
import React from 'react';
import { bool, func } from 'prop-types';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import { InviteFriendsStyles, ChatStyles } from '../styles';

export const GroupsInfo = ({
  hasAdmin,

  onPressButton,

}) => (
  <TouchableOpacity activeOpacity={0.7} style={InviteFriendsStyles.container}>
    <View style={InviteFriendsStyles.userWrapper}>
      <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={InviteFriendsStyles.userImage} />
      <View>
        <Text style={InviteFriendsStyles.username}>Shane Watson</Text>

      </View>
    </View>
    {!hasAdmin && (
      <TouchableOpacity activeOpacity={0.7} style={[ChatStyles.button, ChatStyles.acceptRejectBtn]} onPress={onPressButton}>
        <Text style={ChatStyles.buttonText}>Remove</Text>
      </TouchableOpacity>
    )}

  </TouchableOpacity>
);

GroupsInfo.propTypes = {
  hasAdmin: bool,

  onPressButton: func,

};

GroupsInfo.defaultProps = {
  hasAdmin: false, onPressButton: func,
};

export default GroupsInfo;
