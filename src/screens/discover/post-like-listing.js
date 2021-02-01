import React, {useState,useEffect,useCallback} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FollowersStyles, FeedStyles, EditProfileStyles} from '../../styles';
import Constants from '../../constants';
import API from '../../constants/baseApi';
import Axios from 'axios';
import { setPostId } from '../../helpers/auth';

// const list = [
//   {
//     image: Constants.Images.user1,
//     likeNumber: '500',
//     name: 'Alex Carey',
//     time: '4:30 am',
//   },
//   {
//     image: Constants.Images.user2,
//     likeNumber: '500',
//     name: 'Alex Carey',
//     time: '4:30 am',
//   },
//   {
//     image: Constants.Images.user3,
//     likeNumber: '500',
//     name: 'Alex Carey',
//     time: '4:30 am',
//   },
//   {
//     image: Constants.Images.user4,
//     likeNumber: '500',
//     name: 'Alex Carey',
//     time: '4:30 am',
//   },
//   {
//     image: Constants.Images.user5,
//     likeNumber: '500',
//     name: 'Alex Carey',
//     time: '4:30 am',
//   },
//   {
//     image: Constants.Images.user6,
//     likeNumber: '500',
//     name: 'Alex Carey',
//     time: '4:30 am',
//   },
// ];

function PostLikeListing() {
  
  const navigation = useNavigation();
  const [like, setLike] = useState(true);
  const [list,setList]=useState([]);
  
  
  useEffect(() => {
    _fetchPost();
  }, []);
  const _fetchPost = useCallback(async () => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    Axios.get(API.POSTS, config).then((response) => {
      if (response.data.data.result) {
        setList(response.data.data.result);
      }
      console.log('name====>'+ JSON.stringify(response.data.data.result));
      // console.log('res===>' + JSON.stringify(response.data.data.result));
    });
  }, []);
  
  const _Like = async(item) => {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    console.log('==>',item.id);
    console.log('tokens==>',token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    // console.log(config);
    Axios
    .post(API.LIKE, {
        post_id:item.id,
        type:item.likeStatus > 0 ? 'unliked': 'liked',
      },config)
      .then((response) => {
        console.log('data===>',response.data);
      })
      .finally(() => {});
  }

  const renderItem = ({item}) => (

    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('FeedDetailScreen',{authername:item.autherName,likecount:item.likeCount,post:item.post,Time:item.created_at,likeStatus:item.likeStatus});
        }}>
        <ImageBackground
          imageStyle={FeedStyles.borderStyle}
          source={{ uri: item.post }}
          style={FeedStyles.feedImg1}>
          <View style={FeedStyles.overlappingStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={FeedStyles.heartView}
              onPress={() => _Like(item)}
              // onPress={() => {
              //   setLike(!like);
              // }}
              >
              <Image
                source={
                  item.likeStatus > 0 ? Constants.Images.selectedHeart : Constants.Images.heart
                }
                style={FeedStyles.heartIcon}
              />
              <Text style={FollowersStyles.nameText}>{item.likeCount}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ScrollView style={FollowersStyles.container}>
        <FlatList
          numColumns={2}
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

export default PostLikeListing;