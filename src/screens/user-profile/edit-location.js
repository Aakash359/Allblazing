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
import {setLocation} from '../../reducers/baseServices/profile';
import {getAuthToken} from '../../helpers/auth';
import axios from 'axios';
import API from '../../constants/baseApi';

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
              <View
                style={{
                  flexDirection: 'row',
                  width: '90%',
                  backgroundColor: '#252525',
                  borderRadius: 8,
                }}>
                <TouchableOpacity
                  style={{
                    width: '10%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Constants.Images.myLocation}
                    style={LocationStyles.locationIcon}
                  />
                </TouchableOpacity>
                <View style={{width: '90%'}}>
                  <GooglePlacesAutocomplete
                  // ref={refAutoComplate}
                    currentLocationLabel={true}
                    placeholder="Santee, United States"
                    query={{
                      key: 'AIzaSyDu_SQanN6PpTQR3_6L2LA9fSro9xFseVA',
                      language: 'en',
                    }}
                    onPress={(data, details = null) => {
                      // this.getLatLongFromAdd(data?.description);
                      console.log('data==>', details);
                      this.setState({location:(data?.description)});
                      console.log('===>',data?.description);

                    }}
                    onFail={(error) => console.error('fail===>', error)}
                    styles={{
                      textInputContainer: {
                        width: '100%',
                      },
                      textInput: {
                        alignItems: 'center',
                        backgroundColor: Constants.Colors.SECONDARY_COLOR,
                        borderRadius: 8,
                        height: 50,
                        justifyContent: 'space-between',
                        width: '100%',
                        color: 'white',
                        fontSize: 16,
                      },
                      predefinedPlacesDescription: {
                        color: 'red',
                      },
                    }}
                  />
                </View>
              </View>
              <Text style={LocationStyles.orText}>{'or'}</Text>
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
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[AuthStyle.saveBtn, LocationStyles.saveBtn]}
          onPress={() => this.onSave()}>
          {this.state.Loading ? (
            <ActivityIndicator size={25} color="white" />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(EditLocation));
