import React, { Component } from 'react';
import { Image, Platform, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, DistanceStyles, CommonStyles, ConnectUserTypeStyles, Repeat5KStyles } from '../../styles';
import { StepBar, TimePicker } from '../../components';

const times = [{
  label: '200 m',
  value: '200m',
}, {
  label: '400 m',
  value: '400m',
}, {
  label: '1 km',
  value: '1km',
}, {
  label: '1 mile',
  value: '1mile',
}, {
  label: '5 km',
  value: '5km',
}, {
  label: '10 km',
  value: '10km',
}];

class Distance extends Component {
  constructor() {
    super();
    this.state = {
      hour: 1,
      minute: 1,
      second: 1,
      time: null,
      visible: false,
    };
  }

  onTypeChange = (payload) => {
    this.setState({
      time: payload, visible: true,
    });
  }

  onValueChange = (value, type) => {
    this.setState({ [type]: value });
  }

  onClose = () => {
    this.setState({
      hour: 1,
      minute: 1,
      second: 1,
      time: null,
      visible: false,
    });
  }

  onSelect = () => {
    this.setState({
      hour: 1,
      minute: 1,
      second: 1,
      visible: false,
    });
  }

  render() {
    const {
      hour, minute, second, time, visible,
    } = this.state;
    const {
      navigation: {
        goBack, navigate,
      },
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={ConnectUserTypeStyles.wrapper}>
            <StepBar count={5} selected={[0, 1, 2, 3, 4]} />
            <View style={ConnectUserTypeStyles.inputWrapper}>
              <Text style={ConnectUserTypeStyles.input}>{'Distance to race'}</Text>
              {times.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={ConnectUserTypeStyles.button}
                  activeOpacity={0.7}
                  onPress={() => this.onTypeChange(t.value)}
                >
                  <Text style={ConnectUserTypeStyles.buttonText}>{'     '}</Text>
                  <Text style={[ConnectUserTypeStyles.buttonText, { color: time === t.value ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{t.label}</Text>
                  {time === t.value ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
                </TouchableOpacity>
              ))}
            </View>
            <View style={[Repeat5KStyles.buttonsWrapper, DistanceStyles.buttonsWrapper]}>
              <View style={ConnectUserTypeStyles.buttons}>
                <TouchableOpacity
                  style={[AuthStyle.introButton, { backgroundColor: Constants.Colors.TRANSPARENT }]}
                  activeOpacity={0.7}
                  onPress={() => goBack()}
                >
                  <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Back'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={AuthStyle.introButton}
                  activeOpacity={0.7}
                  onPress={() => navigate('Location')}
                >
                  <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Next'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {visible && (
          <TimePicker
            visible
            hour={hour}
            minute={minute}
            second={second}
            onValueChange={this.onValueChange}
            onPress={this.onSelect}
            onClose={this.onClose}
          />
        )}
      </View>
    );
  }
}

Distance.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default Distance;
