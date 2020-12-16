
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FollowersStyles, FeedDetailStyles } from '../../styles';
import Constants from '../../constants';

function FeedDetailScreen() {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);

  const list = [
    {
      image: Constants.Images.user1, likeNumber: '500', name: 'Alex Carey', time: '4:30 am',
    },
  ];
  const renderItem = ({ item }) => (
    <View>
      <View style={[FeedDetailStyles.listView]}>
        <View style={FeedDetailStyles.innerView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Image
              source={Constants.Images.arrowLeft}
              style={FeedDetailStyles.arrowLeft}
            />
          </TouchableOpacity>
          <Image
            source={item.image}
            style={FeedDetailStyles.userImage}
          />
          <View style={FeedDetailStyles.nameView}>
            <Text style={FollowersStyles.nameText}>{item.name}</Text>
            <Text style={FollowersStyles.locationText}>{item.time}</Text>
          </View>
        </View>
        <View style={FeedDetailStyles.heartView}>
          <TouchableOpacity
            onPress={() => { setLike(!like); }}
          >
            <Image
              source={like ? Constants.Images.selectedHeart : Constants.Images.heart}
              style={FeedDetailStyles.heartIcon}
            />
          </TouchableOpacity>
          <Text style={FollowersStyles.nameText}>{item.likeNumber}</Text>
        </View>
      </View>
      <Image
        source={Constants.Images.feedDetailImage}
        style={FeedDetailStyles.feedImg}
      />
    </View>
  );

  return (
    <>
      <ScrollView style={FeedDetailStyles.container}>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={FeedDetailStyles.flatList}
          data={list}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
}

export default FeedDetailScreen;
