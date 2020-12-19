import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonStyles, EditProfileStyles } from '../../styles';
import Constants from '../../constants';

function EditProfile() {
  const navigation = useNavigation();

  const onNavigate = (route, title) => {
    const params = {
      isEditMode: true, title,
    };

    navigation.navigate(route, params);
  };

  return (
    <>
      <ScrollView style={CommonStyles.container}>
        <ImageBackground
          source={Constants.Images.profilePic}
          imageStyle={EditProfileStyles.borderStyle}
          style={EditProfileStyles.profileIcon}
        >
          <View style={EditProfileStyles.overlappingStyle}>
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={Constants.Images.edit} resizeMode='contain' style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={EditProfileStyles.containerLikes}>
          <View style={EditProfileStyles.headerViewLike}>
            <Text style={EditProfileStyles.headerTextLike}>{'Kelly Norman'}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('Username', 'Edit name')}>
              <Image source={Constants.Images.edit} style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
          <View style={EditProfileStyles.headerViewLike}>
            <Text style={EditProfileStyles.headerTextLike}>{'25 Years'}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('Userage', 'Edit Age')}>
              <Image source={Constants.Images.edit} style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
          <View style={EditProfileStyles.headerViewLike} activeOpacity={0.7}>
            <Text style={EditProfileStyles.headerTextLike}>{'Gender'}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('UserGender', 'Edit Gender')}>
              <Image source={Constants.Images.edit} style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
          <View style={EditProfileStyles.headerViewLike} activeOpacity={0.7}>
            <Text numberOfLines={2} style={[EditProfileStyles.headerTextLike, { ...Constants.Fonts.Regular }]}>{'121 Dazzy Cir, Santee, SC 29142, United State'}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('EditLocation', 'Edit Location')}>
              <Image source={Constants.Images.edit} style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
          <View style={EditProfileStyles.headerViewLike} activeOpacity={0.7}>
            <View style={EditProfileStyles.flexDirection}>
              <Text numberOfLines={2} style={EditProfileStyles.headerQuestion}>{'What is your recent personal best time for 5km?'}</Text>
              <Text style={EditProfileStyles.headerTextLike}>{'23:45.08'}</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('UserPersonalBest', 'Edit Personal Best')}>
              <Image source={Constants.Images.edit} style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
          <View style={EditProfileStyles.headerViewLike}>
            <Text style={[EditProfileStyles.headerTextLike, { ...Constants.Fonts.Regular }]}>{'Problems are not stop signs, they are guidelines'}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onNavigate('UserMotto', 'Edit Motto')}>
              <Image source={Constants.Images.edit} style={EditProfileStyles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default EditProfile;
