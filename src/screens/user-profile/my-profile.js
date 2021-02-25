/* eslint-disable consistent-return */
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {MyProfileStyles} from '../../styles';
import Constants from '../../constants';
import PBScreen from './pb-screen';
import LikeScreen from './like-screen';
import GoalScreen from './goals-screen';
import {func, shape} from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import Axios from 'axios';
import API from '../../constants/baseApi';
import {getAuthToken, setUserId} from '../../helpers/auth';
import {ActivityIndicator} from 'react-native';
import {setMottoDescription, setProfileDetails} from '../../reducers/baseServices/profile';

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      option: 'Goals',
      Loading: false,
      optionList: ['Goals', "PB's", 'Likes'],
    };
  }

  // componentDidMount() {
  //   this.UserProfileDetails();
  // }
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.UserProfileDetails();
    });
    
  }
  componentWillUnmount() {
   this.unsubscribe() 
  }
  // componentWillUnmount() {
  //  this.unsubscribe.remove() 
  // }

  UserProfileDetails = async () => {
    const {user_id, addProfileDetail,} = this.props;
    console.log('userid==>', user_id);
    const token = await getAuthToken();
    console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    this.setState({
      Loading: true,
    });
    Axios.post(
      API.PROFILE_DETAILS,
      {
        user_id: user_id,
      },
      config,
    )
      .then((response) => {
        console.log("RESPONSE", response);
        console.log('===>My Profile', response);
        if (response.data.data.result) {
          this.setState({list: response?.data?.data?.result});
          addProfileDetail(response?.data?.data?.result);
          setUserId(response?.data?.data?.result?.user_id.toString())
          console.log('profile response==>', response?.data?.data?.result);
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };

  renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        MyProfileStyles.sectionView,
        {
          backgroundColor:
            item === this.state.option
              ? Constants.Colors.GRAY
              : Constants.Colors.PRIMARY,
        },
      ]}
      onPress={() => {
        this.setState({option: item});
      }}>
      <Text style={MyProfileStyles.section1}>{item}</Text>
    </TouchableOpacity>
  );

  displayOptions = (data) => {
    if (data === 'Goals') {
      return <GoalScreen />;
    }
    if (data === "PB's") {
      return <PBScreen />;
    }
    if (data === 'Likes') {
      return <LikeScreen />;
    }
  };

  render() {
    const {
      navigation: {navigate},
      full_name,
      age,
      gender,
      time,
      level,
      motto_description,
      image,
      followingCount,
      followerCount,
      postCount,
      groupCount,
    } = this.props;

    return (
      <>
        <SafeAreaView style={MyProfileStyles.container}>
          {this.state.Loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}>
              <ActivityIndicator color="white" size={25} />
            </View>
          ) : (
            <ScrollView>
              <TouchableOpacity activeOpacity={0.7}>
                <View>
                  <ImageBackground
                    source={
                      image == 'N/A'
                        ? Constants.Images.profilePic
                        : {uri: image}
                    }
                    imageStyle={MyProfileStyles.borderRadius}
                    style={MyProfileStyles.profileIcon}>
                    <View style={MyProfileStyles.levelStyle}>
                      <Text style={MyProfileStyles.levelText}>
                        Level {level}
                      </Text>
                    </View>
                    <View style={MyProfileStyles.overlappingStyle}>
                      <View>
                        <Text style={MyProfileStyles.heading}>{full_name}</Text>
                        <Text style={MyProfileStyles.subHeading}>
                          {motto_description}
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          this.props.navigation.navigate('EditProfile');
                        }}>
                        <Image
                          source={Constants.Images.edit}
                          resizeMode="contain"
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
                  onPress={() => {
                    this.props.navigation.navigate('FollowersList', {user_id: this.props.user_id, followerCount});
                  }}
                  style={MyProfileStyles.headerView}>
                  <Text style={MyProfileStyles.section2}>{followerCount}</Text>
                  <Text style={MyProfileStyles.section1}>{'Followers'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.props.navigation.navigate('FollowingList', {user_id: this.props.user_id, followingCount});
                  }}
                  style={MyProfileStyles.headerView}>
                  <Text style={MyProfileStyles.section2}>{followingCount}</Text>
                  <Text style={MyProfileStyles.section1}>{'Following'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={MyProfileStyles.headerView}
                  onPress={() => {
                    this.props.navigation.navigate('PostLikeListing', {postCount} );
                  }}>
                  <Text style={MyProfileStyles.section2}>{postCount}</Text>
                  <Text style={MyProfileStyles.section1}>{'Posts'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.props.navigation.navigate('ChatsGroup');
                  }}
                  style={MyProfileStyles.headerViewEnd}>
                  <Text style={MyProfileStyles.section2}>{groupCount}</Text>
                  <Text style={MyProfileStyles.section1}>{'Groups'}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                // style={MyProfileStyles.sectionMainView}
                scrollEnabled={false}
                contentContainerStyle={MyProfileStyles.sectionMainView2}
                data={this.state.optionList}
                renderItem={this.renderItem}
                keyExtractor={(id, index) => index.toString()}
              />
              {this.displayOptions(this.state.option)}
            </ScrollView>
          )}
        </SafeAreaView>
      </>
    );
  }
}

// export default MyProfile;

MyProfile.propTypes = {
  // loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({
  profile: {
    image,
    full_name,
    age,
    time,
    gender,
    motto_description,
    followingCount,
    followerCount,
    groupCount,
    postCount,
    level,
    address
  },
  auth: {user_id},
}) => ({
  image,
  full_name,
  age,
  gender,
  level,
  time,
  motto_description,
  user_id,
  followingCount,
  followerCount,
  groupCount,
  postCount,
  address
});
const mapDispatchToProps = {
  addProfileDetail: (params) => setProfileDetails(params),
 
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()( MyProfile));
