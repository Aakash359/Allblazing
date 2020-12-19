import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreatePostStyles } from '../../styles';
import Constants from '../../constants';

function CreatePost() {
  const navigation = useNavigation();
  const [upload, setUpload] = useState(false);

  return (
    <SafeAreaView style={CreatePostStyles.container}>
      <View style={CreatePostStyles.userView}>
        <Image
          source={Constants.Images.user}
          style={CreatePostStyles.userIcon}
        />
        <Text style={CreatePostStyles.imageText}>Kelly Norman</Text>
      </View>
      {upload ? (
        <View>
          <Image
            source={Constants.Images.postImage}
            style={CreatePostStyles.postImage}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setUpload(false)}
            style={CreatePostStyles.closeIconView}
          >
            <Image
              source={Constants.Images.closeRound}
              style={CreatePostStyles.closeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AddMember')}
            style={CreatePostStyles.nextView}
          >
            <Text style={CreatePostStyles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      )
        : (
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setUpload(true)}
              style={CreatePostStyles.optionView}
            >
              <View style={CreatePostStyles.optionIconView}>
                <Image
                  source={Constants.Images.camera}
                  style={CreatePostStyles.optionIcon}
                />
              </View>
              <Text style={CreatePostStyles.imageText}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setUpload(true)}
              style={CreatePostStyles.optionView}
            >
              <View style={CreatePostStyles.optionIconView}>
                <Image
                  source={Constants.Images.imageGallery}
                  style={CreatePostStyles.optionIcon}
                />
              </View>
              <Text style={CreatePostStyles.imageText}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  );
}

export default CreatePost;
