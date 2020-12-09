import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign';
import lodash from 'lodash';
import Constants from '../../constants';
import { AgePicker, StepBar } from '../../components';
import { AuthStyle, CommonStyles, UsernameStyle } from '../../styles';
import * as actions from '../../actions/user-action-types';

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

  onAgeChange = (age) => {
    this.setState({
      age, visible: false,
    });
  }

  onVerify = () => {
    const { navigation: { goBack } } = this.props;

    goBack();
  }

  render() {
    const {
      age, visible,
    } = this.state;
    const {
      navigation: {
        goBack, navigate,
      },
      route: { params },
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <View style={UsernameStyle.wrapper}>
          {!params?.isEditMode && <StepBar count={5} selected={[0, 1]} />}
          <View style={UsernameStyle.inputWrapper}>
            {!params?.isEditMode && <Text style={UsernameStyle.input}>{'How old are you?'}</Text>}
            <TouchableOpacity activeOpacity={1} style={UsernameStyle.ageButton} onPress={() => this.setState({ visible: true })}>
              <Text style={age ? UsernameStyle.age : UsernameStyle.ageBlur}>{age || 'Age'}</Text>
              <AntIcon name="down" size={25} color="#5EC2CA" />
            </TouchableOpacity>
          </View>
          {params?.isEditMode ? (
            <TouchableOpacity activeOpacity={0.7} style={AuthStyle.saveBtn} onPress={() => goBack()}>
              <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
            </TouchableOpacity>
          ) : (
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
          )}
        </View>
        {visible && (
          <AgePicker
            selectedValue={age}
            items={ageRange}
            onConfirm={this.onAgeChange}
            onClose={() => this.setState({ visible: false })}
          />
        )}
      </View>
    );
  }
}

Userage.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({ params: shape({ isEditMode: bool }) }).isRequired,
};

export default connect(null, { logoutSuccess: actions.logoutSuccess })(Userage);
