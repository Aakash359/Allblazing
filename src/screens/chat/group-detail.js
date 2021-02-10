import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {func, shape} from 'prop-types';
import Constants from '../../constants';
import {
  ChatStyles,
  HomeStyles,
  GroupDetailStyles,
  MyProfileStyles,
  InviteFriendsStyles,
  CommonStyles,
} from '../../styles';
import {
  SingleEvent,
  MoreOptionsPopup,
  RemoveMemberPopup,
} from '../../components';
import axios from 'axios';
import API from '../../constants/baseApi';
import {getAuthToken} from '../../helpers/auth';

class GroupDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      optionList: ['Active', 'Created', 'Requested', 'Archived'],
      options: 'Active',
      removeMemberPopup: false,
      visible: false,
      isLoading: false,
      Loading: false,
    };
  }

  renderItem = () => {
    const {
      navigation: {navigate},
    } = this.props;

    return (
      <SingleEvent
        onPress={() => navigate('SingleEventDetail')}
        screen="groupDetails"
      />
    );
  };

  // componentDidMount() {
  //   this.groupDetails();
  // }
  // groupDetails = async () => {
  //   const {
  //     navigation: {navigate},
  //     route: {params},
  //   } = this.props;
  //   const id = this.props.route.params.data.id;
  //   console.log('id==>',id);
  //   const token = await getAuthToken();
  //   const config = {
  //     headers: {Authorization: `Bearer ${token}`},
  //   };
  //   // console.log('token===>', config);
  //   this.setState({
  //     Loading: true,
  //   });
  //   axios
  //     .get(API.GROUPDETAILS + id + '?type=active', config)
  //     .then((response) => {
  //       console.log('response ====', response.data);
  //       if (response.data) {
  //         // console.log('===>response', response.data.data.result);
  //         // this.setState({list: response?.data?.data?.result});
  //       }
  //     })
  //     .finally(() => {
  //       this.setState({
  //         Loading: false,
  //       });
  //     });
  // };
  displayOptions = (data) => {
    if (data === 'Active') {
      return true;
    }
    if (data === 'Created') {
      // return <PBScreen />;
    }
    if (data === 'Requested') {
      // return <LikeScreen />;
    }
    if (data === 'Archived') {
      // return <LikeScreen />;
    }

    return true;
  };

  renderItem2 = ({item}) => {
    const {options} = this.state;

    return (
      <TouchableOpacity
        style={[
          ChatStyles.optionalSectionView,
          {
            backgroundColor:
              item === options
                ? Constants.Colors.GRAY
                : Constants.Colors.TRANSPARENT,
          },
        ]}
        onPress={() => {
          this.setState({options: item});
        }}>
        <Text
          style={[
            ChatStyles.optionalSection1,
            {
              color:
                item === options
                  ? Constants.Colors.WHITE
                  : Constants.Colors.GRAY,
            },
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  OnJoin = async () => {
    const {
      navigation: {navigate},
      route: {params},
    } = this.props;
    const GroupId = this.props.route.params.data.id;
    console.log('id==>', GroupId);
    this.setState({
      isLoading: true,
    });
    // markwinz06@gmail.com/mark@1234
    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    console.log(config);

    axios
      .post(API.JOIN_GROUP + GroupId, config)
      .then((response) => {
        console.log('token ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert('', response?.data?.message ?? '');
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('Settings'),
              },
            ],
            {Cancelable: false},
          );

          // navigate('Settings');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  // </View>

  render() {
    const {
      navigation: {navigate},
      route: {params},
    } = this.props;
    const id = this.props.route.params.data.id;
    const name = this.props.route.params.data.name;
    const count = this.props.route.params.data.count;
    // const Checking = this.props.route.params.checking;
    const {optionList, visible, removeMemberPopup} = this.state;

    return (
      <>
        <View style={HomeStyles.GroupDetailStyles}>
          {/* {this.renderHeader({ goBack })} */}
          <ScrollView>
            <ImageBackground
              source={Constants.Images.groupDetails}
              imageStyle={MyProfileStyles.borderRadius}
              style={MyProfileStyles.profileIcon}>
              <View style={ChatStyles.overlappingStyle}>
                <View>
                  <Text style={ChatStyles.heading}>{name}</Text>
                  <Text style={ChatStyles.subHeading}>
                    {count} {'Members'}
                  </Text>
                </View>
                {this.props.route?.params?.isMyGroupPage ? (
                  <TouchableOpacity onPress={() => navigate('GroupInfo')}>
                    <Image
                      source={Constants.Images.edit}
                      resizeMode="contain"
                      style={ChatStyles.icon}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </ImageBackground>
            <View>
              {this.props.route?.params?.isMyGroupPage ? (
                <FlatList
                  // style={MyProfileStyles.sectionMainView}
                  scrollEnabled={false}
                  contentContainerStyle={ChatStyles.sectionMainView}
                  data={optionList}
                  renderItem={this.renderItem2}
                  keyExtractor={(id, index) => index.toString()}
                />
              ) : null}

              <FlatList
                scrollEnabled={false}
                data={[1, 2, 3]}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${index}`}
              />
            </View>
            
              <TouchableOpacity
                onPress={() => this.OnJoin()}
                activeOpacity={0.7}
                style={GroupDetailStyles.nextView}>
                {this.state.isLoading ? (
                  <ActivityIndicator color="white" size={25} />
                ) : (
                  <Text style={GroupDetailStyles.nextText}>Join</Text>
                )}
              </TouchableOpacity>
           

            {/* <TouchableOpacity
              onPress={() => this.OnJoin()}
              activeOpacity={0.7}
              style={GroupDetailStyles.nextView}>
              {this.state.isLoading ? (
                <ActivityIndicator color="white" size={25} />
              ) : (
                <Text style={GroupDetailStyles.nextText}>Withdraw Request</Text>
              )}
            </TouchableOpacity> */}
          </ScrollView>
          <MoreOptionsPopup
            hasUnFollowBtn={false}
            hasBlockBtn={false}
            leaveGroup
            visible={visible}
            onBlock={() => {
              this.setState({
                removeMemberPopup: true,
                visible: false,
              });
            }}
            onReport={() => {
              this.setState({visible: false});
              navigate('BlockReportUser', {isBlockPage: false});
            }}
            onClose={() => this.setState({visible: false})}
          />
          {removeMemberPopup && (
            <RemoveMemberPopup
              onLogout={this.removeMemberPopup}
              onCancel={() => this.setState({removeMemberPopup: false})}
              leaveGroup
            />
          )}
        </View>
      </>
    );
  }
}

GroupDetail.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default GroupDetail;
