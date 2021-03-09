
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

  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation('ChatOneToOne' ,{thread: data ,id:type === 'chat' ?nameObj['0'].id:data.group_id,userData:type === 'chat' ?nameObj:data,type:type,address: data.users['0'].name !=null && `${data.users['0'].name.split(" ")[0]} ,${data.users['1'].name} and ${data.users.length} others`})} style={InviteFriendsStyles.container}>
    <View style={InviteFriendsStyles.userWrapper}>
      <Image source={type === 'chat' ? { uri: nameObj.length >0 && nameObj['0'].pic } :type === 'groups'? { uri: data.group_pic } :Constants.Images.inviteUser1} style={InviteFriendsStyles.userImage} />
      {type === 'chat' ? (
          <View>
            
            
            <Text style={InviteFriendsStyles.username}>{ nameObj.length >0 && nameObj['0'].name}</Text>
            <Text style={InviteFriendsStyles.location}>{nameObj.length >0 && nameObj['0'].address}</Text>
        </View>
      ) : (
        <View>
              <Text style={InviteFriendsStyles.username}>{data.gname}</Text>
       <Text style={InviteFriendsStyles.location}>{ data.users.length > 0 && `${data.users['0'].name} ,${data.users['1'].name} and ${data.users.length} others` }</Text>
        </View>
      )}
    </View>
   
      <View style={InviteFriendsStyles.chatCount}>
        <Text style={InviteFriendsStyles.chatText}>1</Text>
      </View>
    

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
