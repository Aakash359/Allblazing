import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {bool, func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {InputField, StepBar} from '../../components';
import {AuthStyle, CommonStyles, UsernameStyle} from '../../styles';
import {setUserName} from '../../helpers/auth';
import axios from 'axios';
import API from '../../constants/baseApi';
import {connect} from 'react-redux';
import {setFullName} from '../../reducers/baseServices/profile';

class Username extends Component {
  constructor() {
    super();
    this.state = {name: ''};
  }

  NameStore = () => {
    if (this.state.name === '') {
      Alert.alert('', 'Please Enter Full Name', '');
    } else {
      setUserName(this.state.name);
      this.props.navigation.navigate('Userage');
    }
  };

  onSave = () => {
    const {addFullName} = this.props;
    const {
      navigation: {navigate},
    } = this.props;
    const {name} = this.state;

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    if (this.state.name === '') {
      Alert.alert('', 'Please Enter Full Name', '');
    } else {
      axios
        .post(
          API.UPDATE_PROFILE,
          {
            full_name: name,
          },
          config,
        )
        .then((response) => {
          if (response?.data?.code === 200) {
            Alert.alert('', response?.data?.message ?? '');
            addFullName(name);
            console.log('name:==>',name);
            navigate('EditProfile');
          }
        });
    }
  };

  render() {
    const {name} = this.state;
    const {
      navigation: {goBack, navigate},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={UsernameStyle.wrapper}>
            {!params?.isEditMode && <StepBar count={5} selected={[0]} />}
            <View style={UsernameStyle.inputWrapper}>
              {!params?.isEditMode && (
                <Text style={UsernameStyle.input}>
                  {translate('Your FullName?')}
                </Text>
              )}
              <InputField
                value={name}
                placeholder={translate('Full Name')}
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>
          </View>
        </ScrollView>
        <View style={UsernameStyle.buttonsWrapper}>
          {params?.isEditMode ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[AuthStyle.saveBtn, UsernameStyle.saveBtn]}
              onPress={() => this.onSave()}
              // onPress={() => goBack()}
            >
              <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {translate('Save')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={UsernameStyle.buttons}>
              <TouchableOpacity
                style={[
                  AuthStyle.introButton,
                  {backgroundColor: Constants.Colors.TRANSPARENT},
                ]}
                activeOpacity={0.7}
                onPress={() => goBack()}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Back')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={AuthStyle.introButton}
                activeOpacity={0.7}
                onPress={() => this.NameStore()}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Next')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
Username.propTypes = {
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
  addFullName: (params) => setFullName(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Username));
