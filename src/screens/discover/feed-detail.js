
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation,useRoute} from '@react-navigation/native';
import { FollowersStyles, FeedDetailStyles } from '../../styles';
import Constants from '../../constants';
import moment from 'moment';


function FeedDetailScreen({route}) {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);
  const { authername, likecount, post,Time,likeStatus} = route.params;



  const list = [
    {
      image: Constants.Images.user1
    },
  ];
  const renderItem = ({ item }) => (
    <View>
      <View style={[FeedDetailStyles.listView]}>
        <View style={FeedDetailStyles.innerView}>
          <TouchableOpacity
            activeOpacity={0.7}
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
            <Text style={FollowersStyles.nameText}>{authername}</Text>
            <Text style={FollowersStyles.locationText}>{moment(Time).format('LT')}</Text>
          </View>
        </View>
        <View style={FeedDetailStyles.heartView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => { setLike(!like); }}
          >
            <Image
              source={likeStatus > 0 ? Constants.Images.selectedHeart : Constants.Images.heart}
              style={FeedDetailStyles.heartIcon}
            />
          </TouchableOpacity>
          <Text style={FollowersStyles.nameText}>{likecount}</Text>
        </View>
      </View>
      <Image
        source={{ uri: post }}
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
