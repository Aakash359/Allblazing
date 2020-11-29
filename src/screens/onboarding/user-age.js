import React, { Component } from 'react';
import { View, StatusBar, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { func, shape } from 'prop-types';
import AntIcon from 'react-native-vector-icons/AntDesign';
import lodash from 'lodash';
import Constants from '../../constants';
import { AgePicker, StepBar } from '../../components';
import { AuthStyle, CommonStyles, UsernameStyle } from '../../styles';

const ageRange = lodash.times(60, (val) => ({
  label: `${val + 14}`, value: val + 14,
}));

class Userage extends Component {
  constructor() {
    super();
    this.state = {
      age: null,
      visible: false,
    };
  }

  render() {
    const {
      age, visible,
    } = this.state;
    const {
      navigation: {
        goBack, navigate,
      },
    } = this.props;

    return (
      <SafeAreaView style={CommonStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={UsernameStyle.wrapper}>
          <StepBar count={5} selected={[0, 1]} />
          <View style={UsernameStyle.inputWrapper}>
            <Text style={UsernameStyle.input}>{'How old are you?'}</Text>
            <TouchableOpacity activeOpacity={1} style={UsernameStyle.ageButton} onPress={() => this.setState({ visible: true })}>
              <Text style={UsernameStyle.age}>{age || 'Age'}</Text>
              <AntIcon name="down" size={25} color="#5EC2CA" />
            </TouchableOpacity>
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
                onPress={() => navigate('ConnectUserType')}
              >
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Next'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {visible && (
          <AgePicker
            selectedValue={age}
            items={ageRange}
            onChange={(value) => this.setState({ age: value })}
            onClose={() => this.setState({ visible: false })}
          />
        )}
      </SafeAreaView>
    );
  }
}

Userage.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default Userage;
