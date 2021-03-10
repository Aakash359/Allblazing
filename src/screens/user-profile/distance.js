import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {
  AuthStyle,
  DistanceStyles,
  CommonStyles,
  ConnectUserTypeStyles,
  Repeat5KStyles,
} from '../../styles';
import {StepBar, TimePicker} from '../../components';
import {distanceList} from '../../data';
import { setUserDistance } from '../../helpers/auth';


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
  DistanceStore = () => {
    if (this.state.time === null) {
      Alert.alert('', 'Please select distance to race', '');
    } else {
      setUserDistance(this.state.time);
     this.props.navigation.navigate('Location', {type: 'race'});
    }
    
  }
  

  onTypeChange = (payload) => {
    this.setState({
      time: payload,
      visible: true,
      
    });
  };

  onValueChange = (value, type) => {
    this.setState({[type]: value});
  };

  onClose = () => {
    this.setState({
      hour: 1,
      minute: 1,
      second: 1,
      time: null,
      visible: false,
    });
  };

  onSelect = () => {
    this.setState({
      hour: 1,
      minute: 1,
      second: 1,
      visible: false,
    });
  };

  render() {
    const {hour, minute, second, time, visible} = this.state;
    const {
      navigation: {goBack, navigate},
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={ConnectUserTypeStyles.wrapper}>
            <StepBar count={5} selected={[0, 1, 2, 3, ]} />
            <View style={ConnectUserTypeStyles.inputWrapper}>
              <Text style={ConnectUserTypeStyles.input}>
                {translate('distance.title')}
              </Text>
              {distanceList.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[ConnectUserTypeStyles.button, DistanceStyles.button]}
                  activeOpacity={0.7}
                  onPress={() => this.onTypeChange(t.value)}>
                  <Text
                    style={[
                      ConnectUserTypeStyles.buttonText,
                      DistanceStyles.buttonText,
                      {
                        color:
                          time === t.value
                            ? Constants.Colors.TEXT_COLOR_WHITE
                            : Constants.Colors.TEXT_COLOR2,
                      },
                    ]}>
                    {translate(t.label)}
                  </Text>
                  {time === t.value && (
                    <Image
                      source={Constants.Images.check}
                      resizeMode="contain"
                      style={[AuthStyle.checkImg, DistanceStyles.select]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            Repeat5KStyles.buttonsWrapper,
            DistanceStyles.buttonsWrapper,
          ]}>
          <View style={ConnectUserTypeStyles.buttons}>
            <TouchableOpacity
              style={[
                AuthStyle.introButton,
                {backgroundColor: Constants.Colors.TRANSPARENT},
              ]}
              activeOpacity={0.7}
              onPress={() => goBack()}>
              <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {translate('Back')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AuthStyle.introButton}
              activeOpacity={0.7}
              onPress={() => this.DistanceStore()}
              
              >
              <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {translate('Next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {visible && (
          <TimePicker
            visible
            value={this.state.time}
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
  t: func.isRequired,
};

export default withTranslation()(Distance);
