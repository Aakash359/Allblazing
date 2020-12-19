import React, { Component } from 'react';
import { Platform, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, ContactUSStyles, UsernameStyle } from '../../styles';
import { InputField } from '../../components';

class ContactUs extends Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor() {
    super();
    this.state = {
      description: '',
      subject: '',
    };
  }

  onChangeText = (description) => {
    this.setState({ description });
  }

  render() {
    const {
      description, subject,
    } = this.state;
    const { navigation: { goBack } } = this.props;

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
            <View style={UsernameStyle.inputWrapper}>
              <InputField
                placeholder='Subject'
                returnKeyType="next"
                value={subject}
                onChangeText={(text) => this.setState({ subject: text })}
                onSubmitEditing={() => this.descriptionRef.current.focus()}
              />
              <View style={CommonStyles.textAreaWrapper}>
                <TextInput
                  multiline
                  ref={this.descriptionRef}
                  maxLength={500}
                  numberOfLines={15}
                  style={CommonStyles.textArea}
                  placeholder="Description"
                  value={description}
                  onChangeText={this.onChangeText}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  onSubmitEditing={() => goBack()}
                  underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, ContactUSStyles.saveBtn]} onPress={() => goBack()}>
              <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Submit'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ContactUs.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default ContactUs;
