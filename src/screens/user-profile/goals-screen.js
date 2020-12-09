import React from 'react';
import { View, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { SectionStyles } from '../../styles';
// import ProfileUnlock from './myProfile';

import Constants from '../../constants';
// import profileStyles from '../../styles/profile-styles';

function GoalScreen() {
  return (
    <>
      <View>
        <ScrollView style={SectionStyles.container}>
          <Image
            source={Constants.Images.goal1}
            style={SectionStyles.inputStyle}
          />
          <Image
            source={Constants.Images.goal2}
            style={SectionStyles.inputStyle}
          />
          <Image
            source={Constants.Images.goal3}
            style={SectionStyles.inputStyle}
          />
        </ScrollView>

      </View>
    </>
  );
}

export default GoalScreen;
