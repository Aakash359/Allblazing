import React from 'react';
import {ScrollView, View, Image, TouchableOpacity, Text} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {func, shape, string} from 'prop-types';
import {withTranslation} from 'react-i18next';
import {
  CommonStyles,
  AuthStyle,
  HomeStyles,
  InviteFriendsStyles,
} from '../../../styles';
import {InviteOptionPopup} from '../../../components';
import Constants from '../../../constants';

class InviteFriends extends React.Component {
  constructor(props) {
    super(props);

    this.state = {visible: false};
  }

  onStrava = () => {
    const {
      navigation: {navigate},
      source,
    } = this.props;

    this.setState({visible: false}, () => {
      navigate('StravaUsers', {
        hasCheckBox: true,
        routeName: source === 'home' ? 'Dashboard' : null,
        routePayload: source === 'home' ? {showRunners: true} : {},
      });
    });
  };

  render() {
    const {visible} = this.state;
    const {source, t: translate} = this.props;
    const Component = source === 'home' ? View : ScrollView;

    return (
      <>
        <Component>
          <Image
            resizeMode="contain"
            style={[
              InviteFriendsStyles.runners,
              source === 'home' && InviteFriendsStyles.homeRunners,
            ]}
            source={Constants.Images.runners}
          />
          <Text style={InviteFriendsStyles.description}>
            {translate('settings.InviteFriendsDescription')}
          </Text>
          <View style={InviteFriendsStyles.row}>
            <Text style={InviteFriendsStyles.code}>{'ALLBLAZING123456'}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => Clipboard.setString('ALLBLAZING123456')}>
              <Image
                resizeMode="contain"
                style={InviteFriendsStyles.copy}
                source={Constants.Images.copy}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              InviteFriendsStyles.button,
              InviteFriendsStyles.inviteBtn,
              source === 'home' && InviteFriendsStyles.homeInviteBtn,
            ]}
            onPress={() => this.setState({visible: true})}>
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('settings.Invite Friends')}
            </Text>
          </TouchableOpacity>
        </Component>
        {visible && (
          <InviteOptionPopup
            onFacebook={() => this.setState({visible: false})}
            onStrava={this.onStrava}
            onWhatsApp={() => this.setState({visible: false})}
            onClose={() => this.setState({visible: false})}
          />
        )}
      </>
    );
  }
}

InviteFriends.propTypes = {
  navigation: shape({
    navigate: func.isRequired,
    setParams: func.isRequired,
  }).isRequired,
  source: string,
  t: func.isRequired,
};

InviteFriends.defaultProps = {source: null};

export default withTranslation()(InviteFriends);
