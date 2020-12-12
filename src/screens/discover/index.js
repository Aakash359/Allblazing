
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FollowersStyles, FeedStyles } from '../../styles';
import Constants from '../../constants';

const list = [{
  image: Constants.Images.user1, likeNumber: '500', name: 'Alex Carey', time: '4:30 AM',
},
{
  image: Constants.Images.user2, likeNumber: '500', name: 'Alex Carey', time: '4:30 AM',
},
{
  image: Constants.Images.user3, likeNumber: '500', name: 'Alex Carey', time: '4:30 AM',
},
{
  image: Constants.Images.user4, likeNumber: '500', name: 'Alex Carey', time: '4:30 AM',
},
{
  image: Constants.Images.user5, likeNumber: '500', name: 'Alex Carey', time: '4:30 AM',
},
{
  image: Constants.Images.user6, likeNumber: '500', name: 'Alex Carey', time: '4:30 AM',
}];

function FeedScreen() {
  const navigation = useNavigation();
  const [like, setLike] = useState(false);

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={[FollowersStyles.sectionView]}
        onPress={() => { navigation.navigate('FeedDetailScreen', { data: item }); }}
      >
        <View style={[FeedStyles.listView]}>
          <View style={FeedStyles.innerView}>
            <Image
              source={item.image}
              style={FeedStyles.userImage}
            />
            <View style={FeedStyles.nameView}>
              <Text style={FollowersStyles.nameText}>{item.name}</Text>
              <Text style={FollowersStyles.locationText}>{item.time}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={FeedStyles.heartView}
            onPress={() => { setLike(!like); navigation.navigate('FeedDetailScreen', { data: item }); }}
          >
            <Image
              source={like ? Constants.Images.selectedHeart : Constants.Images.heart}
              style={FeedStyles.heartIcon}
            />
            <Text style={FollowersStyles.nameText}>{item.likeNumber}</Text>
          </TouchableOpacity>

        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { setLike(!like); navigation.navigate('FeedDetailScreen', { data: item }); }}
      >
        <Image
          source={Constants.Images.feedImg}
          style={FeedStyles.feedImg}
        />
      </TouchableOpacity>
      {/* <View style={{
        height: 291, width: 343, backgroundColor: item.image, marginVertical: 20, marginHorizontal: 16
      }}
      /> */}
    </View>
  );

  const filterData = ({ item }) => (
    // <View style={}>
    <TouchableOpacity
      style={[FeedStyles.optionalSectionView]}
      // onPress={() => { setFilter(item); }}
    >
      <Image
        source={item.image}
        style={FeedStyles.userImage}
      />
      {/* <Text style={FeedStyles.optionalSection1}>{item.image}</Text> */}
    </TouchableOpacity>
    // </View>
  );

  return (
    <>
      <ScrollView style={FollowersStyles.container}>
        <FlatList
          data={list}
          contentContainerStyle={FeedStyles.sectionMainView}
          renderItem={filterData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `1-${index}`}
        />
        <FlatList
          // style={MyProfileStyles.sectionMainView}
          scrollEnabled={false}
          contentContainerStyle={FollowersStyles.flatList}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => `2-${index}`}
        />
      </ScrollView>

    </>
  );
}

export default FeedScreen;
