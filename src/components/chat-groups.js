import React from 'react';
import {array, bool, func, shape, string} from 'prop-types';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import Constants from '../constants';
import {InviteFriendsStyles} from '../styles';

export const ChatGroup = ({
  hasChats,
  navigation,
  test,
  data,
  isMyGroupPage,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => navigation('GroupDetail', {data: data, checking:isMyGroupPage})}
    style={InviteFriendsStyles.container}>
    <View style={InviteFriendsStyles.userWrapper}>
      <Image
        source={
          data.post == 'N/A' ? Constants.Images.groupDetails : {uri: data.post}
        }
        style={InviteFriendsStyles.userImage}
      />
      <View>
        <Text style={InviteFriendsStyles.username}>{data.name}</Text>
        <Text style={InviteFriendsStyles.location}>{data.description}</Text>
      </View>
    </View>
    {hasChats && (
      <View style={InviteFriendsStyles.chatCount}>
        <Text style={InviteFriendsStyles.chatText}>{data.count}</Text>
      </View>
    )}
  </TouchableOpacity>
);

ChatGroup.propTypes = {
  hasChats: bool,
  test: string,
  data: array,
  isMyGroupPage: string,
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
};

ChatGroup.defaultProps = {hasChats: true};

export default ChatGroup;
