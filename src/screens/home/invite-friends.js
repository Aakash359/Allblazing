import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { AuthStyle, HomeStyles, InviteFriendsStyles } from '../../styles';
import { InviteFriend } from '../../components';
import Constants from '../../constants';

class InviteFriends extends React.Component {
  renderItem = () => <InviteFriend hasCheckBox />

  render() {
    return (
      <View style={HomeStyles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
        <TouchableOpacity activeOpacity={0.7} style={InviteFriendsStyles.button}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Send Invite'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default InviteFriends;
