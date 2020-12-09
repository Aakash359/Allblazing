import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { EditProfileStyles } from '../../styles';
// import ProfileUnlock from './myProfile';

import Constants from '../../constants';

function EditProfile() {
  // const navigation = useNavigation();

  return (
    <>
      <ScrollView>
        <ImageBackground
          source={Constants.Images.profilePic}
          // resizeMode='contain'
          imageStyle={EditProfileStyles.borderStyle}
          style={EditProfileStyles.profileIcon}
        >
          <View style={EditProfileStyles.overlappingStyle}>
            <TouchableOpacity>
              <Image
                source={Constants.Images.closeRound}
                resizeMode='contain'
                style={EditProfileStyles.icon}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={EditProfileStyles.containerLikes}>
          <View style={EditProfileStyles.headerViewLike}>
            <Text style={EditProfileStyles.headerTextLike}>{'Kelly Norman'}</Text>
            <Image
              source={Constants.Images.closeRound}
              style={EditProfileStyles.icon}
            />
          </View>

          <View style={EditProfileStyles.headerViewLike}>
            <Text style={EditProfileStyles.headerTextLike}>{'25 Years'}</Text>
            <Image
              source={Constants.Images.closeRound}
              style={EditProfileStyles.icon}
            />
          </View>
          <View style={EditProfileStyles.headerViewLike}>
            <Text style={EditProfileStyles.headerTextLike}>{'Gender'}</Text>
            <Image
              source={Constants.Images.closeRound}
              style={EditProfileStyles.icon}
            />
          </View>
          <View style={EditProfileStyles.headerViewLike}>
            <Text numberOfLines={2} style={[EditProfileStyles.headerTextLike, { ...Constants.Fonts.Regular }]}>{'121 Dazzy Cir, Santee, SC 29142, United State'}</Text>
            <Image
              source={Constants.Images.closeRound}
              style={EditProfileStyles.icon}
            />
          </View>
          <View style={EditProfileStyles.headerViewLike}>
            <View style={EditProfileStyles.flexDirection}>
              <Text numberOfLines={2} style={EditProfileStyles.headerQuestion}>{'What is your recent personal best time for 5km?'}</Text>
              <Text style={EditProfileStyles.headerTextLike}>{'23:45.08'}</Text>
            </View>
            <Image
              source={Constants.Images.closeRound}
              style={EditProfileStyles.icon}
            />
          </View>
          <View style={EditProfileStyles.headerViewLike}>
            <Text style={[EditProfileStyles.headerTextLike, { ...Constants.Fonts.Regular }]}>{'Problems are not stop signs, they are guidelines'}</Text>
            <Image
              source={Constants.Images.closeRound}
              style={EditProfileStyles.icon}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default EditProfile;
