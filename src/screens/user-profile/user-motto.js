import React, { Component } from 'react';
import { Platform, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, MottoStyles, RegisterStyle, UsernameStyle } from '../../styles';

class UserMotto extends Component {
  constructor() {
    super();
    this.state = { motto: '' };
  }

  onChangeText = (motto) => {
    this.setState({ motto });
  }

  render() {
    const { motto } = this.state;
    const { navigation: { goBack } } = this.props;

    return (
      <View style={CommonStyles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={UsernameStyle.wrapper}>
            <View style={UsernameStyle.inputWrapper}>
              <View style={CommonStyles.textAreaWrapper}>
                <TextInput
                  multiline
                  maxLength={60}
                  numberOfLines={15}
                  style={CommonStyles.textArea}
                  placeholder="Motto"
                  value={motto}
                  onChangeText={this.onChangeText}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                />
              </View>
              <Text style={RegisterStyle.mottoCount}>{`${motto.length}/60`}</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, MottoStyles.saveBtn]} onPress={() => goBack()}>
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

UserMotto.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default UserMotto;
