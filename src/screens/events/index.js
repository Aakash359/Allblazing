
import React from 'react';
import { View, FlatList } from 'react-native';
import { bool, shape } from 'prop-types';
import { HomeStyles, EventMapStyles, MapViewStyles } from '../../styles';
import { SingleEvent } from '../../components';
import Map from './map-view';

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = { visible: true };
  }

  renderItem = () => <SingleEvent />

  onMarkerPress = () => { this.setState({ visible: true }); };

  renderEventPopup = () => (
    <View style={EventMapStyles.popover}>
      <SingleEvent />
    </View>
  );

  render() {
    const { route: { params } } = this.props;
    const { visible } = this.state;

    return (
      <View style={HomeStyles.container}>
        {params?.isMapView ? (<Map style={MapViewStyles.map} onMarkerPress={this.onMarkerPress} />) : (
          <FlatList
            data={[1, 2, 3]}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
        {params?.isMapView && visible && this.renderEventPopup()}
      </View>
    );
  }
}

Events.propTypes = { route: shape({ params: shape({ isMapView: bool }) }).isRequired };

export default Events;
