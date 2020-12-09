import React, { Component } from 'react';
import { Platform, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import Constants from '../../constants';
import { InputField, StepBar } from '../../components';
import { AuthStyle, CommonStyles, UsernameStyle } from '../../styles';

class Username extends Component {
  constructor() {
    super();
    this.state = { name: '' };
  }

  render() {
    const { name } = this.state;
    const {
      navigation: {
        goBack, navigate,
      },
      route: { params },
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
          <View style={UsernameStyle.wrapper}>
            {!params?.isEditMode && <StepBar count={5} selected={[0]} />}
            <View style={UsernameStyle.inputWrapper}>
              {!params?.isEditMode && <Text style={UsernameStyle.input}>{'What\'s your Name?'}</Text>}
              <InputField value={name} placeholder="Full Name" onChangeText={(text) => this.setState({ name: text })} />
            </View>
            <View style={UsernameStyle.buttonsWrapper}>
              {params?.isEditMode ? (
                <TouchableOpacity activeOpacity={0.7} style={AuthStyle.saveBtn} onPress={() => goBack()}>
                  <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
                </TouchableOpacity>
              ) : (
                <View style={UsernameStyle.buttons}>
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
                    onPress={() => navigate('Userage')}
                  >
                    <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Next'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Username.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({ params: shape({ isEditMode: bool }) }).isRequired,
};

export default Username;
