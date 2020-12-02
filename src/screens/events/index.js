
import React from 'react';
import { View, FlatList } from 'react-native';
import { bool, shape } from 'prop-types';
import { HomeStyles, MapViewStyles } from '../../styles';
import { SingleEvent } from '../../components';
import Map from './map-view';

class Events extends React.Component {
  renderItem = () => <SingleEvent />

  render() {
    const { route: { params } } = this.props;

    return (
      <View style={HomeStyles.container}>
        {params?.isMapView ? (<Map style={MapViewStyles.map} />) : (
          <FlatList
            data={[1, 2, 3]}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
      </View>
    );
  }
}

Events.propTypes = { route: shape({ params: shape({ isMapView: bool }) }).isRequired };

export default Events;
