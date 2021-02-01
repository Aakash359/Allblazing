import React, { Component } from 'react';
import { Platform, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { withTranslation } from 'react-i18next';
import { func, shape } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, MottoStyles, RegisterStyle, UsernameStyle } from '../../styles';
import connect from 'react-redux/lib/connect/connect';
import { setMottoDescription } from '../../reducers/baseServices/profile';
import API from '../../constants/baseApi';
import axios from 'axios';
import { Alert } from 'react-native';


class UserMotto extends Component {
  constructor() {
    super();
    this.state = { motto: '' };
  }

  onChangeText = (motto) => {
    this.setState({ motto });
  }
  onSave = () => {
    const {addMottoDescription} = this.props;
    const {
      navigation: {navigate},
    } = this.props;
    const {motto} = this.state;

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    if (this.state.motto === '') {
      Alert.alert('', 'Please enter Description', '');
    } else {
      axios
        .post(
          API.UPDATE_PROFILE,
          {
            motto_description: motto,
          },
          config,
        )
        .then((response) => {
          if (response?.data?.code === 200) {
            Alert.alert('', response?.data?.message ?? '');
            addMottoDescription(motto);
            console.log('age:==>',motto);
            navigate('EditProfile');
          }
        });
    }
  };
  render() {
    const { motto } = this.state;
    const {
      navigation: { goBack }, t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={UsernameStyle.wrapper}>
            <View style={UsernameStyle.inputWrapper}>
              <View style={CommonStyles.textAreaWrapper}>
                <TextInput
                  multiline
                  maxLength={60}
                  numberOfLines={15}
                  style={CommonStyles.textArea}
                  placeholder={translate('profile.Motto')}
                  value={motto}
                  onChangeText={this.onChangeText}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
              </View>
              <Text style={RegisterStyle.mottoCount}>{`${motto.length}/60`}</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, MottoStyles.saveBtn]} onPress={() => this.onSave()}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Save')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// UserMotto.propTypes = {
//   navigation: shape({
//     dispatch: func.isRequired,
//     goBack: func.isRequired,
//   }).isRequired,
//   t: func.isRequired,
// };

// export default withTranslation()(UserMotto);

UserMotto.propTypes = {
  // loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({auth: {email}}) => ({
  email,
});

const mapDispatchToProps = {
  addMottoDescription: (params) => setMottoDescription(params),
  // loginSuccess: actions.loginSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(UserMotto));