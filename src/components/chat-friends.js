
import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import { InviteFriendsStyles } from '../styles';
import Constants from '../constants';
import { scale, } from 'react-native-size-matters';
export const ChatFriends = ({
  hasChats,
  navigation,
  type,
  data,
 nameObj
}) => (

  <TouchableOpacity activeOpacity={0.7} onPress={() => navigation('ChatOneToOne' ,{thread: data ,id:type === 'chat' ?nameObj['0'].id:data.group_id,userData:type === 'chat' ?nameObj:data,type:type,address: data.users['0'].name !=null && `${data.users['0'].name.split(" ")[0]} ,${data.users['1'].name.split(" ")[0]} and ${data.users.length} others`})} style={InviteFriendsStyles.container}>
    <View style={InviteFriendsStyles.userWrapper}>
      {type === 'chat' ? <Image source={ nameObj.length > 0 && nameObj['0'].pic=='N/A'? Constants.Images.profilePic:{ uri: nameObj.length > 0 && nameObj['0'].pic }} style={InviteFriendsStyles.userImage} />:
        <Image source={{ uri: data.group_pic } } style={InviteFriendsStyles.userImage} />}
      {type === 'chat' ? (
          <View>
            
            
            <Text style={InviteFriendsStyles.username}>{ nameObj.length >0 && nameObj['0'].name}</Text>
            <Text numberOfLines = {1} ellipsizeMode='tail' style={[InviteFriendsStyles.location,{maxWidth:scale(200)}]}>{nameObj.length >0 && nameObj['0'].address}</Text>
        </View>
      ) : (
        <View>
              <Text style={InviteFriendsStyles.username}>{data.gname}</Text>
       <Text style={InviteFriendsStyles.location}>{ data.users.length > 0 && `${data.users['0'].name.split(" ")[0]} ,${data.users['1'].name.split(" ")[0]} and ${data.users.length} others` }</Text>
        </View>
      )}
    </View>
   
      {/* <View style={InviteFriendsStyles.chatCount}>
        <Text style={InviteFriendsStyles.chatText}>1</Text>
      </View> */}
    

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
