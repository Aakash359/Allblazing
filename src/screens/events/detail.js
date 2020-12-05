
import React from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { CommonStyles, InviteFriendsStyles, EventDetailStyles } from '../../styles';
import Constants from '../../constants';
import { InvitedUser, UserImages } from '../../components';

class SingleEventDetail extends React.Component {
  onPress = () => {
    const {
      navigation: {
        navigate, setParams,
      }, route: { params },
    } = this.props;

    if (params?.isMember) {
      const payload = {
        hasCheckBox: false, hasTick: true, title: 'My Friends',
      };

      navigate('InviteFriends', payload);
    } else {
      setParams({ isMember: true });
    }
  };

  renderItem = () => <InvitedUser onPress={this.onEventPress} />

  render() {
    const { route: { params } } = this.props;

    return (
      <View style={[CommonStyles.container, EventDetailStyles.container]}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <Image style={EventDetailStyles.headerImage} source={{ uri: 'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg' }} />
          <View style={EventDetailStyles.userContainer}>
            <Image resizeMode='contain' source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={InviteFriendsStyles.userImage} />
            <View style={EventDetailStyles.userInformation}>
              <Text style={EventDetailStyles.username}>John Doe</Text>
              <Text style={EventDetailStyles.subtitle}>Individual Event</Text>
            </View>
          </View>
          <View style={EventDetailStyles.divider} />
          <View style={EventDetailStyles.row}>
            <Image resizeMode='contain' source={Constants.Images.live} style={EventDetailStyles.live} />
            <View style={[EventDetailStyles.row]}>
              <Text style={[EventDetailStyles.eventType, EventDetailStyles.marginLeft]}>Racing</Text>
              <Text style={[EventDetailStyles.subtitle, EventDetailStyles.marginLeft]}>{'(1 Km)'}</Text>
            </View>
          </View>
          <View style={EventDetailStyles.row}>
            <Text style={EventDetailStyles.eventTitle}>Emily Vs Maaike, 1km Race</Text>
          </View>
          <View style={[EventDetailStyles.row, EventDetailStyles.margin]}>
            <Image resizeMode='contain' source={Constants.Images.mapPin} style={EventDetailStyles.calendar} />
            <Text style={[EventDetailStyles.subtitle, EventDetailStyles.marginLeft]}>{'121 Dizzy Cir, Santee, SC 29142, United States'}</Text>
          </View>
          <View style={[EventDetailStyles.row, EventDetailStyles.margin]}>
            <Image resizeMode='contain' source={Constants.Images.calendar} style={EventDetailStyles.calendar} />
            <Text style={[EventDetailStyles.subtitle, EventDetailStyles.marginLeft]}>{'11:00 AM, 20 Oct 2020'}</Text>
          </View>
          <View style={EventDetailStyles.divider} />
          <Text style={EventDetailStyles.header}>Description</Text>
          <Text style={EventDetailStyles.eventDescription}>{'Emily and Maaike go head to head over 1km. For more info on the runners\' stats.'}</Text>
          <View style={EventDetailStyles.divider} />
          <View style={[EventDetailStyles.members]}>
            <UserImages style={EventDetailStyles.memberImages} users={[1, 2, 3, 4, 5]} />
            <Text style={EventDetailStyles.subtitle}>{'Members are watching'}</Text>
          </View>
          <View style={EventDetailStyles.divider} />
          {!params?.isMember && (
            <>
              <Text style={EventDetailStyles.header}>Invitation To Record Live Stream</Text>
              <Text style={EventDetailStyles.eventDescription}>Kelly Norman sent you an invitation to record live stream</Text>
              <View style={[EventDetailStyles.row, EventDetailStyles.buttons, EventDetailStyles.margin]}>
                <TouchableOpacity activeOpacity={0.7} style={[EventDetailStyles.button, EventDetailStyles.acceptRejectBtn]}>
                  <Text style={EventDetailStyles.buttonText}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={[EventDetailStyles.button, EventDetailStyles.acceptRejectBtn]}>
                  <Text style={EventDetailStyles.buttonText}>Accept</Text>
                </TouchableOpacity>
              </View>
              <View style={EventDetailStyles.divider} />
            </>
          )}
          {!params?.isInviteSent && (
            <TouchableOpacity activeOpacity={0.7} style={EventDetailStyles.button} onPress={this.onPress}>
              <Text style={EventDetailStyles.buttonText}>{params?.isMember ? 'Invite Friend To Record Live Stream' : 'Join'}</Text>
            </TouchableOpacity>
          )}
          {params?.isInviteSent && (
            <View style={EventDetailStyles.margin}>
              <FlatList
                data={[1, 2, 3]}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${index}`}
              />
              <TouchableOpacity activeOpacity={0.7} style={[EventDetailStyles.button, EventDetailStyles.margin]}>
                <Text style={EventDetailStyles.buttonText}>{'Withdraw Request'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

SingleEventDetail.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isMapView: bool }) }).isRequired,
};

export default SingleEventDetail;