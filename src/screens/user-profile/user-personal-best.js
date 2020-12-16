import React, { Component } from 'react';
import { Platform, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bool, func, shape } from 'prop-types';
import { AuthStyle, CommonStyles, ConnectUserTypeStyles, Repeat5KStyles } from '../../styles';
import { StepBar } from '../../components';
import Constants from '../../constants';

const times = [{
  color: Constants.Colors.LIGHT_BLUE,
  label: '< 18 minutes',
  value: 'lessThan18Minutes',
}, {
  color: Constants.Colors.LIGHT_RED,
  label: '18-20 minutes',
  value: 'between18and20',
}, {
  color: Constants.Colors.LIGHT_YELLOW,
  label: '20-23 minutes',
  value: 'between20and23',
}, {
  color: Constants.Colors.LIGHT_PINK,
  label: '23-26 minutes',
  value: 'between23and26',
}, {
  color: Constants.Colors.DARK_YELLOW,
  label: '26-30 minutes',
  value: 'between26and30',
}, {
  color: Constants.Colors.LIGHT_GREEN,
  label: '> 30 minutes/Unknown',
  value: 'moreThan30',
}];

class UserPersonalBest extends Component {
  constructor() {
    super();
    this.state = { time: null };
  }

  onTypeChange = (payload) => this.setState({ time: payload })

  render() {
    const { time } = this.state;
    const {
      navigation: {
        goBack, navigate,
      },
      route: { params },
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={ConnectUserTypeStyles.wrapper}>
            {!params?.isEditMode && <StepBar count={5} selected={[0, 1, 2, 3]} />}
            <View style={ConnectUserTypeStyles.inputWrapper}>
              {!params?.isEditMode && <Text style={[ConnectUserTypeStyles.input, Repeat5KStyles.header]}>{'What is your recent 5km time?'}</Text>}
              {times.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[ConnectUserTypeStyles.button, { backgroundColor: t.color }]}
                  activeOpacity={0.7}
                  onPress={() => this.onTypeChange(t.value)}
                >
                  <Text style={Repeat5KStyles.buttonText}>{'     '}</Text>
                  <Text style={[Repeat5KStyles.buttonText, time === t.label && Repeat5KStyles.active]}>{t.label}</Text>
                  {time === t.value ? <Ionicons name="checkmark-sharp" size={25} color={Constants.Colors.BLACK} style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        {params?.isEditMode ? (
          <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, Repeat5KStyles.saveBtn]} onPress={() => goBack()}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={Repeat5KStyles.buttonsWrapper}>
            <View style={[ConnectUserTypeStyles.buttons, Repeat5KStyles.buttons]}>
              <TouchableOpacity style={[AuthStyle.introButton, { backgroundColor: Constants.Colors.TRANSPARENT }]} activeOpacity={0.7} onPress={() => goBack()}>
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Back'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={AuthStyle.introButton} activeOpacity={0.7} onPress={() => navigate('Distance')}>
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Next'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

UserPersonalBest.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({ params: shape({ isEditMode: bool }) }).isRequired,
};

export default UserPersonalBest;
