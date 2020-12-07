import React from 'react';
import { findNodeHandle, Platform, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bool, func, shape } from 'prop-types';
import Constants from '../constants';
import { CommonStyles, BlockUserStyles, AuthStyle, ForgotPassStyles } from '../styles';

const reasons = [{
  label: 'Inappropriate messages',
  value: 'Inappropriate messages',
}, {
  label: 'Inappropriate photos/videos',
  value: 'Inappropriate photos/videos',
}, {
  label: 'Feels like spam',
  value: 'Feels like spam',
}, {
  label: 'Other',
  value: 'Other',
}];

class BlockUser extends React.Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      reason: '',
    };
  }

  handleScrollView = (ref) => {
    const scrollResponder = this.scrollViewRef.current.getScrollResponder();

    if (ref.current) {
      setTimeout(() => {
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          ref,
          (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 20,
          true,
        );
      }, 300);
    }
  };

  resetScrollView = (ref) => {
    if (ref.current) {
      const scrollResponder = this.scrollViewRef.current.getScrollResponder();

      setTimeout(() => {
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(ref, 0, true);
      }, 300);
    }
  };

  render() {
    const {
      reason, description,
    } = this.state;
    const {
      navigation: { goBack },
      route: { params },
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <KeyboardAwareScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={[ForgotPassStyles.wrapper, BlockUserStyles.container]}>
            <Text style={BlockUserStyles.title}>{`${params?.isBlockPage ? 'Block' : 'Report'} User`}</Text>
            <Text style={BlockUserStyles.subtitle}>
              {params?.isBlockPage ? 'Why are you blocking them?' : 'Is this person bothering you? Tell us what they did'}
            </Text>
          </View>
          {reasons.map((t) => (
            <TouchableOpacity
              key={t.value}
              style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow]}
              activeOpacity={0.7}
              onPress={() => this.setState({ reason: t.value })}
            >
              <Text style={AuthStyle.buttonText}>{'     '}</Text>
              <Text style={[AuthStyle.buttonLanguageText, reason === t.value ? AuthStyle.buttonActiveText : {}]}>{t.label}</Text>
              {reason === t.value ? <Image source={Constants.Images.check} resizeMode='contain' style={AuthStyle.checkImg} /> : <Text style={AuthStyle.checkImg}>{}</Text>}
            </TouchableOpacity>
          ))}
          {reason === 'Other' && (
            <View style={[CommonStyles.textAreaWrapper, BlockUserStyles.textAreaWrapper]}>
              <TextInput
                multiline
                ref={this.descriptionRef}
                maxLength={450}
                numberOfLines={20}
                style={CommonStyles.textArea}
                placeholder="Please describe here..."
                value={description}
                onChangeText={(text) => this.setState({ description: text })}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                onFocus={() => {
                  this.handleScrollView(findNodeHandle(this.descriptionRef.current));
                }}
                onBlur={() => {
                  this.resetScrollView(findNodeHandle(this.descriptionRef.current));
                }}
              />
            </View>
          )}
          <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, reason === 'Other' ? BlockUserStyles.saveBtnWithTextInput : BlockUserStyles.saveBtn]} onPress={() => goBack()}>
            <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

BlockUser.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  route: shape({ params: shape({ isEditMode: bool }) }).isRequired,
};

export default BlockUser;
