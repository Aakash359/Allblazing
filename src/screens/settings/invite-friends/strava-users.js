import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { func, shape, string } from 'prop-types';
import { withTranslation } from 'react-i18next';
import { CommonActions } from '@react-navigation/native';
import { AuthStyle, HomeStyles, InviteFriendsStyles } from '../../../styles';
import { InviteFriend, SuccessPopup } from '../../../components';
import Constants from '../../../constants';

class StravaUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  renderItem = ({ item }) => {
    const { route: { params } } = this.props;

    return <InviteFriend hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} image={item} />;
  }

  onSend = () => {
    const {
      navigation,
      navigation: {
        goBack, navigate,
      }, route: { params },
    } = this.props;

    this.setState({ visible: false }, () => {
      if (params?.routeName) {
        const payload = params.routePayload || {};

        if (params.routeName === 'Dashboard') {
          const options = {
            index: 0,
            routes: [{ name: 'Dashboard' }],
          };
          const action = CommonActions.reset(options);

          navigation.dispatch(action);
        } else {
          navigate(params.routeName, {
            ...payload, isInviteSent: true,
          });
        }
      } else {
        goBack();
      }
    });
  };

  render() {
    const { visible } = this.state;
    const { t } = this.props;

    return (
      <View style={HomeStyles.container}>
        <FlatList
          data={[Constants.Images.inviteUser2, Constants.Images.inviteUser1, Constants.Images.inviteUser3]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
        <TouchableOpacity activeOpacity={0.7} style={InviteFriendsStyles.button} onPress={() => this.setState({ visible: true })}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Send Invite'}</Text>
        </TouchableOpacity>
        <SuccessPopup
          hasResendBtn={false}
          instructions={`${t('settings.Invite send successfully')}`}
          visible={visible}
          onClick={this.onSend}
        />
      </View>
    );
  }
}

StravaUsers.propTypes = {
  navigation: shape({
    navigate: func.isRequired,
    setParams: func.isRequired,
  }).isRequired,
  route: shape({ params: shape({ routeName: string }) }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(StravaUsers);
