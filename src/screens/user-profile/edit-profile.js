import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CommonStyles, EditProfileStyles} from '../../styles';
import Constants from '../../constants';
import axios from 'axios';
import API from '../../constants/baseApi';
import {connect} from 'react-redux';
import {setProfileDetails} from '../../reducers/baseServices/profile';
import {func, shape} from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import {withTranslation} from 'react-i18next';
import {getAuthToken} from '../../helpers/auth';
import {Small} from '../../constants/fonts';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      upload: false,
      selectedImage: '',
      Loading: false,
    };
  }

  componentDidMount() {
    this.getProfileDetails();
  }

  getProfileDetails = async () => {
    const {addProfileDetail} = this.props;

    const {user_id} = this.props;
    console.log('userid==>', user_id);

    const token = await getAuthToken();
    console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    this.setState({
      Loading: true,
    });
    axios
      .post(
        API.PROFILE_DETAILS,
        {
          user_id: user_id,
        },
        config,
      )
      .then((response) => {
        addProfileDetail(response?.data?.data?.result);
        console.log('res===>' + JSON.stringify(response.data.data.result));
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };
  choosePhotosFromGallery = (imageIndex) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then((image) => {
      // setUpload(true);
      this.setState({upload: true});
      // setSelectedImage(image.path);
      this.setState({selectedImage: image.path});
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
    const {
      image,
      gender,
      full_name,
      age,
      time,
      motto_description,
      selectedImage,
    } = this.props;
    return (
      <>
        <View style={CommonStyles.container}>
          {this.state.Loading ? (
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <ActivityIndicator color="white" size={25} />
            </View>
          ) : (
            <ScrollView>
              {this.state.upload ? (
                <ImageBackground
                  source={{uri: this.state.selectedImage}}
                  // source={{uri: this.state.selectedImage}}
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
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={Constants.Images.profilePic}
                  // source={{uri: this.state.selectedImage}}
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
                </ImageBackground>
              )}

              <View style={EditProfileStyles.containerLikes}>
                <View style={EditProfileStyles.headerViewLike}>
                  <Text style={EditProfileStyles.headerTextLike}>
                    {full_name}
                  </Text>
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
                  <Text style={EditProfileStyles.headerTextLike}>{age}</Text>

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
                  <Text style={EditProfileStyles.headerTextLike}>{gender}</Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      this.onNavigate('UserGender', 'Edit Gender')
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
                  <Text
                    numberOfLines={2}
                    style={[
                      EditProfileStyles.headerTextLike,
                      {...Constants.Fonts.Regular},
                    ]}>
                    {'121 Dazzy Cir, Santee, SC 29142, United State'}
                  </Text>

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
                  <Text
                    style={[
                      EditProfileStyles.headerTextLike,
                      {...Constants.Fonts.Regular},
                    ]}>
                    {motto_description}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.onNavigate('UserMotto', 'Edit Motto')}>
                    <Image
                      source={Constants.Images.edit}
                      style={EditProfileStyles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
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
  profile: {image, full_name, age, time, gender, motto_description},
  auth: {user_id},
}) => ({
  image,
  full_name,
  age,
  gender,
  time,
  motto_description,
  user_id,
});

const mapDispatchToProps = {
  addProfileDetail: (params) => setProfileDetails(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(EditProfile));
