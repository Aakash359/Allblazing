import React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { HomeStyles, AuthStyle, ChatStyles } from '../../styles';
import Constants, {Colors} from '../../constants';
import { getAuthToken } from '../../helpers/auth';
import { Alert } from 'react-native';
import API from '../../constants/baseApi';
import Axios from 'axios';
import { ActivityIndicator } from 'react-native';

class EditGroupDisc extends React.Component {
  constructor() {
    super();
    this.state = {
      // eslint-disable-next-line no-multi-str
      groupDisc: '',
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({groupDisc: this.props.route.params.groupDescription})
  }

  updateGroupDisc = async () => {
    this.setState({isLoading: true})
    const {groupId} = this.props.route.params
    const {groupDisc} =  this.state
    const token = await getAuthToken()
    const url = `${API.GROUP_UPDATE}/${groupId}`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    const payload = {
      description: groupDisc
    }
    try {
      const res = await Axios.post(url, payload, config)
      if(res?.data?.code === 200) {
      this.setState({isLoading: false})

        Alert.alert('Group Update', res?.data?.message, [
          {text: 'Cancel'},
          {text: 'Ok', onPress: () => {
            this.props.navigation.goBack()
          } }
        ])
      }
      else {
      this.setState({isLoading: false})

        Alert.alert('Group Update', res?.data?.message, [
          {text: 'Ok', }
        ])
      }
    } catch (error) {
      this.setState({isLoading: false})
      Alert.alert('Group Update', error?.message, [
          {title: 'Ok', }
        ])
    }
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
          onPress={!this.state.isLoading && this.updateGroupDisc}
        >
          {this.state.isLoading ? <ActivityIndicator size="small" color={Colors.WHITE} /> :<Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>}

          
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditGroupDisc;
