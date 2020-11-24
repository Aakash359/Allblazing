import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { func, shape } from 'prop-types';
import { Colors } from '../../Config';
import { InputContainer, Bar } from '../../Components';
import { AuthStyle, CommonStyles, UsernameStyle } from './AuthStyle';

class Username extends Component {
  constructor() {
    super();
    this.state = { name: '' };
  }

  render() {
    const { name } = this.state;
    const { navigation: { goBack } } = this.props;

    return (
      <SafeAreaView style={CommonStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={UsernameStyle.wrapper}>
          <Bar count={5} selected={0} />
          <View style={UsernameStyle.inputWrapper}>
            <Text style={UsernameStyle.input}>
              {'What\'s your Name?'}
            </Text>
            <InputContainer value={name} place="Full Name" onPress={(text) => this.setState({ name: text })} />
          </View>
          <View style={UsernameStyle.buttonsWrapper}>
            <View style={UsernameStyle.buttons}>
              <TouchableOpacity
                style={[AuthStyle.UsernameButton, { backgroundColor: Colors.TRANSPARENT }]}
                activeOpacity={0.7}
                onPress={() => goBack()}
              >
                <Text style={[AuthStyle.buttonText, { color: Colors.WHITE }]}>{'Back'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={AuthStyle.introButton}
                activeOpacity={0.7}
                onPress={() => alert('Next Screen')}
              >
                <Text style={[AuthStyle.buttonText, { color: Colors.WHITE }]}>{'Next'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
