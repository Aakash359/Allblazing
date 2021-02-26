
import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import { InviteFriendsStyles } from '../styles';
import Constants from '../constants';

export const ChatFriends = ({
  hasChats,
  navigation,
  type,
  data,
 nameObj
}) => (

  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation('ChatOneToOne' ,{thread: data ,id:nameObj['0'].id,userData:nameObj})} style={InviteFriendsStyles.container}>
    <View style={InviteFriendsStyles.userWrapper}>
      <Image source={type === 'chat' ? { uri: nameObj.length >0 && nameObj['0'].pic } : Constants.Images.inviteUser1} style={InviteFriendsStyles.userImage} />
      {type === 'chat' ? (
          <View>
            
            
            <Text style={InviteFriendsStyles.username}>{ nameObj.length >0 && nameObj['0'].name}</Text>
            <Text style={InviteFriendsStyles.location}>{nameObj.length >0 && nameObj['0'].address}</Text>
        </View>
      ) : (
        <View>
          <Text style={InviteFriendsStyles.username}>Super Nova</Text>
          <Text style={InviteFriendsStyles.location}>Santee,Max,Jennie and 10 Others</Text>
        </View>
      )}
    </View>
    {hasChats && (
      <View style={InviteFriendsStyles.chatCount}>
        <Text style={InviteFriendsStyles.chatText}>1</Text>
      </View>
    )}

  </TouchableOpacity>
);

ChatFriends.propTypes = {
  hasChats: bool,

  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  type: string,
};

ChatFriends.defaultProps = {
  hasChats: true, type: '',
};

export default ChatFriends;
