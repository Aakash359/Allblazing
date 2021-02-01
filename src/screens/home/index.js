import React from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {func, shape} from 'prop-types';
import Constants from '../../constants';
import {HomeStyles} from '../../styles';
import {HeaderSearchBar, SingleEvent} from '../../components';
import Invite from '../settings/invite-friends';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {keyword: ''};
  }

  renderHeader = ({navigate, payload = {}, route, title}) => (
    <View style={HomeStyles.content}>
      <Text style={HomeStyles.heading}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={Constants.BaseStyle.HALF_HIT_SLOP}
        onPress={() => navigate(route, payload)}>
        <Text style={HomeStyles.rightHeading}>{'View All'}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const {
      navigation,
      navigation: {navigate},
    } = this.props;
    const {keyword} = this.state;

    return (
      <View style={HomeStyles.container}>
        <HeaderSearchBar
          keyword={keyword}
          onChangeText={(value) => this.setState({keyword: value})}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.renderHeader({
            navigate,
            route: 'Events',
            title: 'Events',
          })}
          <SingleEvent onPress={() => navigate('SingleEventDetail')} />
          {this.renderHeader({
            navigate,
            payload: {hasCheckBox: true},
            route: 'Runners',
            title: 'Runners Near Me',
          })}
          {/* <FlatList
            data={[]}
            renderItem={({ item }) => <InviteFriend image={item} />}
            keyExtractor={(item, index) => `${index}`}
          /> */}
          <Invite source="home" navigation={navigation} />
        </ScrollView>
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
