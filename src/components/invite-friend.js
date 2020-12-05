import { bool } from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Constants from '../constants';
import { InviteFriendsStyles } from '../styles';

export const InviteFriend = ({
  hasCheckBox, hasTick,
}) => {
  const [checked, setCheck] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setCheck(!checked)} style={InviteFriendsStyles.container}>
      <View style={InviteFriendsStyles.userWrapper}>
        <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={InviteFriendsStyles.userImage} />
        <View>
          <Text style={InviteFriendsStyles.username}>Shane Watson</Text>
          <Text style={InviteFriendsStyles.location}>Santee, United States</Text>
        </View>
      </View>
      {hasCheckBox && <Image source={checked ? Constants.Images.checkbox : Constants.Images.checkoff} resizeMode='contain' style={InviteFriendsStyles.icon} />}
      {hasTick && checked && <Image source={Constants.Images.check} resizeMode='contain' style={InviteFriendsStyles.icon} />}
    </TouchableOpacity>
  );
};

InviteFriend.propTypes = {
  hasCheckBox: bool, hasTick: bool,
};

InviteFriend.defaultProps = {
  hasCheckBox: false, hasTick: false,
};

export default InviteFriend;
