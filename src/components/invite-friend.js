import { bool, node } from 'prop-types';
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Constants from '../constants';
import { InviteFriendsStyles } from '../styles';

export const InviteFriend = ({
  hasCheckBox, hasTick, image,
}) => {
  const [checked, setCheck] = useState(false);

  return (
    <View style={InviteFriendsStyles.container}>
      <View style={InviteFriendsStyles.userWrapper}>
        <Image source={image} style={InviteFriendsStyles.userImage} />
        <View>
          <Text style={InviteFriendsStyles.username}>Shane Watson</Text>
          <Text style={InviteFriendsStyles.location}>Santee, United States</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.9} onPress={() => setCheck(!checked)}>
        {hasCheckBox && <Image source={checked ? Constants.Images.checkbox : Constants.Images.checkoff} resizeMode='contain' style={InviteFriendsStyles.icon} />}
        {hasTick && checked && <Image source={Constants.Images.check} resizeMode='contain' style={InviteFriendsStyles.icon} />}
      </TouchableOpacity>
    </View>
  );
};

InviteFriend.propTypes = {
  hasCheckBox: bool, hasTick: bool, image: node.isRequired,
};

InviteFriend.defaultProps = {
  hasCheckBox: false, hasTick: false,
};

export default InviteFriend;
