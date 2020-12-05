import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Constants from '../../constants';
import { InviteFriendsStyles } from '../../styles';

export const InvitedUser = () => {
  const [checked, setCheck] = useState(false);

  return (
    <View activeOpacity={0.7} onPress={() => setCheck(!checked)} style={[InviteFriendsStyles.invitedUserContainer]}>
      <View style={[InviteFriendsStyles.userWrapper, InviteFriendsStyles.invitedUserWrapper]}>
        <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={[InviteFriendsStyles.userImage, InviteFriendsStyles.invitedUserImage]} />
        <View>
          <Text style={[InviteFriendsStyles.username, InviteFriendsStyles.padding]}>Shane Watson</Text>
          <Text style={[InviteFriendsStyles.location, InviteFriendsStyles.padding]}>You have invited to record the live stream</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} source={Constants.Images.check} resizeMode='contain' style={[InviteFriendsStyles.pendingBtn]}>
        <Text style={InviteFriendsStyles.pending}>Pending</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvitedUser;