import React from 'react';
import { TouchableOpacity, View, FlatList, Text } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { HomeStyles } from '../../styles';
import { HeaderSearchBar, SingleEvent, InviteFriend } from '../../components';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { keyword: '' };
  }

  renderItem = () => {
    const { navigation: { navigate } } = this.props;

    return (<SingleEvent onPress={() => navigate('SingleEventDetail')} />);
  }

  renderHeader = ({
    navigate, payload = {}, route, title,
  }) => (
    <View style={HomeStyles.content}>
      <Text style={HomeStyles.heading}>{title}</Text>
      <TouchableOpacity hitSlop={Constants.BaseStyle.HALF_HIT_SLOP} onPress={() => navigate(route, payload)}>
        <Text style={HomeStyles.rightHeading}>{'View All'}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { navigation: { navigate } } = this.props;
    const { keyword } = this.state;

    return (
      <View style={HomeStyles.container}>
        <HeaderSearchBar keyword={keyword} onChangeText={(value) => this.setState({ keyword: value })} />
        <View>
          {this.renderHeader({
            navigate, route: 'Events', title: 'Events',
          })}
          <FlatList
            scrollEnabled={false}
            data={[1]}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
          {this.renderHeader({
            navigate, payload: { hasCheckBox: true }, route: 'Runners', title: 'Runners Near Me',
          })}
          <FlatList
            data={[Constants.Images.inviteUser2, Constants.Images.inviteUser1, Constants.Images.inviteUser3]}
            renderItem={({ item }) => <InviteFriend image={item} />}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default Home;
