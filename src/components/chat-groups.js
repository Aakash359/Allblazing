import React from 'react';
import {array, bool, func, shape, string} from 'prop-types';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import Constants from '../constants';
import {InviteFriendsStyles} from '../styles';

export const ChatGroup = ({
  hasChats,
  navigation,
  group,
  type

}) => { 

  const getMembers = () => {
    let members = group?.userInfo?.userData || []
    let nameMembers = members.filter(i => i?.full_name)
    let getThreeMembers = nameMembers.slice(0, nameMembers.length > 3 ? 3 : nameMembers.length).map(mem => mem?.full_name)
    let res = ''
    getThreeMembers.map(name => res += `${name.split(' ')[0]}, `)
    res = res.slice(0, -2) + ' '
    if(nameMembers.length) {
      if(members.length > 3){
      
        return res += `and ${members.length - getThreeMembers.length} others`
      }
      else
        return `${res}`
    }
    else {
      return members.length + ' others'
    }
  }

  const members = getMembers()

  // React.useEffect(() => {
  //   console.log(getMembers())
  // }, [group])
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation('GroupDetail',
        { groupId: group?.group_id, group, type })}
      style={[InviteFriendsStyles.container, {height: 80}]}
    >
    <View style={[InviteFriendsStyles.userWrapper, {maxWidth: '70%'}]}>
      <Image source={Constants.Images.groupDetails} style={InviteFriendsStyles.userImage} />
      <View >
        <Text style={InviteFriendsStyles.username}>{group?.name}</Text>
        <View >
        <Text numberOfLines={2} ellipsizeMode="tail" style={InviteFriendsStyles.location}>{members}</Text>
        </View>
      </View>
    </View>
    {hasChats && (
      <View style={InviteFriendsStyles.chatCount}>
        <Text style={InviteFriendsStyles.chatText}>{'1'}</Text>
      </View>
    )}
  </TouchableOpacity>
);
}

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
