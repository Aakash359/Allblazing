import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { func, shape } from 'prop-types';
import { LogoutPopup, SettingItem } from '../../components';
import { CommonStyles } from '../../styles';
import * as actions from '../../actions/user-action-types';

const settingList = [{
  hasArrow: false,
  label: 'Notifications',
  payload: {},
  route: 'Notifications',
},
{
  label: 'Change Language',
  payload: {},
  route: 'ChangeLanguage',
},
{
  label: 'Change Password',
  payload: {},
  route: 'ChangePassword',
},
{
  label: 'Invite Friends',
  payload: {
    hasCheckBox: true, title: 'Invite Friends',
  },
  route: 'InviteFriends',
},
{
  label: 'Contact Us',
  payload: { title: 'Contact Us' },
  route: 'ContactUS',
},
{
  label: 'About Us',
  payload: { title: 'About Us' },
  route: 'StaticContent',
},
{
  label: 'Safety Policy',
  payload: { title: 'Safety Policy' },
  route: 'StaticContent',
},
{
  label: 'Privacy Policy',
  payload: { title: 'Privacy Policy' },
  route: 'StaticContent',
},
{
  label: 'Terms & Conditions',
  payload: { title: 'Terms & Conditions' },
  route: 'StaticContent',
},
{
  label: 'Logout',
  payload: {},
  route: 'logout',
}];

class Settings extends Component {
  timer = null;
  constructor(props) {
    super(props);

    this.state = { logoutPopup: false };
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onPress = (data) => {
    const { navigation: { navigate } } = this.props;

    if (data.label === 'Logout') {
      this.setState({ logoutPopup: true });

      return;
    }

    navigate(data.route, data.payload);
  };

  onLogout = () => {
    const {
      logoutSuccess, navigation: { navigate },
    } = this.props;

    this.setState({ logoutPopup: false }, () => {
      logoutSuccess();

      this.timer = setTimeout(() => navigate('Login'), 500);
    });
  };

  render() {
    const { logoutPopup } = this.state;

    return (
      <View style={CommonStyles.container}>
        <FlatList
          data={settingList}
          renderItem={({ item }) => <SettingItem {...item} onPress={() => this.onPress(item)} />}
          keyExtractor={(item, index) => `${index}`}
        />
        { logoutPopup && (
          <LogoutPopup
            onLogout={this.onLogout}
            onCancel={() => this.setState({ logoutPopup: false })}
          />
        )}
      </View>
    );
  }
}

Settings.propTypes = {
  logoutSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
};

export default connect(null, { logoutSuccess: actions.logoutSuccess })(Settings);
