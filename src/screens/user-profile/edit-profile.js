import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {CommonStyles, EditProfileStyles} from '../../styles';
import Constants from '../../constants';
import axios from 'axios';
import API from '../../constants/baseApi';
import {connect} from 'react-redux';
import {setProfileImage} from '../../reducers/baseServices/profile';
import {func, shape} from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import {withTranslation} from 'react-i18next';
import {getAuthToken} from '../../helpers/auth';
import ImageResizer from 'react-native-image-resizer';

class EditProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      upload: false,
      selectedImage: props?.image ?? '',
      Loading: false,
      IsLoadingImage: false,
    };
  }

  choosePhotosFromGallery = (imageIndex) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then((image) => {
      ImageResizer.createResizedImage(
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
        image.width / 2,
        image.height / 2,
        'JPEG',
        85,
      )
        .then(async ({ uri }) => {
          console.log("MYYURRL",uri)
          const token = await getAuthToken();
          const config = {
            headers: {Authorization: `Bearer ${token}`},
          };
          this.setState({
            IsLoadingImage: true,
          });
          const formdata = new FormData();
          formdata.append('image', {
            uri: uri,
            name: 'test.jpg',
            type: 'image/jpg',
          });
          axios
            .post(API.UPDATE_PROFILE, formdata, config)
            .then((response) => {
              if (response?.data?.code === 200) {
                this.props.addProfileImage(uri);
                this.setState({selectedImage: uri});

                Alert.alert('', response?.data?.message ?? '');
              } else {
                Alert.alert('', response?.data?.message ?? '');
              }
            })
            .catch((error) => {
              Alert.alert('', error?.response?.data ?? '');
            })
            .finally(() => {
              this.setState({
                IsLoadingImage: false,
              });
            });
          console.log('compressed Image true', image.height);
        })
        .catch((err) => {
          console.log('compressed Image false== ', err);
        });

      console.log('aaaaa', image.path, imageIndex);
    });
  };
  onNavigate = (route, title) => {
    const {full_name, age, gender, time, motto_description} = this.props;
    this.props.navigation.navigate(route, {
      full_name: full_name,
      age: age,
      motto_description: motto_description,
      gender: gender,
      time: time,
      isEditMode: true,
      title,
    });
  };

  render() {
    const {image, gender, full_name, age, time, motto_description} = this.props;
    return (
      <>
        <View style={CommonStyles.container}>
          <ScrollView>
            <ImageBackground
              source={
                this.state.selectedImage == 'N/A'
                  ? Constants.Images.profilePic
                  : {uri: this.state.selectedImage}
              }
              // source={{uri:image}}
              imageStyle={EditProfileStyles.borderStyle}
              style={EditProfileStyles.profileIcon}>
              <View style={EditProfileStyles.overlappingStyle}>
                <TouchableOpacity
                  onPress={() => this.choosePhotosFromGallery()}>
                  <Image
                    source={Constants.Images.edit}
                    resizeMode="contain"
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>

              {this.state.IsLoadingImage && (
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator color={'dark-gray'} />
                </View>
              )}
            </ImageBackground>

            <View style={EditProfileStyles.containerLikes}>
              <View style={EditProfileStyles.headerViewLike}>
              <View style={EditProfileStyles.flexDirection}>
              <Text
                    style={EditProfileStyles.headerQuestion}>
                    {'Name'}
                  </Text>
                <Text style={EditProfileStyles.headerTextLike}>
                  {full_name}
                </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.onNavigate('Username', 'Edit Name')}>
                  <Image
                    source={Constants.Images.edit}
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={EditProfileStyles.headerViewLike}>
              <View style={EditProfileStyles.flexDirection}>
              <Text
                    style={EditProfileStyles.headerQuestion}>
                    {'Age'}
                  </Text>
                <Text style={EditProfileStyles.headerTextLike}>{age}</Text>
                  </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.onNavigate('Userage', 'Edit Age')}>
                  <Image
                    source={Constants.Images.edit}
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={EditProfileStyles.headerViewLike}
                activeOpacity={0.7}>
                  <View style={EditProfileStyles.flexDirection}>
                  <Text
                    style={EditProfileStyles.headerQuestion}>
                    {'Gender'}
                  </Text>
                <Text style={EditProfileStyles.headerTextLike}>{gender}</Text>
                  </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.onNavigate('UserGender', 'Edit Gender')}>
                  <Image
                    source={Constants.Images.edit}
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={EditProfileStyles.headerViewLike}
                activeOpacity={0.7}>
                  <View style={EditProfileStyles.flexDirection}>
                  <Text
                    style={EditProfileStyles.headerQuestion}>
                    {'Your Address'}
                  </Text>
                <Text
                  numberOfLines={2}
                  style={[
                    EditProfileStyles.headerTextLike,
                    {...Constants.Fonts.Regular},
                  ]}>
                  {this.props.address}
                </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.onNavigate('EditLocation', 'Edit Location')
                  }>
                  <Image
                    source={Constants.Images.edit}
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={EditProfileStyles.headerViewLike}
                activeOpacity={0.7}>
                <View style={EditProfileStyles.flexDirection}>
                  <Text
                    numberOfLines={2}
                    style={EditProfileStyles.headerQuestion}>
                    {'What is your recent personal best time for 5km?'}
                  </Text>
                  <Text style={EditProfileStyles.headerTextLike}>{time}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.onNavigate('UserPersonalBest', 'Edit Personal Best')
                  }>
                  <Image
                    source={Constants.Images.edit}
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={EditProfileStyles.headerViewLike}>
              <View style={EditProfileStyles.flexDirection}>
              <Text
                    style={EditProfileStyles.headerQuestion}>
                    {'Your Motto'}
                  </Text>
                <Text
                  style={[
                    EditProfileStyles.headerTextLike,
                    {...Constants.Fonts.Regular},
                  ]}>
                  {motto_description}
                </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => this.onNavigate('UserMotto', 'Edit Motto', {motto: motto_description})}>
                  <Image
                    source={Constants.Images.edit}
                    style={EditProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

EditProfile.propTypes = {
  // loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({
  profile: {image, full_name, age, time, gender, motto_description, address},
  auth: {user_id},
}) => ({
  image,
  full_name,
  age,
  gender,
  time,
  motto_description,
  user_id,
  address
});

const mapDispatchToProps = {
  addProfileImage: (params) => setProfileImage(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(EditProfile));
