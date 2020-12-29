import React from 'react';
import { ImageBackground, View, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import Share from 'react-native-share';
import { CommonActions } from '@react-navigation/native';
import { bool, func, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { InputField } from '../../components';
import { AuthStyle, StreamStyles } from '../../styles';
import { wearableOptions } from '../../data';

class CreateStream extends React.Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      height: (Constants.BaseStyle.DEVICE_HEIGHT * 38) / 100,
      isFocused: false,
      selected: [],
      title: '',
      toggle: false,
    };
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.onKeyboardOpen);
    Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.onKeyboardOpen);
    Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide);
  }

  onKeyboardOpen = () => {
    this.setState({ height: (Constants.BaseStyle.DEVICE_HEIGHT * 58) / 100 });
  };

  onKeyboardHide = () => {
    const { toggle } = this.state;

    this.setState({ height: toggle ? (Constants.BaseStyle.DEVICE_HEIGHT * 55) / 100 : (Constants.BaseStyle.DEVICE_HEIGHT * 38) / 100 });
  };

  onSelect = (payload) => {
    const { selected } = this.state;

    let values = [...selected];

    const isExist = values.find((value) => value === payload);

    if (isExist) {
      values = values.filter((value) => value !== payload);
    } else {
      values.push(payload);
    }

    this.setState({ selected: values });
  };

  onOutsideClick = () => {
    const { isFocused } = this.state;

    if (isFocused) {
      Keyboard.dismiss();
    }
  };

  onToggle = () => {
    const { toggle } = this.state;
    const value = !toggle;
    const height = value ? (Constants.BaseStyle.DEVICE_HEIGHT * 55) / 100 : (Constants.BaseStyle.DEVICE_HEIGHT * 38) / 100;

    this.setState({
      height, toggle: value,
    });

    Keyboard.dismiss();
  }

  onLiveStream = () => {
    const {
      navigation: { setParams }, route: { params },
    } = this.props;
    const payload = {};

    if (params?.isStreamStarted) {
      payload.isStreamStarted = false;
      payload.isFinished = true;
    } else {
      payload.isStreamStarted = true;
    }

    setParams(payload);
    Keyboard.dismiss();
  };

  onShare = async () => {
    try {
      const options = {
        message: 'This is for development purpose only. We will update this once app is live',
        title: 'AllBlazing',
        url: 'https://google.com',
      };

      await Share.open(options);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('sharing error ', e);
    }
  };

  onDelete = () => {
    const { navigation } = this.props;
    const options = {
      index: 0,
      routes: [{ name: 'Dashboard' }],
    };
    const action = CommonActions.reset(options);

    navigation.dispatch(action);
  };

  render() {
    const {
      height, selected, title, toggle,
    } = this.state;
    const {
      route: { params },
      t: translate,
    } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} style={StreamStyles.container} onPress={this.onOutsideClick}>
        <ImageBackground style={StreamStyles.background} source={Constants.Images.liveStream}>
          <View style={StreamStyles.row}>
            {params?.isStreamStarted && (
              <Image resizeMode='contain' source={Constants.Images.liveLogo} style={StreamStyles.logo} />
            )}
            {params?.isFinished ? (
              <View style={[StreamStyles.row, StreamStyles.headerIcons]}>
                <TouchableOpacity activeOpacity={0.7} onPress={this.onShare}>
                  <Image resizeMode='contain' source={Constants.Images.share} style={StreamStyles.camera} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[StreamStyles.row, StreamStyles.headerIcons]}>
                {params?.isStreamStarted && (
                  <View style={StreamStyles.header}>
                    <Text style={StreamStyles.headerText}>02:05</Text>
                  </View>
                )}
                <TouchableOpacity activeOpacity={0.7}>
                  <Image resizeMode='contain' source={Constants.Images.flash} style={StreamStyles.flash} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                  <Image resizeMode='contain' source={Constants.Images.rotate} style={StreamStyles.camera} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {(params?.isStreamStarted || params?.isFinished) ? (
            <View style={StreamStyles.button}>
              {params?.isFinished ? (
                <View style={StreamStyles.row}>
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.deleteBtn]}
                    activeOpacity={0.7}
                    onPress={this.onDelete}
                  >
                    <Text style={[AuthStyle.buttonText, StreamStyles.deleteBtnText]}>{translate('Delete')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.homeBtn]}
                    activeOpacity={0.7}
                    onPress={this.onDelete}
                  >
                    <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Home')}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {toggle && <Image resizeMode='contain' source={Constants.Images.health} style={StreamStyles.healthData} />}
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.finishBtn]}
                    activeOpacity={0.7}
                    onPress={this.onLiveStream}
                  >
                    <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('Finish')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View activeOpacity={1} style={[StreamStyles.wrapper, { height }]}>
              <InputField
                value={title}
                placeholder={translate('streams.Title')}
                onChangeText={(text) => this.setState({ title: text })}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
              />
              <View style={[StreamStyles.row, StreamStyles.switchContainer, toggle && StreamStyles.switchContainerOn]}>
                <Text style={StreamStyles.subHeader}>{translate('streams.Wearable')}</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={this.onToggle}>
                  <Image resizeMode='contain' source={toggle ? Constants.Images.toggleOn : Constants.Images.toggleOff} style={StreamStyles.switch} />
                </TouchableOpacity>
              </View>
              {toggle && (
                <View style={StreamStyles.row}>
                  {wearableOptions.map((wearable) => (
                    <TouchableOpacity
                      onPress={() => this.onSelect(wearable.value)}
                      key={wearable.value}
                      activeOpacity={0.7}
                      style={[StreamStyles.race, selected.includes(wearable.value) && StreamStyles.raceActive]}
                    >
                      <Text style={[StreamStyles.raceText, selected.includes(wearable.value) && StreamStyles.raceActiveText]}>{translate(wearable.label)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <TouchableOpacity
                style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
                activeOpacity={0.7}
                onPress={this.onLiveStream}
              >
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{translate('streams.LiveStream')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

CreateStream.propTypes = {
  navigation: shape({
    navigate: func.isRequired,
    setParams: func.isRequired,
  }).isRequired,
  route: shape({ params: shape({ isEditMode: bool }) }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(CreateStream);
