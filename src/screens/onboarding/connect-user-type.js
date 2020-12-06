import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, ConnectUserTypeStyles } from '../../styles';
import { StepBar } from '../../components';

class ConnectUserType extends Component {
  constructor() {
    super();
    this.state = { type: null };
  }

  onTypeChange = (payload) => this.setState({ type: payload })
  // eslint-disable-next-line consistent-return
  onPressNext = () => {
    const { navigation: { navigate } } = this.props;
    const { type } = this.state;

    if (type === 'race') {
      navigate('Distance');
    } else if (type === 'train') {
      navigate('UserPersonalBest');
    } else {
      return null;
    }
  }

  render() {
    const { type } = this.state;
    const { navigation: { goBack } } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView>
          <View style={ConnectUserTypeStyles.wrapper}>
            <StepBar count={5} selected={[0, 1, 2]} />
            <View style={ConnectUserTypeStyles.inputWrapper}>
              <Text style={ConnectUserTypeStyles.input}>{'Connect with other runners to...?'}</Text>
              <TouchableOpacity
                style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
                activeOpacity={0.7}
                onPress={() => this.onTypeChange('train')}
              >
                <Text style={AuthStyle.buttonText}>{'     '}</Text>
                <Text style={[AuthStyle.buttonText, { color: type === 'train' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Train'}</Text>
                {type === 'train' ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
                activeOpacity={0.7}
                onPress={() => this.onTypeChange('race')}
              >
                <Text style={AuthStyle.buttonText}>{'     '}</Text>
                <Text style={[AuthStyle.buttonText, { color: type === 'race' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Race'}</Text>
                {type === 'race' ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
              </TouchableOpacity>
            </View>
            <View style={ConnectUserTypeStyles.buttonsWrapper}>
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
                  onPress={this.onPressNext}
                >
                  <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Next'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ConnectUserType.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default ConnectUserType;
