import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { TouchableOpacity, Text, View, Image, ViewPropTypes } from 'react-native';
import { func } from 'prop-types';
import { MapViewStyles } from '../../styles';
import Constants from '../../constants';

const markers = [{
  coordinate: {
    latitude: 30.7335,
    longitude: 76.7794,
  },
  image: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
  title: '',
}];

const events = [{
  coordinate: {
    latitude: 30.7435,
    longitude: 76.7784,
  },
  title: '',
  type: 'racing',
}, {
  coordinate: {
    latitude: 30.7210,
    longitude: 76.7784,
  },
  title: '',
  type: 'coaching',
}, {
  coordinate: {
    latitude: 30.7585,
    longitude: 76.7895,
  },
  title: '',
  type: 'training',
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

  renderCustomMarker = (marker) => {
    let image = Constants.Images.blueLocation;

    if (marker.type === 'training') {
      image = Constants.Images.greenLocation;
    }

    if (marker.type === 'coaching') {
      image = Constants.Images.yellowLocation;
    }

    return (
      <View>
        <TouchableOpacity activeOpacity={1} style={MapViewStyles.customMarkerContainer}>
          <Image resizeMode="contain" style={MapViewStyles.cover} source={image} />
          <View style={MapViewStyles.wrapper}>
            <View style={[MapViewStyles.racing, MapViewStyles[marker.type]]}>
              <Image resizeMode="contain" style={MapViewStyles.icon} source={Constants.Images[marker.type]} />
            </View>
            {marker.type === 'training' && (
              <View style={MapViewStyles.textWrapper}>
                <Text style={MapViewStyles.text}>{'TRAINING'}</Text>
                <Image resizeMode="contain" style={MapViewStyles.lock} source={Constants.Images.lock} />
              </View>
            )}
            {marker.type === 'coaching' && (
              <View style={MapViewStyles.textWrapper}>
                <Text style={MapViewStyles.text}>{'Coaching'}</Text>
                <Text style={MapViewStyles.km}>{'(1 Km)'}</Text>
              </View>
            )}
            {marker.type === 'racing' && (
              <>
                <View style={MapViewStyles.textWrapper}>
                  <Text style={MapViewStyles.text}>{'RACING'}</Text>
                  <Text style={MapViewStyles.km}>{'(1 mile)'}</Text>
                </View>
                <Image resizeMode="contain" style={MapViewStyles.live} source={Constants.Images.live} />
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { region } = this.state;
    const {
      onMarkerPress, style, onEventPress,
    } = this.props;

    return (
      <MapView
        style={[MapViewStyles.map, style]}
        provider={PROVIDER_GOOGLE}
        region={region}
        customMapStyle={Constants.MapStyle}
      >
        {markers.map((marker, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={onMarkerPress}
          >
            <View style={MapViewStyles.outerCircle}>
              <Image source={{ uri: marker.image }} style={MapViewStyles.image} />
            </View>
          </Marker>
        ))}
        {events.map((marker, index) => (
          <Marker
            key={`custom-marker-${index}`}
            coordinate={marker.coordinate}
            onPress={onEventPress}
          >
            {this.renderCustomMarker(marker)}
          </Marker>
        ))}

      </MapView>
    );
  }
}

EventsMap.propTypes = {
  onEventPress: func.isRequired,
  onMarkerPress: func.isRequired,
  style: ViewPropTypes.style,
};
EventsMap.defaultProps = { style: {} };

export default EventsMap;
