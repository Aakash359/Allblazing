import React, {Component} from 'react';
import {ScrollView, Image, View, TouchableOpacity, Text} from 'react-native';
import {withTranslation} from 'react-i18next';
import {func, shape} from 'prop-types';
import Constants from '../../constants';
import {
  AuthStyle,
  CommonStyles,
  GenderStyles,
  UsernameStyle,
} from '../../styles';
import connect from 'react-redux/lib/connect/connect';
import axios from 'axios';
import API from '../../constants/baseApi';
import {ActivityIndicator} from 'react-native';
import { getAuthToken } from '../../helpers/auth';

const genders = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

class UserGender extends Component {
  constructor() {
    super();
    this.state = {
      gender: null,
      Loading: false,
    };
  }

  onChange = (gender) => {
    this.setState({gender});
  };
  onSave = async() => {
    const {addGender} = this.props;
    const {
      navigation: {navigate},
    } = this.props;
    const {gender} = this.state;

    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    this.setState({
      Loading: true,
    });
    if (this.state.gender === '') {
      Alert.alert('', 'Please Select your Gender', '');
    } else {
      axios
        .post(
          API.UPDATE_PROFILE,
          {
            age: gender,
          },
          config,
        )
        .then((response) => {
          if (response?.data?.code === 200) {
            Alert.alert('', response?.data?.message ?? '',
            [
              {
                text: 'Cancle',
                onPress: () => console.log('cancle pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('EditProfile'),
              },
            ],
            {cancelable:false}
            );
            addGender(age);
            console.log('gender:==>', gender);
            // navigate('EditProfile');
          }
        })
        .finally(() => {
          this.setState({
            Loading: false,
          });
        });
    }
  };
  render() {
    const {gender} = this.state;
    const {
      navigation: {goBack},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView>
          <View style={UsernameStyle.wrapper}>
            <View style={UsernameStyle.inputWrapper}>
              {genders.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[
                    AuthStyle.loginTouchable,
                    AuthStyle.loginTouchableRow,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => this.onChange(t.value)}>
                  <Text style={AuthStyle.buttonText}>{'     '}</Text>
                  <Text
                    style={[
                      AuthStyle.buttonLanguageText,
                      gender === t.value ? AuthStyle.buttonActiveText : {},
                    ]}>
                    {translate(t.label)}
                  </Text>
                  {gender === t.value ? (
                    <Image
                      source={Constants.Images.check}
                      resizeMode="contain"
                      style={AuthStyle.checkImg}
                    />
                  ) : (
                    <Text style={AuthStyle.checkImg}>{}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[AuthStyle.saveBtn, GenderStyles.saveBtn]}
          onPress={() => this.onSave()}>
          {this.state.Loading ? (
            <ActivityIndicator color="white" size={25}/>
          ) : (
            <Text
              style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
              {translate('Save')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

// UserGender.propTypes = {
//   navigation: shape({
//     dispatch: func.isRequired,
//     goBack: func.isRequired,
//   }).isRequired,
//   t: func.isRequired,
// };

// export default withTranslation()(UserGender);
UserGender.propTypes = {
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
  addGender: (params) => setGender(params),
  // loginSuccess: actions.loginSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(UserGender));
