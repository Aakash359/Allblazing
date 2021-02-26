import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity, PermissionsAndroid,
  ActivityIndicator,
  Keyboard,
  Alert
} from 'react-native';
import Share from 'react-native-share';
import {CommonActions} from '@react-navigation/native';
import {bool, func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {InputField} from '../../components';
import { AuthStyle, StreamStyles } from '../../styles';
import API from '../../constants/baseApi';
import axios from 'axios';
import { connect } from 'react-redux';
;
import { wearableOptions } from '../../data';
import { checkNotifications } from 'react-native-permissions';


class StreamSelection extends React.Component {
 

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      title: '',
      toggle: false,
      loading:false,
      channel:''
    };
  }
async requestCameraAndAudioPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
   permissionAsk = async () => {
    if (Platform.OS === 'android') {
      await this.requestCameraAndAudioPermission();
    }
   }
  getRtcToken = async () => {
    const {channel} = this.state;
    if (channel === "") {
      Alert.alert(
        '',
        'Please enter Channel Name',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
        {Cancelable: false},
      );
      return;
    }
    this.setState({loading:true})
    const token = this.props.token
    const channelName = `${channel}_${this.props.user_id}`
    const formdata = new FormData()
    formdata.append('channel_name', channelName);
    formdata.append('role', '1')
    formdata.append('user_id', this.props.user_id)
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    axios
      .post(API.RTC_TOKEN, formdata, config)
      .then((response) => {
            console.log('===>response', response?.data);    
        if (response?.data?.status ==true) {
          
                  
          let token = response.data.data.scalar

          this.setState({ rtmToken: token, loading: false })
          this.props.navigation.navigate('LiveStream' ,{token: token ,channel:channelName})
        }
        else {
          alert("somthing went wrong ")
           this.setState({ rtmToken: token,loading:false })
        }
      }).catch(e => console.log("errrorrr", e))
  }
           
    
  componentDidMount() {
    this.permissionAsk()
   
    Keyboard.addListener('keyboardDidShow', this.onKeyboardOpen);
    Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.onKeyboardOpen);
    Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide);
  }

  onKeyboardOpen = () => {
    this.setState({height: (Constants.BaseStyle.DEVICE_HEIGHT * 58) / 100});
  };

  onKeyboardHide = () => {
    const {toggle} = this.state;

    this.setState({
      height: toggle
        ? (Constants.BaseStyle.DEVICE_HEIGHT * 55) / 100
        : (Constants.BaseStyle.DEVICE_HEIGHT * 38) / 100,
    });
  };

  onSelect = (payload) => {
    const {selected} = this.state;

    let values = [...selected];

    const isExist = values.find((value) => value === payload);

    if (isExist) {
      values = values.filter((value) => value !== payload);
    } else {
      values.push(payload);
    }

    this.setState({selected: values});
  };

  onOutsideClick = () => {
    const {isFocused} = this.state;

    if (isFocused) {
      Keyboard.dismiss();
    }
  };

  onToggle = () => {
    const {toggle} = this.state;
    const value = !toggle;
   
    this.setState({
      toggle: value,
    });

    Keyboard.dismiss();
  };

  onLiveStream = () => {
    const {
      navigation: {setParams},
      route: {params},
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
        message:
          'This is for development purpose only. We will update this once app is live',
        title: 'AllBlazing',
        url: 'https://google.com',
      };

      await Share.open(options);
    } catch (e) {
      // eslint-disable-next-line no-console
      // console.log('sharing error ', e);
    }
  };

  onDelete = () => {
    const {navigation} = this.props;
    const options = {
      index: 0,
      routes: [{name: 'Dashboard'}],
    };
    const action = CommonActions.reset(options);

    navigation.dispatch(action);
  };

  render() {
    const {height, selected, title, toggle} = this.state;
    const {
      route: {params},
      t: translate,
    } = this.props;

    return (
        <View
          style={StreamStyles.background}
      >
         <InputField
                value={this.state.channel}
                placeholder={translate('streams.Title')}
                onChangeText={(text) => this.setState({channel: text})}
                onFocus={() => this.setState({isFocused: true})}
                onBlur={() => this.setState({isFocused: false})}
        />
          <View
                style={[
                  StreamStyles.row,
                  StreamStyles.switchContainer,
           
                   {justifyContent:'space-between'}
                ]}>
                <Text style={StreamStyles.subHeader}>
                  {translate('streams.Wearable')}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={this.onToggle}>
                  <Image
                    resizeMode="contain"
                    source={
                      toggle
                        ? Constants.Images.toggleOn
                        : Constants.Images.toggleOff
                    }
                    style={StreamStyles.switch}
                  />
                </TouchableOpacity>
          </View>
    
               
              {toggle && (
          <View style={StreamStyles.row}>
            
                  {wearableOptions.map((wearable) => (
                    <TouchableOpacity
                      onPress={() => this.onSelect(wearable.value)}
                      key={wearable.value}
                      activeOpacity={0.7}
                      style={[
                        StreamStyles.race,
                        selected.includes(wearable.value) &&
                          StreamStyles.raceActive,
                      ]}>
                      <Text
                        style={[
                          StreamStyles.raceText,
                          selected.includes(wearable.value) &&
                            StreamStyles.raceActiveText,
                        ]}>
                        {translate(wearable.label)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <TouchableOpacity
                style={[
                  AuthStyle.loginTouchable,
                  {backgroundColor: Constants.Colors.TEXT_COLOR2,position:'absolute',bottom:40},
                ]}
                activeOpacity={0.7}
          onPress={this.getRtcToken}>
          {this.state.loading?<ActivityIndicator size="small" color="white" />:<Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('streams.LiveStream')}
                </Text>}
              
              </TouchableOpacity>
        </View>
       
       
          
    );
  }
}


StreamSelection.propTypes = {
  navigation: shape({
    navigate: func.isRequired,
    setParams: func.isRequired,
  }).isRequired,
  route: shape({params: shape({isEditMode: bool})}).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({auth:{token,user_id,image,full_name}}) => {
    return {
        user_id,token, image ,full_name ,
    }
}

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
    addCreateGroupDetail: (params) => setCreateGroupDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(StreamSelection))

