import React, { Component } from 'react';
import { Platform, View, Image, TouchableOpacity, Text } from 'react-native';
import { func, shape } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Constants from '../../constants';
import { AuthStyle, CommonStyles, LocationStyles, UsernameStyle } from '../../styles';

class EditLocation extends Component {
  onChangeText = () => {}

  render() {
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
              <TouchableOpacity activeOpacity={1} style={[UsernameStyle.ageButton, LocationStyles.location]}>
                <Image source={Constants.Images.myLocation} style={LocationStyles.locationIcon} />
                <Text style={LocationStyles.currentLocationText}>{'United State'}</Text>
              </TouchableOpacity>
              <Text style={LocationStyles.orText}>{'or'}</Text>
              <TouchableOpacity activeOpacity={1} style={[UsernameStyle.ageButton, LocationStyles.margin]}>
                <Text style={UsernameStyle.age}>{'United State'}</Text>
                <AntIcon name="down" size={25} color="#5EC2CA" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} style={[UsernameStyle.ageButton, LocationStyles.margin]}>
                <Text style={UsernameStyle.age}>{'Santee'}</Text>
                <AntIcon name="down" size={25} color="#5EC2CA" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={[AuthStyle.saveBtn, LocationStyles.saveBtn]} onPress={() => goBack()}>
              <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

EditLocation.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default EditLocation;
