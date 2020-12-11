import React from 'react';
import { ImageBackground, View, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import Share from 'react-native-share';
import { CommonActions } from '@react-navigation/native';
import { bool, func, shape } from 'prop-types';
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
      height: Constants.BaseStyle.scale(310),
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
    const { toggle } = this.state;

    this.setState({ height: toggle ? Constants.BaseStyle.scale(490) : Constants.BaseStyle.scale(480) });
  };

  onKeyboardHide = () => {
    const { toggle } = this.state;

    this.setState({ height: toggle ? Constants.BaseStyle.scale(400) : Constants.BaseStyle.scale(310) });
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
    const height = value ? Constants.BaseStyle.scale(460) : Constants.BaseStyle.scale(310);

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
        message: 'test',
        title: 'Allblazing',
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
    const { route: { params } } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} style={StreamStyles.container} onPress={this.onOutsideClick}>
        <ImageBackground style={StreamStyles.background} source={Constants.Images.liveStream}>
          <View style={StreamStyles.row}>
            {params?.isStreamStarted && (
              <View style={StreamStyles.header}>
                <Text style={StreamStyles.headerText}>Live</Text>
                <Text style={StreamStyles.headerText}>02:05</Text>
              </View>
            )}
            {params?.isFinished ? (
              <View style={[StreamStyles.row, StreamStyles.headerIcons]}>
                <TouchableOpacity activeOpacity={0.7} onPress={this.onShare}>
                  <Image resizeMode='contain' source={Constants.Images.share} style={StreamStyles.camera} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[StreamStyles.row, StreamStyles.headerIcons]}>
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
                    <Text style={[AuthStyle.buttonText, StreamStyles.deleteBtnText]}>{'Delete'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.homeBtn]}
                    activeOpacity={0.7}
                    onPress={this.onDelete}
                  >
                    <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Home'}</Text>
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
                    <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Finish'}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View activeOpacity={1} style={[StreamStyles.wrapper, { height }]}>
              <InputField
                value={title}
                placeholder="Title of your stream"
                onChangeText={(text) => this.setState({ title: text })}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
              />
              <View style={[StreamStyles.row, StreamStyles.switchContainer, toggle && StreamStyles.switchContainerOn]}>
                <Text style={StreamStyles.subHeader}>Show wearable health data</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={this.onToggle}>
                  <Image resizeMode='contain' source={toggle ? Constants.Images.toggleOn : Constants.Images.toggleOff} style={StreamStyles.switch} />
                </TouchableOpacity>
              </View>
              {toggle && (
                <View style={StreamStyles.row}>
                  {wearableOptions.map((dis) => (
                    <TouchableOpacity
                      onPress={() => this.onSelect(dis.value)}
                      key={dis.value}
                      activeOpacity={0.7}
                      style={[StreamStyles.race, selected.includes(dis.value) && StreamStyles.raceActive]}
                    >
                      <Text style={[StreamStyles.raceText, selected.includes(dis.value) && StreamStyles.raceActiveText]}>{`${dis.label}`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <TouchableOpacity
                style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
                activeOpacity={0.7}
                onPress={this.onLiveStream}
              >
                <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Live Stream'}</Text>
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
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isEditMode: bool }) }).isRequired,
};

export default CreateStream;
