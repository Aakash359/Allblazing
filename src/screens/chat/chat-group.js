import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { HomeStyles } from '../../styles';
import { ChatGroup } from '../../components';
import Constants from '../../constants';

class ChatsGroup extends React.Component {
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
      return <ChatGroup hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} navigation={navigate} />;
    }
    if (activeTab === '1') {
      return <ChatGroup hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} navigation={navigate} />;
    }

    return <ChatGroup hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} navigation={navigate} />;
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
            <Text style={[HomeStyles.chatText, { color: activeTab === '0' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'My Groups'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[HomeStyles.chatHeader, { borderBottomColor: activeTab === '1' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>
          <TouchableOpacity onPress={() => this.onTabPress('1')}>
            <Text style={[HomeStyles.chatText, { color: activeTab === '1' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'All Groups'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[HomeStyles.chatHeader, { borderBottomColor: activeTab === '2' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.onTabPress('2')}>
            <Text style={[HomeStyles.chatText, { color: activeTab === '2' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Requested'}</Text>
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

ChatsGroup.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isMapView: bool }) }).isRequired,
};

export default ChatsGroup;
