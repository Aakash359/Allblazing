import React, { Component } from 'react';
import { Platform, ScrollView, View, StatusBar, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { func, shape } from 'prop-types';
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
    } = this.props;

    return (
      <SafeAreaView style={CommonStyles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={UsernameStyle.wrapper}>
            <StepBar count={5} selected={[0]} />
            <View style={UsernameStyle.inputWrapper}>
              <Text style={UsernameStyle.input}>{'What\'s your Name?'}</Text>
              <InputField value={name} placeholder="Full Name" onChangeText={(text) => this.setState({ name: text })} />
            </View>
            <View style={UsernameStyle.buttonsWrapper}>
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Username.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default Username;
