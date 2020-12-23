import React from 'react';
import { Platform, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { bool, func, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../constants';
import { CommonStyles, BlockUserStyles, AuthStyle, ForgotPassStyles } from '../styles';
import { blockReportReasons } from '../data';

class BlockUser extends React.Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      reason: null,
    };
  }

  render() {
    const {
      reason, description,
    } = this.state;
    const {
      navigation: { goBack },
      route: { params },
      t: translate,
    } = this.props;

    return (
      <View style={CommonStyles.container}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always"
        >
          <View style={[ForgotPassStyles.wrapper, BlockUserStyles.container]}>
            <Text style={BlockUserStyles.title}>{`${params?.isBlockPage ? translate('actions.blockBtnTitle') : translate('actions.reportBtnTitle')}`}</Text>
            <Text style={BlockUserStyles.subtitle}>
              {params?.isBlockPage ? translate('actions.blockBtnSubtitle') : translate('actions.reportConfirmation')}
            </Text>
          </View>
          {blockReportReasons.map((singleElement) => (
            <TouchableOpacity
              key={singleElement.value}
              style={[AuthStyle.loginTouchable, AuthStyle.loginTouchableRow, BlockUserStyles.button, singleElement.value === 'Other' && reason === 'Other' && BlockUserStyles.otherBtn]}
              activeOpacity={0.7}
              onPress={() => this.setState({ reason: singleElement.value })}
            >
              <Text style={[AuthStyle.buttonLanguageText, BlockUserStyles.buttonText, reason === singleElement.value ? AuthStyle.buttonActiveText : {}]}>{translate(singleElement.label)}</Text>
              {reason === singleElement.value && <Image source={Constants.Images.check} resizeMode='contain' style={[AuthStyle.checkImg, BlockUserStyles.select]} />}
            </TouchableOpacity>
          ))}
          {reason === 'Other' && (
            <View style={[CommonStyles.textAreaWrapper, BlockUserStyles.textAreaWrapper]}>
              <TextInput
                multiline
                maxLength={450}
                numberOfLines={20}
                style={CommonStyles.textArea}
                placeholder={translate('Please describe here...')}
                value={description}
                onChangeText={(text) => this.setState({ description: text })}
                placeholderTextColor={Constants.Colors.TEXT_COLOR}
                underlineColorAndroid={Constants.Colors.TRANSPARENT}
              />
            </View>
          )}
          <View style={BlockUserStyles.space} />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[AuthStyle.saveBtn, reason == null && BlockUserStyles.saveBtnColor, BlockUserStyles.saveBtn]}
          onPress={() => goBack()}
        >
          <Text style={[AuthStyle.buttonLanguageText, reason && AuthStyle.buttonActiveText]}>{translate('Submit')}</Text>
        </TouchableOpacity>
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
  t: func.isRequired,
};

export default withTranslation()(BlockUser);
