import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { func, shape, string } from 'prop-types';
import { AuthStyle, HomeStyles, InviteFriendsStyles } from '../../../styles';
import { InviteOptionPopup } from '../../../components';
import Constants from '../../../constants';

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  onStrava = () => {
    const {
      navigation: { navigate }, source,
    } = this.props;

    this.setState({ visible: false }, () => {
      navigate('StravaUsers', {
        hasCheckBox: true,
        routeName: source === 'home' ? 'Dashboard' : null,
        routePayload: source === 'home' ? { showRunners: true } : {},
      });
    });
  };

  render() {
    const { visible } = this.state;
    const { source } = this.props;

    return (
      <View style={HomeStyles.container}>
        <View style={HomeStyles.wrapper}>
          <Image resizeMode='contain' style={[InviteFriendsStyles.runners, source === 'home' && InviteFriendsStyles.homeRunners]} source={Constants.Images.runners} />
          <Text style={InviteFriendsStyles.description}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}</Text>
          <View style={InviteFriendsStyles.row}>
            <Text style={InviteFriendsStyles.code}>{'ALLBLAZING123456'}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => Clipboard.setString('ALLBLAZING123456')}>
              <Image resizeMode='contain' style={InviteFriendsStyles.copy} source={Constants.Images.copy} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[InviteFriendsStyles.button, InviteFriendsStyles.inviteBtn, source === 'home' && InviteFriendsStyles.homeInviteBtn]}
            onPress={() => this.setState({ visible: true })}
          >
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Invite Friends'}</Text>
          </TouchableOpacity>
        </View>
        {visible && (
          <InviteOptionPopup
            onFacebook={() => {}}
            onStrava={this.onStrava}
            onWhatsApp={() => {}}
          />
        )}
      </View>
    );
  }
}

InviteFriends.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  source: string,
};

InviteFriends.defaultProps = { source: null };

export default InviteFriends;
