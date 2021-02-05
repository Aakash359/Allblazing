import React from 'react';
import { TouchableOpacity, View, FlatList, Text, ScrollView, ImageBackground, Image } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { ChatStyles, HomeStyles, GroupDetailStyles, MyProfileStyles, InviteFriendsStyles, CommonStyles } from '../../styles';
import { SingleEvent, MoreOptionsPopup, RemoveMemberPopup } from '../../components';
import axios from 'axios';
import API from '../../constants/baseApi';

class GroupDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      optionList: ['Active', 'Created', 'Requested', 'Archived'], 
      options: 'Active', 
      removeMemberPopup: false,
       visible: false,
       isLoading:false,
    };
  }

  renderItem = () => {
    const { navigation: { navigate } } = this.props;

    return (<SingleEvent onPress={() => navigate('SingleEventDetail')} screen='groupDetails' />);
  }

  // renderHeader = ({ goBack }) => (
  //   <View style={HomeStyles.ChatOneToOneHeader}>
  //     <View style={[InviteFriendsStyles.userWrapper]}>
  //       <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
  //         <Image source={Constants.Images.back} resizeMode='contain' style={CommonStyles.crossImage} />
  //       </TouchableOpacity>
  //     </View>
  //     <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ visible: true })}>
  //       <Image source={Constants.Images.more} resizeMode='contain' style={CommonStyles.crossImage} />
  //     </TouchableOpacity>
  //   </View>
  // )

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

  renderItem2 = ({ item }) => {
    const { options } = this.state;

    return (
      <TouchableOpacity
        style={[ChatStyles.optionalSectionView, { backgroundColor: item === options ? Constants.Colors.GRAY : Constants.Colors.TRANSPARENT }]}
        onPress={() => { this.setState({ options: item }); }}
      >
        <Text style={[ChatStyles.optionalSection1, { color: item === options ? Constants.Colors.WHITE : Constants.Colors.GRAY }]}>{item}</Text>
      </TouchableOpacity>

    );
  }

  OnJoin = async() => {
    const {
      navigation:{navigate},
  } = this.props;

    this.setState({
      isLoading: true,
    });
    // markwinz06@gmail.com/mark@1234
    const token = await getAuthToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  console.log(config);

    axios
      .post(API.JOIN_GROUP + followId, config)
      .then((response) => {
        // console.log('token ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancle',
                onPress: () => console.log('cancle pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('Settings'),
              },
            ],
            {cancelable:false}
            
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
      navigation: {
        navigate, goBack,
      },
    } = this.props;
    const {
      optionList, visible, removeMemberPopup,
    } = this.state;

    return (
      <>
        <View style={HomeStyles.GroupDetailStyles}>
          {/* {this.renderHeader({ goBack })} */}
          <ScrollView>
            <ImageBackground
              source={Constants.Images.groupDetails}
              imageStyle={MyProfileStyles.borderRadius}
              style={MyProfileStyles.profileIcon}
            >
              <View style={ChatStyles.overlappingStyle}>
                <View>
                  <Text style={ChatStyles.heading}>{'Super Nova'}</Text>
                  <Text style={ChatStyles.subHeading}>{'18 Members'}</Text>
                </View>
                <TouchableOpacity onPress={() => navigate('GroupInfo')}>
                  <Image
                    source={Constants.Images.edit}
                    resizeMode='contain'
                    style={ChatStyles.icon}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View>
              <FlatList
                // style={MyProfileStyles.sectionMainView}
                scrollEnabled={false}
                contentContainerStyle={ChatStyles.sectionMainView}
                data={optionList}
                renderItem={this.renderItem2}
                keyExtractor={(id, index) => index.toString()}
              />
              <FlatList
                scrollEnabled={false}
                data={[1, 2, 3]}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${index}`}
              />
            </View>
            <TouchableOpacity
              onPress={()=>this.OnJoin()}
              activeOpacity={0.7}
              style={GroupDetailStyles.nextView}
            >
              <Text style={GroupDetailStyles.nextText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
          <MoreOptionsPopup
            hasUnFollowBtn={false}
            hasBlockBtn={false}
            leaveGroup
            visible={visible}
            onBlock={() => {
              this.setState({
                removeMemberPopup: true, visible: false,
              });
            }}
            onReport={() => {
              this.setState({ visible: false });
              navigate('BlockReportUser', { isBlockPage: false });
            }}
            onClose={() => this.setState({ visible: false })}
          />
          { removeMemberPopup && (
            <RemoveMemberPopup
              onLogout={this.removeMemberPopup}
              onCancel={() => this.setState({ removeMemberPopup: false })}
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
