import React, {Component} from 'react';
import {Platform, ScrollView, View, TouchableOpacity, Text,Alert, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withTranslation} from 'react-i18next';
import {bool, func, shape} from 'prop-types';
import {
  AuthStyle,
  CommonStyles,
  ConnectUserTypeStyles,
  DistanceStyles,
  Repeat5KStyles,
} from '../../styles';
import {StepBar} from '../../components';
import Constants from '../../constants';
import {times} from '../../data';
import {getAuthToken, setUserRecentTime} from '../../helpers/auth';
import API from '../../constants/baseApi';
import axios from 'axios';
import connect from 'react-redux/lib/connect/connect';
import { setTime } from '../../reducers/baseServices/profile';

class UserPersonalBest extends Component {
  constructor() {
    super();
    this.state = {time: 0,Loading:false};
  }
  TimeStore = () => {
    if (this.state.time === 0) {
      Alert.alert('', 'Please select  recent time', '');
    } else {
      setUserRecentTime(this.state.time);
      this.setState({time:0})
      this.props.navigation.navigate('Location', {type: 'train'});
    }
  };
 

  onSave = async() => {
    const {addTime} = this.props;
    const {
      navigation: {navigate},
    } = this.props;
    const {time} = this.state;

    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    this.setState({
      Loading: true,
    });
    console.log('==>',time);
    if (this.state.time === '') {
      Alert.alert('', 'Please select your age', '');
    } else {
      axios
        .post(
          API.UPDATE_PROFILE,
          {
            time: time,
          },
          config,
        )
        .then((response) => {
          if (response?.data?.code === 200) {
            Alert.alert('', response?.data?.message ?? '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('EditProfile'),
              },
            ],
            {Cancelable:false}
            );
            addTime(time);
            console.log('time:==>',time);
            // navigate('EditProfile');
          }
        }).finally(() => {
          this.setState({
            Loading: false,
          });
        });
    }
  };
  onTypeChange = (payload) => this.setState({time: payload});
  componentDidMount(){
    const time = this.props.route?.params?.time ?? '';
      console.log('time==>',time);
      this.setState({time: time})
  }
  render() {
    const {time} = this.state;
    const {
      navigation: {goBack, navigate},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={ConnectUserTypeStyles.wrapper}>
            {!params?.isEditMode && (
              <StepBar count={5} selected={[0, 1, 2, 3]} />
            )}
            <View style={ConnectUserTypeStyles.inputWrapper}>
              {!params?.isEditMode && (
                <Text
                  style={[ConnectUserTypeStyles.input, Repeat5KStyles.header]}>
                  {translate('profile.PersonalBest')}
                </Text>
              )}
              {times.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[
                    ConnectUserTypeStyles.button,
                    DistanceStyles.button,
                    {backgroundColor: t.color},
                  ]}
                  activeOpacity={0.7}
                  onPress={() => this.onTypeChange(t.value)}>
                  <Text
                    style={[
                      Repeat5KStyles.buttonText,
                      DistanceStyles.buttonText,
                      time === t.value && Repeat5KStyles.active,
                    ]}>
                    {translate(t.label)}
                  </Text>
                  {time === t.value && (
                    <Ionicons
                      name="checkmark-sharp"
                      size={25}
                      color={Constants.Colors.BLACK}
                      style={[AuthStyle.checkImg, DistanceStyles.select]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        {params?.isEditMode ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={[AuthStyle.saveBtn, Repeat5KStyles.saveBtn]}
            onPress={() => this.onSave()}>
              {this.state.Loading ? (
                <ActivityIndicator colo="white" size={25}/>
              ):(<Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {translate('Save')}
              </Text>)}
            
          </TouchableOpacity>
        ) : (
          <View style={Repeat5KStyles.buttonsWrapper}>
            <View
              style={[ConnectUserTypeStyles.buttons, Repeat5KStyles.buttons]}>
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
                onPress={() => this.TimeStore()}
                // onPress={() => navigate('Distance')}
              >
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Next')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

UserPersonalBest.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({params: shape({isEditMode: bool})}).isRequired,
  t: func.isRequired,
};

// export default withTranslation()(UserPersonalBest);


const mapStateToProps = ({auth: {email}}) => ({
  email,
});

const mapDispatchToProps = {
  addTime: (params) => setTime(params),
  // loginSuccess: actions.loginSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(UserPersonalBest));
