import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { HomeStyles } from '../../styles';
import { ChatFriends } from '../../components';
import Constants from '../../constants';

class Chats extends React.Component {
  constructor() {
    super();
    this.state = { activeTab: '0' };
  }

  renderItem = () => {
    const {
      route: { params }, navigation: { navigate },
    } = this.props;
    const { activeTab } = this.state;

    if (activeTab === '0') {
      return <ChatFriends hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} navigation={navigate} type="chat" />;
    }

    return <ChatFriends hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} navigation={navigate} type="groups" />;
  }

  onTabPress = (val) => {
    this.setState({ activeTab: val });
  }

  renderHeader = () => {
    const { activeTab } = this.state;

    return (
      <View style={HomeStyles.chatHeaderContainer}>

        <View style={[HomeStyles.chatHeader, { borderBottomColor: activeTab === '0' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>
          <TouchableOpacity onPress={() => this.onTabPress('0')}>
            <Text style={[HomeStyles.chatText, { color: activeTab === '0' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Friends'}</Text>
          </TouchableOpacity>

        </View>
        <View style={[HomeStyles.chatHeader, { borderBottomColor: activeTab === '1' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>
          <TouchableOpacity onPress={() => this.onTabPress('1')}>
            <Text style={[HomeStyles.chatText, { color: activeTab === '1' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Groups'}</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  }

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={HomeStyles.container}>
        {this.renderHeader({
          navigate, route: 'Events', title: 'Events',
        })}
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
      </View>
    );
  }
}

Chats.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isMapView: bool }) }).isRequired,
};

export default Chats;
