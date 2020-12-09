import React from 'react';
import { ImageBackground, Platform, View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from '../../constants';
import { InputField } from '../../components';
import { CommonStyles, StreamStyles } from '../../styles';
import { wearableOptions } from '../../data';

class CreateStream extends React.Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      title: '',
      toggle: false,
    };
  }

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

  render() {
    const {
      selected, title, toggle,
    } = this.state;

    return (
      <View style={CommonStyles.container}>
        <ImageBackground style={StreamStyles.background} source={Constants.Images.liveStream}>
          <View style={StreamStyles.wrapper}>
            <KeyboardAwareScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
              keyboardShouldPersistTaps="always"
            >
              <InputField value={title} placeholder="Title of your stream" onChangeText={(text) => this.setState({ title: text })} />
              <View style={[StreamStyles.row, StreamStyles.switchContainer]}>
                <Text style={StreamStyles.subHeader}>Show wearable health data</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ toggle: !toggle })}>
                  <Image source={toggle ? Constants.Images.toggleOn : Constants.Images.toggleOff} style={StreamStyles.switch} />
                </TouchableOpacity>
              </View>
              <View style={[StreamStyles.row, StreamStyles.connectRow, StreamStyles.levelsContainer]}>
                {wearableOptions.map((dis) => (
                  <TouchableOpacity onPress={() => this.onSelect(dis.value)} key={dis.value} activeOpacity={0.7} style={[StreamStyles.race, selected.includes(dis.value) && StreamStyles.raceActive]}>
                    <Text style={[StreamStyles.raceText, selected.includes(dis.value) && StreamStyles.raceActiveText]}>{`${dis.label}`}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </KeyboardAwareScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default CreateStream;
