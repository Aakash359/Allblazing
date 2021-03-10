import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
  Linking
} from 'react-native';
import { useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import {
  AuthStyle,
  UsernameStyle,
  CommonStyles,
  LocationStyles,
  OTPStyles,
  ConnectUserTypeStyles,
} from '../../styles';
import { StepBar } from '../../components';
import axios from 'axios';
import {
  getUserName,
  getUserAge,
  getUserConnectType,
  getUserDistance,
  getUserRecentTime,
  getOtpToken,
  setUserAddress,
  setUserLocation,
  getUserAddress,
  getUserLocation,
  getAuthToken,
} from '../../helpers/auth';
import API from '../../constants/baseApi';
import connect from 'react-redux/lib/connect/connect';
import { setProfileDetails } from '../../reducers/baseServices/profile';

import { ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import Axios from 'axios';
import Permissions, { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { times } from '../../data';

class Location extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      location: null,
      address: '',

    };
  }

  getAddress = async ({ latitude, longitude }, submit = false) => {
    console.log("GETTING ADDRESS");
    const GOOGLE_API_KEY = 'AIzaSyDu_SQanN6PpTQR3_6L2LA9fSro9xFseVA'
    let api = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
    console.log("API HIT", api);
    Axios.get(api).then(res => {
      console.log("GET DATA FROM LANG LONG", res?.data?.results[0]?.formatted_address);
      this.setState({ address: res?.data?.results[0]?.formatted_address }, async () => {
        setUserAddress(this.state.address)
          .then(a => {

            if (submit) this.onSubmit()
          })
      })
    })
      .catch(e => {
        console.log("DATE DATA FROM LANG LONG ERROR", e);
        // this.getLocation()
      })
  }

  getGeoLocation = async (submit = false) => {

    console.log("GETTING LOCATION");

    Geolocation.getCurrentPosition(position => {
      console.log("POSTION", position);
      this.setState({ location: position.coords }, () => {
        console.log(this.state.location);
        setUserLocation(position.coords)
        this.getAddress(position.coords, submit)
      })

    }, e => {
      console.log("POSITION ERROR", e.message);
    })
  }

  getLocation = async (submit = false) => {

    if (Platform.OS === 'ios') {
      const permissionStatus = await Permissions.check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      console.log("ISO LOCATION", permissionStatus);
      request(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(res => {
          console.log("PERMISSIN ASK IOS", res);
        })
      Geolocation.requestAuthorization();
      this.getGeoLocation(submit);
    } else {

      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'AllBlazing',
          'message': 'AllBlazing access to your location '
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("LOCATION ACCESS");
        this.getGeoLocation(submit)
      } else {
        Alert.alert('AllBalzing', 'Please allow location to go ahead', [
          {
            text: "Ok", onPress: () => {
              Linking.canOpenURL('app-settings:')
                .then(s => {
                  if (s) {
                    return Linking.openURL('app-settings:')
                  }
                  else {
                    Alert.alert('AllBlazing', 'Please open settings manually.')
                  }
                })
            }
          }
        ], { cancelable: false })
        console.log('Location permission not granted!!!!');
      }

    }
  }



  componentDidMount() {

    this.getLocation()
  }

  shouldComponentUpdate(props, state) {
    return state.location !== this.state.location
  }


  onSubmit = async () => {

    const { addUserProfileDetails } = this.props;
    const {
      navigation: { navigate, params },
    } = this.props;

    this.setState({
      isLoading: true,
    });

    // markwinz06@gmail.com/mark@1234
    const name = await getUserName();
    const Age = await getUserAge();
    const Type = await getUserConnectType();
    const Distance = await getUserDistance();
    const Time = await getUserRecentTime();
    const token = await getOtpToken() || await getAuthToken()
    const authToken = await getAuthToken()
    const address = await getUserAddress();
    const { latitude, longitude } = await getUserLocation();
    console.log("USER DETAILS: =====", name, Age, Type, Distance, Time, "Token", token, address, { latitude, longitude });
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(name, Age, Type, Distance, Time);
    // console.log(config);

    const payload = {
      full_name: name,
      age: Age,
      type: Type,
      distance: Type === 'train' ? '5km' : Distance,
      time: Time || times[0]?.value,
      latitude: latitude || 74.777899,
      longitude: longitude || 25.345678,
      level: 1,
      address: address || 'Select'
    }

    console.log("PAYLOAD===============>", payload);
    axios
      .post(
        API.COMPLETE_PROFILE,
        payload,
        config,
      )
      .then((response) => {
        console.log('response ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',

          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => authToken ? navigate('Overview') : navigate('Login'),
              },
            ],
            { Cancelable: false }
          );
          addUserProfileDetails(response?.data);
          console.log('res===>kkkkk' + JSON.stringify(response.data));
          // navigate('Login');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  render() {

    const {
      navigation: { goBack, navigate },
      route: { params },
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          style={[ConnectUserTypeStyles.wrapper, LocationStyles.container]}>
          <StepBar count={5} selected={[0, 1, 2, 3, 4]} />
          <View
            style={[UsernameStyle.inputWrapper, LocationStyles.inputWrapper]}>
            <Text style={[AuthStyle.selectText, LocationStyles.locationText]}>
              {translate('profile.TurnOnLocation')}
            </Text>
            <Text style={[AuthStyle.privcyText, OTPStyles.header]}>
              {translate('profile.TurnOnLocationDescription')}
            </Text>
          </View>
          <Image
            source={Constants.Images.location}
            resizeMode="contain"
            style={LocationStyles.logo}
          />
        </ScrollView>
        <View style={LocationStyles.buttonsWrapper}>
          <TouchableOpacity
            // activeOpacity={0.7}
            style={[
              AuthStyle.loginTouchable,
              { backgroundColor: Constants.Colors.TEXT_COLOR2 },
            ]}
            onPress={() => {
              this.getLocation(true)
            }
            }>
            <Text
              style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>
              {translate('profile.Share My Location')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // activeOpacity={0.7}
            style={[OTPStyles.button, LocationStyles.button]}
            // onPress={this.onSubmit}
            onPress={() => this.props.navigation.navigate('EditLocation', { signUpManual: true })}
          >
            {this.state.isLoading ? (
              <ActivityIndicator color="white" size={25} />
            ) : (
                <Text
                  style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>
                  {translate('profile.Select It Manually')}
                </Text>
              )}

          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Location.propTypes = { t: func.isRequired };
const mapStateToProps = ({ auth: { email } }) => ({
  email,
});

const mapDispatchToProps = {
  addUserProfileDetails: (params) => setProfileDetails(params),
  // loginSuccess: actions.loginSuccess,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Location));