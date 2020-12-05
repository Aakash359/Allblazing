import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { AuthStyle, HomeStyles, InviteFriendsStyles } from '../../styles';
import { InviteFriend } from '../../components';
import Constants from '../../constants';

class InviteFriends extends React.Component {
  renderItem = () => {
    const { route: { params } } = this.props;

    return <InviteFriend hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} />;
  }

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={HomeStyles.container}>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
        <TouchableOpacity activeOpacity={0.7} style={InviteFriendsStyles.button} onPress={() => navigate('SingleEventDetail', { isInviteSent: true })}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Send Invite'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

InviteFriends.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isMapView: bool }) }).isRequired,
};

export default InviteFriends;
