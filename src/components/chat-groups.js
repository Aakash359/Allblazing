
import React from 'react';
import { bool, func, shape } from 'prop-types';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Constants from '../constants';
import { InviteFriendsStyles } from '../styles';

export const ChatGroup = ({
  hasChats,
  navigation,

}) => (
  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation('GroupDetail')} style={InviteFriendsStyles.container}>
    <View style={InviteFriendsStyles.userWrapper}>
      <Image source={Constants.Images.groupDetails} style={InviteFriendsStyles.userImage} />
      <View>
        <Text style={InviteFriendsStyles.username}>Super Nova</Text>
        <Text style={InviteFriendsStyles.location}>Mike,santee, watson and 38 others</Text>
      </View>
    </View>
    {hasChats && (
      <View style={InviteFriendsStyles.chatCount}>
        <Text style={InviteFriendsStyles.chatText}>1</Text>
      </View>
    )}

  </TouchableOpacity>
);

ChatGroup.propTypes = {
  hasChats: bool,
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
};

ChatGroup.defaultProps = { hasChats: true };

export default ChatGroup;
