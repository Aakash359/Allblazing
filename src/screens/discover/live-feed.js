import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { LiveFeedStyles } from '../../styles';
import Constants from '../../constants';
import { PermisionPopup } from '../../components';

function LiveFeed() {
  const [like, setLike] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [message, setMessage] = useState('');

  const comment = [
    {
      image: Constants.Images.user1, message: 'Hello!', name: 'Cassey -',
    },
    {
      image: Constants.Images.user2, message: 'Hello!', name: 'Clark -',
    },
    {
      image: Constants.Images.user3, message: 'Hello!', name: 'Alex -',
    },
    {
      image: Constants.Images.user4, message: 'Hello!', name: 'Jordan -',
    },
    {
      image: Constants.Images.user5, message: 'Hello!', name: 'Mike -',
    },
    {
      image: Constants.Images.user6, message: 'Hello!', name: 'Carey -',
    },
  ];
  const renderItem = ({ item }) => (
    <View style={LiveFeedStyles.commentView}>
      <Image
        source={item.image}
        style={LiveFeedStyles.commentImage}
      />
      <View style={LiveFeedStyles.nameView}>
        <Text style={LiveFeedStyles.nameText}>{item.name}</Text>
        <Text style={LiveFeedStyles.commentText}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[LiveFeedStyles.container]}>
      <ScrollView>
        <View>
          <ImageBackground
            source={Constants.Images.liveImg}
            style={LiveFeedStyles.profileIcon}
          >
            <Image
              source={Constants.Images.liveLogo}
              resizeMode='contain'
              style={LiveFeedStyles.liveLogo}
            />
            <View style={LiveFeedStyles.overlappingStyle}>
              <View style={LiveFeedStyles.flexRow}>
                <View style={LiveFeedStyles.levelStyle}>
                  <Text style={LiveFeedStyles.liveText}>Live</Text>
                </View>
                <Text style={LiveFeedStyles.followerView}>{'187 Viewers'}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {}}
              >
                <Image
                  source={Constants.Images.rotatePhone}
                  resizeMode='contain'
                  style={LiveFeedStyles.icon}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={LiveFeedStyles.sectionMainView}>
          <View style={LiveFeedStyles.flexRow}>
            <Image
              source={Constants.Images.user1}
              style={LiveFeedStyles.liveUserIcone}
            />
            <View style={LiveFeedStyles.sectionView}>
              <Text style={LiveFeedStyles.heading}>{'Cameron Williamson, 23'}</Text>
              <Text style={LiveFeedStyles.subHeading}>{'text'}</Text>
            </View>
          </View>
          <View style={LiveFeedStyles.sectionView}>
            <View style={LiveFeedStyles.heartView}>
              <TouchableOpacity
                onPress={() => { setLike(!like); }}
              >
                <Image
                  source={like ? Constants.Images.selectedHeart : Constants.Images.heart}
                  style={LiveFeedStyles.heartIcon}
                />
              </TouchableOpacity>
              <Text style={LiveFeedStyles.followText}>{'500'}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={LiveFeedStyles.commentHeader}>{'Comments'}</Text>
        </View>
        <FlatList
          data={comment}
          renderItem={renderItem}
        />
      </ScrollView>
      <View style={LiveFeedStyles.searchView}>
        <TextInput
          placeholder="Write your message..."
          placeholderTextColor={Constants.Colors.GREY_BORDER}
          value={message}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setMessage(text);
          }}
          style={LiveFeedStyles.groupName}
        />
        <Image
          source={Constants.Images.send}
          style={LiveFeedStyles.messageIcon}
        />
      </View>
      { showPopup && (
        <PermisionPopup
          onLogout={() => setShowPopup(!showPopup)}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </SafeAreaView>
  );
}

export default LiveFeed;
