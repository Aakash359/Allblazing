import React from 'react';
import { View } from 'react-native';
import { HomeStyles } from '../../styles';
import { InviteFriend } from '../../components';

class Runners extends React.Component {
  renderItem = () => <InviteFriend />

  render() {
    return (
      <View style={HomeStyles.container} />
    );
  }
}

export default Runners;
