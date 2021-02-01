import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
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

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      selectedImage : '',
      upload : false,
    };

  }

  onNavigate = (route, title) => {
    this.props.navigation.navigate(route, {
      isEditMode: true,
      title,
    });
  };

  componentDidMount() {
    this.getProfileDetails();
  }

  getProfileDetails = async () => {
    const {addProfileDetail} = this.props;

    const {user_id} = this.props;

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    // console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

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
      this.setState({upload:true});
      this.setState({selectedImage:image.path});
      // setSelectedImage(image.path);

      console.log(image.path, imageIndex);
    });
  };


  render() {
    const {image, full_name, age, time, motto_description,selectedImage} = this.props;
    return (
      <>
        <ScrollView style={CommonStyles.container}>
          <ImageBackground
            source={Constants.Images.profilePic}
            // source={{uri:selectedImage}}
            imageStyle={EditProfileStyles.borderStyle}
            style={EditProfileStyles.profileIcon}>
            <View style={EditProfileStyles.overlappingStyle}>
              <TouchableOpacity onPress={()=> this.choosePhotosFromGallery()}>
                <Image
                  source={Constants.Images.edit}
                  resizeMode="contain"
                  style={EditProfileStyles.icon}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={EditProfileStyles.containerLikes}>
            <View style={EditProfileStyles.headerViewLike}>
              <Text style={EditProfileStyles.headerTextLike}>{full_name}</Text>
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
            <View style={EditProfileStyles.headerViewLike} activeOpacity={0.7}>
              <Text style={EditProfileStyles.headerTextLike}>{'Gender'}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.onNavigate('UserGender', 'Edit Gender')}>
                <Image
                  source={Constants.Images.edit}
                  style={EditProfileStyles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={EditProfileStyles.headerViewLike} activeOpacity={0.7}>
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
            <View style={EditProfileStyles.headerViewLike} activeOpacity={0.7}>
              <View style={EditProfileStyles.flexDirection}>
                <Text
                  numberOfLines={2}
                  style={EditProfileStyles.headerQuestion}>
                  {'What is your recent personal best time for 5km?'}
                </Text>
                <Text style={EditProfileStyles.headerTextLike}>
                  {time}
                </Text>
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
      </>
    );
  }
}

EditProfile.propTypes = {
  loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({
  profile: {image, full_name, age, time, motto_description},
  auth: {user_id},
}) => ({
  image,
  full_name,
  age,
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