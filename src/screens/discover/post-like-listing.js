import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FollowersStyles, FeedStyles, EditProfileStyles} from '../../styles';
import Constants from '../../constants';
import API from '../../constants/baseApi';
import Axios from 'axios';
import {getAuthToken, setPostId} from '../../helpers/auth';
import {func, shape} from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';

class PostLikeListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      like: true,
      list: [],
    };
    const {
      navigation: {goBack, navigate, getParam, isLoading},
      route: {params},
      t: translate,
    } = this.props;
  }

  changeHeader = () => {
    this.props.navigation.setOptions({
      headerTitle: `Posts ${this.props.route.params.postCount}`
    })
  }

  componentDidMount() {
    this._fetchPost();
    this.changeHeader()
  }

  _fetchPost = async() => {
    const token = await getAuthToken();
    const { user_id } = this.props
    const {userId} = this.props.route.params
    console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
      params: {id: userId || user_id}
    };
    this.setState({
      isLoading: true,
    });
    Axios.get(API.POSTS, config)
      .then((response) => {
        if (response.data.data.result) {
          this.setState({list: response.data.data.result});
        }
        console.log('name====>' + JSON.stringify(response.data.data.result));
        // console.log('res===>' + JSON.stringify(response.data.data.result));
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  _Like = async (item) => {
    const token = await getAuthToken();
    console.log('==>', item.id);
    console.log('tokens==>', token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(config);

    let newList = this.state.list.map(el => (
      el.id === item.id ? { ...el, likeStatus: item.likeStatus > 0 ? 0 : 1, likeCount: item.likeStatus > 0 ? item.likeCount - 1 : item.likeCount + 1}  : el
    ))
    this.setState({list: newList});

    Axios.post(
      API.LIKE,
      {
        post_id: item.id,
        type: item.likeStatus > 0 ? 'unliked' : 'liked',
      },
      config,
    )
      .then((response) => {
        console.log('data===>', response.data);
      })
      .finally(() => {});
  };

  renderItem = ({item}) => (
    <View>
      {this.state.isLoading ? (
        <ActivityIndicator color="white" size={25}/>
       ) : (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          this.props.navigation.navigate('FeedDetailScreen', {data: item});
        }}>
        <ImageBackground
          imageStyle={FeedStyles.borderStyle}
          source={{uri: item.post}}
          style={FeedStyles.feedImg1}>
          <View style={FeedStyles.overlappingStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={FeedStyles.heartView}
              onPress={() => this._Like(item)}
              // onPress={() => {
              //   setLike(!like);
              // }}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            >
              <Image
                source={
                  item.likeStatus > 0
                    ? Constants.Images.selectedHeart
                    : Constants.Images.heart
                }
                style={FeedStyles.heartIcon}
              />
              <Text style={FollowersStyles.nameText}>{item.likeCount}</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      )}
      
    </View>
  );

  ListEmptyComponent = () => {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Text style={{color: '#fff'}} >You didn't post anything.</Text>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('CreatePost')} ><Text style={{color: '#fff'}}>Please click here to post</Text></TouchableOpacity> */}
      </View>
    )
  }

  render() {
    const {isLoading} = this.state;

    const {
      navigation: {goBack, navigate, getParam},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <>
        <View style={FollowersStyles.container}>
          {isLoading ? (
            <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator color="white" size={25}/>
            </View>
          ) : (
            <FlatList
              numColumns={2}
              // style={MyProfileStyles.sectionMainView}
              scrollEnabled={true}
              contentContainerStyle={FollowersStyles.flatList}
              data={this.state.list}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `2-${index}`}
              ListEmptyComponent={this.ListEmptyComponent}
              // ListFooterComponent={this.ListEmptyComponent}
            />
          )}
        </View>
      </>
    );
  }
}

// export default PostLikeListing;

PostLikeListing.propTypes = {
  loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({profile: {user_id}}) => {
  return {
    user_id
  }
};

const mapDispatchToProps = {
  // addFullName: (params) => setFullName(params),
  // addCreateGroupDetail: (params) => setCreateGroupDetails(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(PostLikeListing));
