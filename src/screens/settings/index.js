import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { func, shape } from 'prop-types';
import { LogoutPopup, SettingItem } from '../../components';
import { CommonStyles } from '../../styles';
import * as actions from '../../actions/user-action-types';

const settingList = [{
  hasArrow: false,
  label: 'settings.Notifications',
  payload: {},
  route: 'Notifications',
},
{
  label: 'settings.Change Language',
  payload: {},
  route: 'ChangeLanguage',
},
{
  label: 'settings.Change Password',
  payload: {},
  route: 'ChangePassword',
},
{
  label: 'settings.Invite Friends',
  payload: {
    hasCheckBox: true, title: 'settings.Invite Friends',
  },
  route: 'InviteFriends',
},
{
  label: 'settings.Contact Us',
  payload: { title: 'settings.Contact Us' },
  route: 'ContactUS',
},
{
  label: 'settings.About Us',
  payload: { title: 'settings.About Us' },
  route: 'StaticContent',
},
{
  label: 'settings.Safety Policy',
  payload: { title: 'settings.Safety Policy' },
  route: 'StaticContent',
},
{
  label: 'settings.Privacy Policy',
  payload: { title: 'settings.Privacy Policy' },
  route: 'StaticContent',
},
{
  label: 'settings.Terms & Conditions',
  payload: { title: 'settings.Terms & Conditions' },
  route: 'StaticContent',
},
{
  label: 'settings.Logout',
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

    if (data.route === 'logout') {
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
