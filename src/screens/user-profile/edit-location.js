import React, {Component} from 'react';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Constants from '../../constants';
import {
  AuthStyle,
  CommonStyles,
  LocationStyles,
  UsernameStyle,
} from '../../styles';
import connect from 'react-redux/lib/connect/connect';
import { setAddress, setLocation } from '../../reducers/baseServices/profile';
import { GOOGLE_API_KEY } from '../../config/config';
import Colors from '../../constants/colors';
import API from '../../constants/baseApi';
import Axios from 'axios';
import { getAuthToken } from '../../helpers/auth';

class EditLocation extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      cordination:null,
      Loading: false,
    };
  }
  onChangeText = () => {};
  onSave = async () => {
    const {addLocation} = this.props;
    const {
      navigation: {navigate},
    } = this.props;
    const {Location} = this.state;

    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    this.setState({
      Loading: true,
    });

    axios
      .post(
        API.UPDATE_PROFILE,
        {
          Location: Location,
        },
        config,
      )
      .then((response) => {
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
                onPress: () => navigate('EditProfile'),
              },
            ],
            {Cancelable: false},
          );
          addLocation(Location);
          console.log('Location:==>', Location);
          // navigate('EditProfile');
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };

  componentDidMount(){
    Geocoder.init('AIzaSyDu_SQanN6PpTQR3_6L2LA9fSro9xFseVA');
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
       this.getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            this.getOneTimeLocation();
          } else {
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }
  //  getOneTimeLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     position => {
  //       const currentLongitude = JSON.stringify(position.coords.longitude);

  //       const currentLatitude = JSON.stringify(position.coords.latitude);
  //       console.log('lat====', position.coords.latitude);
        
  //       this.setState({cordination:{lat: currentLatitude ,lon: currentLongitude}});

  //       Geocoder.from(currentLatitude, currentLatitude)
  //         .then(json => {
  //           var addressComponent = json.results[0].address_components;
  //           const fullAddress = addressComponent
  //             .map(item => item?.long_name)
  //             .join(', ');
  //           // refAutoComplate.current?.setAddressText(fullAddress);

  //           // List({
  //           //   lat: currentLatitude,
  //           //   lon: currentLongitude,
  //           // });
  //           console.log('addressComponent == ', addressComponent);
  //         })
  //         .catch(error => console.warn(error));
  //     },
  //     error => {
  //       console.log('error = ', error);
  //     },
  //   );
  // };

  

  // getLatLongFromAdd = async (description = '') => {
  //   Geocoder.from(description)
  //     .then((json) => {
  //       var location = json.results[0].geometry.location;
  //       this.setState({cordination:{lat: location.lat,
  //         lon: location.lng,}})
  //     })
  //     .catch((error) => console.log('error====', error));
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  setAddress = async () => {
    console.log();
    const {address} = this.state
    const {addAddress} =  this.props
    const {
      navigation: {navigate},
    } = this.props;


    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    this.setState({
      Loading: true,
    });
    if (this.state.address === '') {
      Alert.alert('', 'Please Select Address', '');
    } else {
      Axios
        .post(
          API.UPDATE_PROFILE,
          {
            address,
          },
          config,
        )
        .then((response) => {
          console.log("Address UPDATE", response);
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
            addAddress(address);
            console.log('ADDRESS:==>', address);
            // navigate('EditProfile');
          }
        }).catch(e => {
          console.log("ADDRESS UPDATE ERROR", e);
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
        })
        .finally(() => {
          this.setState({
            Loading: false,
          });
        });
    }
  }

  render() {
    const {
      navigation: {goBack},
      t: translate,
    } = this.props;
    

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={UsernameStyle.wrapper}>
            <View style={UsernameStyle.inputWrapper}>
              {/* <View
                // activeOpacity={1}
                // style={[UsernameStyle.ageButton, LocationStyles.location]}
                > */}
                {/* <Image
                  source={Constants.Images.myLocation}
                  style={LocationStyles.locationIcon}
                /> */}
                {/* <Text style={LocationStyles.currentLocationText}>
                  {'Santee, United States'}
                </Text> */}

                <GooglePlacesAutocomplete
                  styles={{container: {flex: 1,width: '88%', alignItems: 'center'}, textInputContainer: {flexDirection: 'row', width: '100%'},
                  // textInput: {
                  //   color: Colors.WHITE,
                  //   backgroundColor: Colors.LIGHT_BLACK
                  // },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  }
                }}
                 placeholder='Search'
                 placeholderColor="#fff"
                 onPress={(data, details = null) => {
                   // 'details' is provided when fetchDetails = true
                   console.log(data, details);
                   this.setState({address: data.description})
                 }}
                 
                 query={{
                   key:  GOOGLE_API_KEY,
                   language: 'en',
                 }}
               />

              {/* </View> */}
              {/* <Text style={LocationStyles.orText}>{'or'}</Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[UsernameStyle.ageButton, LocationStyles.margin]}>
                <Text style={UsernameStyle.age}>{'United State'}</Text>
                <AntIcon name="down" size={25} color="#5EC2CA" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[UsernameStyle.ageButton, LocationStyles.margin]}>
                <Text style={UsernameStyle.age}>{'Santee'}</Text>
                <AntIcon name="down" size={25} color="#5EC2CA" />
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[AuthStyle.saveBtn, LocationStyles.saveBtn]}
          onPress={this.setAddress}>
          <Text style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
            {translate('Save')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

EditLocation.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

// export default withTranslation()(EditLocation);

const mapStateToProps = ({auth: {email}}) => ({
  email,
});

const mapDispatchToProps = {
  addLocation: (params) => setLocation(params),
  addAddress: (address) => setAddress(address)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(EditLocation));
