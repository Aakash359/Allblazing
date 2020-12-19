import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeStyles, AuthStyle } from '../../styles';
import { InputField } from '../../components';
import Constants from '../../constants';

class EditGroupName extends React.Component {
  constructor() {
    super();
    this.state = { groupName: 'Super Nova' };
  }

  render() {
    const { groupName } = this.state;

    return (
      <View style={HomeStyles.container}>
        <ScrollView>
          <InputField value={groupName} placeholder="Group Name" onChangeText={(text) => this.setState({ groupName: text })} />
        </ScrollView>
        <TouchableOpacity
          style={[AuthStyle.loginTouchable, {
            backgroundColor: Constants.Colors.TEXT_COLOR2, marginBottom: Constants.BaseStyle.scale(15),
          }]}
          activeOpacity={0.7}
          onPress={this.onLogin}
        >
          <Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditGroupName;
