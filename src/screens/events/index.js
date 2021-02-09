import React from 'react';
import {View, FlatList} from 'react-native';
import {bool, func, shape} from 'prop-types';
import {HomeStyles, EventMapStyles, MapViewStyles} from '../../styles';
import {SingleEvent} from '../../components';
import Map from './map-view';

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {visible: false};
  }

  onEventPress = () => {
    const {
      navigation: {navigate},
    } = this.props;

    navigate('SingleEventDetail');
  };

  renderItem = () => <SingleEvent onPress={this.onEventPress} />;

  onMarkerPress = () => {
    this.setState({visible: true});
  };

  renderEventPopup = () => (
    <View style={EventMapStyles.popover}>
      <SingleEvent onPress={this.onEventPress} />
    </View>
  );

  render() {
    const {params} = this.props;
    const {visible} = this.state;

    return (
      <View style={HomeStyles.container}>
        {params?.isMapView ? (
          <Map
            style={MapViewStyles.map}
            onMarkerPress={this.onMarkerPress}
            onEventPress={this.onEventPress}
          />
        ) : (
          <>
            <FlatList
              data={[1, 2, 3]}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `${index}`}
            />
            <View style={HomeStyles.spacing} />
          </>
        )}
        {params?.isMapView && visible && this.renderEventPopup()}
      </View>
    );
  }
}

Events.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({params: shape({isMapView: bool})}).isRequired,
};

export default Events;
