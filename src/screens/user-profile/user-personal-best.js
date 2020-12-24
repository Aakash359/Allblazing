import React, { Component } from 'react';
import { Platform, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withTranslation } from 'react-i18next';
import { bool, func, shape } from 'prop-types';
import { AuthStyle, CommonStyles, ConnectUserTypeStyles, DistanceStyles, Repeat5KStyles } from '../../styles';
import { StepBar } from '../../components';
import Constants from '../../constants';
import { times } from '../../data';

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
      t: translate,
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
              {!params?.isEditMode && <Text style={[ConnectUserTypeStyles.input, Repeat5KStyles.header]}>{translate('PersonalBest')}</Text>}
              {times.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[ConnectUserTypeStyles.button, DistanceStyles.button, { backgroundColor: t.color }]}
                  activeOpacity={0.7}
                  onPress={() => this.onTypeChange(t.value)}
                >
                  <Text style={[Repeat5KStyles.buttonText, DistanceStyles.buttonText, time === t.value && Repeat5KStyles.active]}>{translate(t.label)}</Text>
                  {time === t.value && (
                    <Ionicons
                      name="checkmark-sharp"
                      size={25}
                      color={Constants.Colors.BLACK}
                      style={[AuthStyle.checkImg, DistanceStyles.select]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        {params?.isEditMode ? (
          <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, Repeat5KStyles.saveBtn]} onPress={() => goBack()}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Save')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={Repeat5KStyles.buttonsWrapper}>
            <View style={[ConnectUserTypeStyles.buttons, Repeat5KStyles.buttons]}>
              <TouchableOpacity style={[AuthStyle.introButton, { backgroundColor: Constants.Colors.TRANSPARENT }]} activeOpacity={0.7} onPress={() => goBack()}>
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Back')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={AuthStyle.introButton} activeOpacity={0.7} onPress={() => navigate('Distance')}>
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Next')}</Text>
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
  t: func.isRequired,
};

export default withTranslation()(UserPersonalBest);
