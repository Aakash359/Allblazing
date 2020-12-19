/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyProfileStyles } from '../../styles';
import Constants from '../../constants';
import PBScreen from './pb-screen';
import LikeScreen from './like-screen';
import GoalScreen from './goals-screen';

function MyProfile() {
  const navigation = useNavigation();
  const [option, setOption] = useState('Goals');
  const optionList = ['Goals', 'PB\'s', 'Likes'];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[MyProfileStyles.sectionView, { backgroundColor: item === option ? Constants.Colors.GRAY : Constants.Colors.PRIMARY }]}
      onPress={() => { setOption(item); }}
    >
      <Text style={MyProfileStyles.section1}>{item}</Text>
    </TouchableOpacity>
  );

  const displayOptions = (data) => {
    if (data === 'Goals') {
      return <GoalScreen />;
    }
    if (data === 'PB\'s') {
      return <PBScreen />;
    }
    if (data === 'Likes') {
      return <LikeScreen />;
    }
  };

  return (
    <>
      <SafeAreaView style={MyProfileStyles.container}>
        <ScrollView>
          <TouchableOpacity activeOpacity={0.7}>
            <View>
              <ImageBackground
                source={Constants.Images.profilePic}
                // resizeMode='contain'
                imageStyle={MyProfileStyles.borderRadius}
                style={MyProfileStyles.profileIcon}
              >
                <View style={MyProfileStyles.levelStyle}>
                  <Text style={MyProfileStyles.levelText}>Level 1</Text>
                </View>
                <View style={MyProfileStyles.overlappingStyle}>
                  <View>
                    <Text style={MyProfileStyles.heading}>{'Cameron Williamson, 23'}</Text>
                    <Text style={MyProfileStyles.subHeading}>{'It always seems impossible until it`s done!'}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { navigation.navigate('EditProfile'); }}
                  >
                    <Image
                      source={Constants.Images.edit}
                      resizeMode='contain'
                      style={MyProfileStyles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <View style={MyProfileStyles.headerMainView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => { navigation.navigate('FollowersList'); }}
              style={MyProfileStyles.headerView}
            >
              <Text style={MyProfileStyles.section2}>{'48'}</Text>
              <Text style={MyProfileStyles.section1}>{'Followers'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => { navigation.navigate('FollowingList'); }}
              style={MyProfileStyles.headerView}
            >
              <Text style={MyProfileStyles.section2}>{'127'}</Text>
              <Text style={MyProfileStyles.section1}>{'Following'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={MyProfileStyles.headerView}>
              <Text style={MyProfileStyles.section2}>{'3K'}</Text>
              <Text style={MyProfileStyles.section1}>{'Posts'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate('ChatsGroup'); }} style={MyProfileStyles.headerViewEnd}>
              <Text style={MyProfileStyles.section2}>{'5'}</Text>
              <Text style={MyProfileStyles.section1}>{'Groups'}</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            // style={MyProfileStyles.sectionMainView}
            scrollEnabled={false}
            contentContainerStyle={MyProfileStyles.sectionMainView}
            data={optionList}
            renderItem={renderItem}
            keyExtractor={(id, index) => index.toString()}
          />
          {displayOptions(option)}
        </ScrollView>

      </SafeAreaView>
    </>
  );
}

export default MyProfile;
