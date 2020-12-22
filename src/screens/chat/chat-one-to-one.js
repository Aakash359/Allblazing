import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { func, shape } from 'prop-types';
import { CommonStyles, HomeStyles, InviteFriendsStyles, ChatStyles } from '../../styles';
import { MoreOptionsPopup } from '../../components';
import Constants from '../../constants';

class ChatOneToOne extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '', visible: false,
    };
  }

  renderItem = (item) => {
    if (item.index % 2 === 0) {
      return (
        <View style={HomeStyles.ChatOneToOneContainerOuter2}>
          <View style={HomeStyles.ChatOneToOneContainer2}>
            <Text style={[InviteFriendsStyles.username]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Text>
            <Text style={[InviteFriendsStyles.location,
              ChatStyles.chatTimeText2,
            ]}
            >
              {'10:36am'}
            </Text>
          </View>
          <View style={HomeStyles.ChatTrinangleRight} />
        </View>
      );
    }

    return (
      <View style={HomeStyles.ChatOneToOneContainerOuter}>
        <View style={HomeStyles.ChatTrinangleLeft} />
        <View style={HomeStyles.ChatOneToOneContainer}>
          <Text style={[InviteFriendsStyles.username]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </Text>
          <Text style={[InviteFriendsStyles.location, ChatStyles.chatTimeText]}>{'04:36pm'}</Text>
        </View>
      </View>
    );
  }

  renderHeader = ({ goBack }) => (
    <View style={HomeStyles.ChatOneToOneHeader}>
      <View style={[InviteFriendsStyles.userWrapper]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
          <Image source={Constants.Images.back} resizeMode='contain' style={CommonStyles.crossImage} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }}
          style={{
            borderRadius: Constants.BaseStyle.scale(25),
            height: Constants.BaseStyle.scale(50),
            width: Constants.BaseStyle.scale(50),
          }}
        />
        <View>
          <Text style={InviteFriendsStyles.username}>Shane Watson</Text>
          <Text style={InviteFriendsStyles.location}>Santee</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ visible: true })}>
        <Image source={Constants.Images.more} resizeMode='contain' style={CommonStyles.crossImage} />
      </TouchableOpacity>
    </View>

  );

  render() {
    const {
      navigation: {
        goBack, navigate,
      },
    } = this.props;
    const {
      message, visible,
    } = this.state;

    return (
      <View style={HomeStyles.container}>
        {this.renderHeader({
          goBack, route: 'Events', title: 'Events',
        })}
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
        <View style={HomeStyles.ChatBody}>
          <View style={HomeStyles.ChatBody}>
            <TextInput
              style={HomeStyles.ChatInput}
              multiline
              value={message}
              placeholder="Write your message..."
              placeholderTextColor={Constants.Colors.TEXT_COLOR}
              onChangeText={(text) => this.setState({ message: text })}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
            <TouchableOpacity>
              <Image
                source={Constants.Images.send}
                resizeMode='contain'
                style={{
                  height: Constants.BaseStyle.scale(20),
                  marginRight: Constants.BaseStyle.scale(20),
                  width: Constants.BaseStyle.scale(20),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <MoreOptionsPopup
          hasUnFollowBtn={false}
          visible={visible}
          onBlock={() => {
            this.setState({ visible: false });
            navigate('BlockReportUser', { isBlockPage: true });
          }}
          onReport={() => {
            this.setState({ visible: false });
            navigate('BlockReportUser', { isBlockPage: false });
          }}
          onClose={() => this.setState({ visible: false })}
        />
      </View>
    );
  }
}

ChatOneToOne.propTypes = {
  navigation: shape({
    goBack: func,
    navigate: func,
    setParams: func,

  }).isRequired,
};

export default ChatOneToOne;
