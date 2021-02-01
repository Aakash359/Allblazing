import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {MapViewStyles, RunnersStyles} from '../../styles';
import Constants from '../../constants';
import Map from '../events/map-view';

function Runners() {
  const navigation = useNavigation();
  const route = useRoute();

  return route?.params?.isMapView ? (
    <Map
      showEvents={false}
      style={MapViewStyles.map}
      onMarkerPress={() => {}}
      onEventPress={() => {}}
    />
  ) : (
    <View style={RunnersStyles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('UserProfile')}
        style={RunnersStyles.mainView}>
        <View>
          <ImageBackground
            source={Constants.Images.profilePic}
            imageStyle={RunnersStyles.borderStyle}
            style={RunnersStyles.profileIcon}>
            <View style={RunnersStyles.levelStyle}>
              <Text style={RunnersStyles.levelText}>Level 1</Text>
            </View>
          </ImageBackground>
        </View>
        <Text style={RunnersStyles.heading}>{'Cameron Williamson, 23'}</Text>
        <Text style={RunnersStyles.subHeading}>
          It always seems impossible until it&#39;s done
        </Text>
        <View style={RunnersStyles.sectionMainView}>
          <View style={RunnersStyles.sectionView}>
            <Text style={RunnersStyles.section1}>{'PB (5km)'}</Text>
            <Text style={RunnersStyles.section2}>{'14:26.52'}</Text>
          </View>
          <View style={RunnersStyles.sectionView}>
            <Text style={RunnersStyles.section1}>{'Total distance'}</Text>
            <Text style={RunnersStyles.section2}>{'200km'}</Text>
          </View>
          <View style={RunnersStyles.sectionView}>
            <Text style={RunnersStyles.section1}>{'Wins'}</Text>
            <Text style={RunnersStyles.section2}>{'23/30'}</Text>
          </View>
        </View>
        <View style={RunnersStyles.iconView}>
          <Image
            source={Constants.Images.closeRound}
            resizeMode="contain"
            style={RunnersStyles.icon}
          />
          <Image
            source={Constants.Images.chat}
            resizeMode="contain"
            style={RunnersStyles.icon}
          />
          <Image
            source={Constants.Images.addFriend}
            resizeMode="contain"
            style={RunnersStyles.icon}
          />
        </View>
      </TouchableOpacity>
      <View style={RunnersStyles.endView} />
    </View>
  );
}

export default Runners;
