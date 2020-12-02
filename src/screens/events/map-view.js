import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, Image, ViewPropTypes } from 'react-native';
import { MapViewStyles } from '../../styles';

const markers = [{
  coordinate: {
    latitude: 30.7335,
    longitude: 76.7794,
  },
  title: '',
}, {
  coordinate: {
    latitude: 30.7245,
    longitude: 76.7805,
  },
  title: '',
}, {
  coordinate: {
    latitude: 30.7455,
    longitude: 76.7815,
  },
  title: '',
}, {
  coordinate: {
    latitude: 30.7365,
    longitude: 76.7824,
  },
  title: '',
}, {
  coordinate: {
    latitude: 30.7275,
    longitude: 76.7835,
  },
  title: '',
}, {
  coordinate: {
    latitude: 30.7405,
    longitude: 76.7865,
  },
  title: '',
}];

class EventsMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 30.7333,
        latitudeDelta: 0.0922,
        longitude: 76.7794,
        longitudeDelta: 0.0421,
      },
    };
  }

  // onRegionChange = (region) => {
  //   this.setState({ region });
  // }

  render() {
    const { region } = this.state;
    const { style } = this.props;

    return (
      <MapView
        style={[MapViewStyles.map, style]}
        provider={PROVIDER_GOOGLE}
        region={region}
        // onRegionChange={this.onRegionChange}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <View style={MapViewStyles.outerCircle}>
              <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={MapViewStyles.image} />
            </View>
          </Marker>
        ))}
      </MapView>
    );
  }
}

EventsMap.propTypes = { style: ViewPropTypes.style };
EventsMap.defaultProps = { style: {} };

export default EventsMap;
