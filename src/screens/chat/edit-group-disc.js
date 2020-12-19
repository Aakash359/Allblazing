import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { HomeStyles, AuthStyle, ChatStyles } from '../../styles';
import Constants from '../../constants';

class EditGroupDisc extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line no-multi-str
      groupDisc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit \
    Suspendisse nec luctus nibh.Donec scelerisque dolor ipsum.Maecenas dapibus \
    molestie dictum.Nulla in iaculis lacus.Vivamus sollicitudin pharetra urna sed efficitur.\
    Proin mattis quam sagittis, tristique felis at, pretium turpis.Donec at ultrices sem.Donec tincidunt diam nec nisi blandit vestibulum.Praesent ut aliquam turpis,\
     sit amet scelerisque enim.Morbi scelerisque lacinia ligula ut tempor',
    };
  }

  render() {
    const { groupDisc } = this.state;

    return (
      <View style={HomeStyles.container}>

        <View style={ChatStyles.discInputContainer}>
          <TextInput
            textAlignVertical='top'
            style={ChatStyles.discInput}
            multiline
            value={groupDisc}
            placeholder="Group Name"
            onChangeText={(text) => this.setState({ groupDisc: text })}
            placeholderTextColor={Constants.Colors.TEXT_COLOR_WHITE}
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
          />
        </View>

        <TouchableOpacity
          style={[AuthStyle.loginTouchable, { backgroundColor: Constants.Colors.TEXT_COLOR2 }]}
          activeOpacity={0.7}
          onPress={this.onLogin}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditGroupDisc;
