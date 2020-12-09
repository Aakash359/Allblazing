import React from 'react';
import { View, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { SectionStyles } from '../../styles';
// import ProfileUnlock from './myProfile';
// import Constants from '../../constants';

function LikeScreen() {
  // const navigation = useNavigation();

  return (
    <>
      <View style={SectionStyles.containerLikes}>
        <View style={SectionStyles.headerViewLike}>
          <Text style={SectionStyles.headerTextLike}>{'3K'}</Text>
          <Text style={SectionStyles.subHeaderTextLike}>{'Total Posts'}</Text>
        </View>
        <View style={SectionStyles.headerViewLike}>
          <Text style={SectionStyles.headerTextLike}>{'5.7K'}</Text>
          <Text style={SectionStyles.subHeaderTextLike}>{'Total Likes'}</Text>
        </View>
      </View>
    </>
  );
}

export default LikeScreen;
