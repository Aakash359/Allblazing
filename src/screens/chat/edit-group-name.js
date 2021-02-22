import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeStyles, AuthStyle } from '../../styles';
import { InputField } from '../../components';
import Constants, {Colors} from '../../constants';
import API from '../../constants/baseApi';
import { getAuthToken } from '../../helpers/auth';
import { Alert } from 'react-native';
import Axios from 'axios';
import { ActivityIndicator } from 'react-native';

class EditGroupName extends React.Component {
  constructor() {
    super();
    this.state = { groupName: 'Super Nova', isLoading: false };
    
  
  }

  updateGroupName = async () => {
    this.setState({isLoading: true})
    const {groupId} = this.props.route.params
    const {groupName} =  this.state
    const token = await getAuthToken()
    const url = `${API.GROUP_UPDATE}/${groupId}`
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    const payload = {
      name: groupName
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


  componentDidMount() {
    this.setState({groupName: this.props.route.params.groupName})
  }
  


  render() {
    const { groupName } = this.state;
    

    return (
      <View style={HomeStyles.container}>
        <ScrollView>
          <InputField
            style={{color: Colors.WHITE}}
            value={groupName} placeholder="Group Name" onChangeText={(text) => this.setState({ groupName: text })} />
        </ScrollView>
        <TouchableOpacity
          style={[AuthStyle.loginTouchable, {
            backgroundColor: Constants.Colors.TEXT_COLOR2, marginBottom: Constants.BaseStyle.scale(15),
          }]}
          activeOpacity={0.7}
          onPress={!this.state.isLoading && this.updateGroupName}
        >
          {this.state.isLoading ? <ActivityIndicator size="small" color={Colors.WHITE} /> :<Text style={[AuthStyle.buttonText, { color: Constants.Colors.WHITE }]}>{'Save'}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

export default EditGroupName;
