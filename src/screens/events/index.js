import React from 'react';
import { View, FlatList } from 'react-native';
import { HomeStyles } from '../../styles';
import { SingleEvent } from '../../components';

class Events extends React.Component {
  renderItem = () => <SingleEvent />

  render() {
    return (
      <View style={HomeStyles.container}>
        <FlatList
          data={[1, 2, 3]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default Events;
