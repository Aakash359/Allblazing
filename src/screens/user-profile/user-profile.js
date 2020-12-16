/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProfileStyles } from '../../styles';
// import ProfileUnlock from './myProfile';
// import PBScreen from './USERPbScreen';
// import LikeScreen from './userLikeScreen';
import UserGoalScreen from './user-goals';
import Constants from '../../constants';
import { MoreOptionsPopup } from '../../components';
import profileStyles from '../../styles/profile-styles';

function UserProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const [followStatus, setFollowStatus] = useState(false);

  const [option, setOption] = useState('Goals');
  const optionList = ['Goals', 'PB\'s', 'Likes'];

  const displayOptions = (data) => {
    if (data === 'Goals') {
      return <UserGoalScreen />;
    }
    if (data === 'PB\'s') {
      // return <PBScreen />;
    }
    if (data === 'Likes') {
      // return <LikeScreen />;
    }
  };

  const renderItem = ({ item }) => (
    // <View style={}>
    <TouchableOpacity
      style={[ProfileStyles.optionalSectionView, { backgroundColor: item === option ? Constants.Colors.GRAY : Constants.Colors.PRIMARY }]}
      onPress={() => { setOption(item); }}
    >
      <Text style={ProfileStyles.optionalSection1}>{item}</Text>
    </TouchableOpacity>
    // </View>
  );

  return (
    <View style={ProfileStyles.container}>
      {/* <View style={ProfileStyles.mainView}> */}
      <View>
        <TouchableOpacity>
          <View>
            <ImageBackground
              source={Constants.Images.profilePic}
              // resizeMode='contain'
              imageStyle={ProfileStyles.borderRadius}
              style={ProfileStyles.profileIcon}
            >
              <View style={ProfileStyles.levelStyle}>
                <Text style={ProfileStyles.levelText}>Level 1</Text>
              </View>
              <View style={profileStyles.overlappingStyle}>
                <View>
                  <Text style={ProfileStyles.heading}>{'Cameron Williamson, 23'}</Text>
                  <Text style={ProfileStyles.subHeading}>{'It always seems impossible until it`s done!'}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyProfile')}
                >
                  <Image
                    source={Constants.Images.chat}
                    resizeMode='contain'
                    style={ProfileStyles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFollowStatus(!followStatus)}
                >
                  <Image
                    source={Constants.Images.add}
                    resizeMode='contain'
                    style={ProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <View style={ProfileStyles.sectionMainView}>
          <View style={ProfileStyles.sectionView}>
            <Text style={ProfileStyles.section2}>{'48'}</Text>
            <Text style={ProfileStyles.section1}>{'Followers'}</Text>
          </View>
          <View style={ProfileStyles.sectionView}>
            <Text style={ProfileStyles.section2}>{'127'}</Text>
            <Text style={ProfileStyles.section1}>{'Following'}</Text>
          </View>
          <View style={ProfileStyles.sectionView}>
            <Text style={ProfileStyles.section2}>{'3K'}</Text>
            <Text style={ProfileStyles.section1}>{'Posts'}</Text>
          </View>
          <View style={ProfileStyles.sectionViewEnd}>
            <Text style={ProfileStyles.section2}>{'5'}</Text>
            <Text style={ProfileStyles.section1}>{'Groups'}</Text>
          </View>
        </View>
        {followStatus ? (
          <View>
            <FlatList
            // style={MyProfileStyles.sectionMainView}
              scrollEnabled={false}
              contentContainerStyle={ProfileStyles.sectionMainView}
              data={optionList}
              renderItem={renderItem}
              keyExtractor={(id, index) => index.toString()}
            />
            {displayOptions(option)}
          </View>
        ) : (
          <View style={ProfileStyles.iconView}>
            <Image
              source={Constants.Images.lockProfile}
              resizeMode='contain'
              style={ProfileStyles.lockedIcon}
            />
            <Text style={ProfileStyles.bottomHeader}>{'Private Account'}</Text>
            <Text style={ProfileStyles.bottomHeader2}>{'Follow this account to see photos and videos'}</Text>
          </View>
        )}
      </View>
      {route?.params?.visible && (
        <MoreOptionsPopup
          hasUnFollowBtn={false}
          visible={route?.params?.visible}
          onBlock={() => {
            navigation.setParams({ visible: false });
            navigation.navigate('BlockReportUser', { isBlockPage: true });
          }}
          onReport={() => {
            navigation.setParams({ visible: false });
            navigation.navigate('BlockReportUser', { isBlockPage: false });
          }}
        />
      )}
    </View>
  );
}

export default UserProfile;
