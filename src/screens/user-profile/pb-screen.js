import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { SectionStyles } from '../../styles';
// import ProfileUnlock from './myProfile';
import Constants from '../../constants';

function PBScreen() {
  // const navigation = useNavigation();

  return (
    <>
      <ScrollView style={SectionStyles.containerPB}>
        {/* <View> */}
        <View style={SectionStyles.headerViewPB}>
          <Text style={SectionStyles.headerText}>{'200m'}</Text>
          <Text style={SectionStyles.headerText}>{'Add Time'}</Text>
        </View>
        <View style={SectionStyles.liveView}>
          <Image
            source={Constants.Images.videoIcon}
            style={SectionStyles.videoIcon}
          />
        </View>
        {/* </View> */}
      </ScrollView>
      <ScrollView style={SectionStyles.containerPB}>
        {/* <View> */}
        <View style={SectionStyles.headerViewPB}>
          <Text style={SectionStyles.headerText}>{'200m'}</Text>
          <Text style={SectionStyles.headerText}>{'Add Time'}</Text>
        </View>
        <View style={SectionStyles.liveView}>
          <Image
            source={Constants.Images.videoIcon}
            style={SectionStyles.videoIcon}
          />
        </View>
        {/* </View> */}
      </ScrollView>
    </>
  );
}

export default PBScreen;
