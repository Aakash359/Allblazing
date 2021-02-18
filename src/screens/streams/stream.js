import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Share from 'react-native-share';
import {CommonActions} from '@react-navigation/native';
import {bool, func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {InputField} from '../../components';
import {AuthStyle, StreamStyles} from '../../styles';
import {wearableOptions} from '../../data';
import RtcEngine from 'react-native-agora';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
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
      join: false,
      flash:false
      
    };
    this.AgoraEngine = React.createRef();
  }

  init = async () => {
    this.AgoraEngine.current = await RtcEngine.create(
      '22143d65ab6a440099dec92cbb2c6f2f',
    );
    // this.AgoraEngine.current.createDataStream(true, true).then(data => {
    //   console.log("dataaattaaa", data)
    //   setStreamID(data)
      
    // }
    // )
    this.AgoraEngine.current.enableVideo();
    this.AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
    if (isBroadcaster)this.AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
    
    
    this.AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        this.setState({ join: true });
      },
    );
    
    //   this.AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
    //     console.log('UserJoined', uid, elapsed)
        
    //     if (userCount.indexOf(uid) === -1) {
    //         setUserCount([...userCount, uid])
                
    //     }
    // })

    // this.AgoraEngine.current.addListener(
    //   'StreamMessage',
    //   (uid, streamid, data) => {
    //     let data2 = {
    //      id:Math.floor(Math.random()*100)+1,
    //       message:data
    //     }
        
       
      
    //     setChat(chat => [...chat, data2])
    //       console.log('Messgage', chat,data2);
    //   },
    // );
    // this.AgoraEngine.current.addListener(
    //   'StreamMessageError',
    //   (data) => {
    //     console.log('Messgage', data);
        
    //   },
    // );

   this.AgoraEngine.current.addListener(
      'LeaveChannel',
      (data) => {
        console.log('LeaeveChhannel', data);
         navigation.navigate('Home');
      },
   );
    
    this.AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
      // if (uid === 1) setBroadcasterVideoState(state);
      console.log("Startuusss changed" ,state)
    });
  };
  permissionAsk = async () => { if (Platform.OS === 'android') await requestCameraAndAudioPermission(); }
  destroy = async () => { await AgoraEngine.current.destroy(); }
  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.onKeyboardOpen);
    Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
   
  }
onSwitchCamera = () => {
     console.log("Called22") 
    AgoraEngine.current.switchCamera()
  };
   LeaveChannel = () => {
   
    AgoraEngine.current.leaveChannel()
  };
   touchOn = () => {
     console.log("Called") 
     AgoraEngine.current.setCameraTorchOn(true)
  } 

   SendMessge = () => {
  console.log('mesaageData',streamID,message)
    AgoraEngine.current.sendStreamMessage(streamID,message)
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
    const height = value
      ? (Constants.BaseStyle.DEVICE_HEIGHT * 55) / 100
      : (Constants.BaseStyle.DEVICE_HEIGHT * 38) / 100;

    this.setState({
      height,
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
       this.init().then(() =>
      this.AgoraEngine.current.joinChannel(
        '00622143d65ab6a440099dec92cbb2c6f2fIAAy+D63R4sEiYqDUxm8+cC7zM2lgTC715DZaA7xe3wAGMgIv5MAAAAAEABwjq6P4l4nYAEAAQDiXidg',
        'live_stream',
        null,
        uid,
      ),
    );
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
      <TouchableOpacity
        activeOpacity={1}
        style={StreamStyles.container}
        onPress={this.onOutsideClick}>
        <ImageBackground
          style={StreamStyles.background}
          source={Constants.Images.liveStream}>
          {!this.state.joined ? (
        <>
          <ActivityIndicator
            size={60}
            color="#fff"
            style={styles.activityIndicator}
          />
         
        </>):<RtcLocalView.SurfaceView
              style={{  width: dimensions.width,
    height: dimensions.height,}}
              channelId={props.route.params.channel}
                />}
          <View style={StreamStyles.row}>
            {params?.isStreamStarted && (
              <Image
                resizeMode="contain"
                source={Constants.Images.liveLogo}
                style={StreamStyles.logo}
              />
            )}
            {params?.isFinished ? (
              <View style={[StreamStyles.row, StreamStyles.headerIcons]}>
                <TouchableOpacity activeOpacity={0.7} onPress={this.onShare}>
                  <Image
                    resizeMode="contain"
                    source={Constants.Images.share}
                    style={StreamStyles.camera}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[StreamStyles.row, StreamStyles.headerIcons]}>
                {params?.isStreamStarted && (
                  <View style={StreamStyles.header}>
                    <Text style={StreamStyles.headerText}>02:05</Text>
                  </View>
                )}
                  <TouchableOpacity activeOpacity={0.7} onPress={this.touchOn}>
                  <Image
                    resizeMode="contain"
                    source={Constants.Images.flash}
                    style={StreamStyles.flash}
                  />
                </TouchableOpacity>
                 <TouchableOpacity activeOpacity={0.7} onPress={this.onSwitchCamera}>
                  <Image
                    resizeMode="contain"
                    source={Constants.Images.rotate}
                    style={StreamStyles.camera}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {params?.isStreamStarted || params?.isFinished ? (
            <View style={StreamStyles.button}>
              {params?.isFinished ? (
                <View style={StreamStyles.row}>
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.deleteBtn]}
                    activeOpacity={0.7}
                    onPress={this.onDelete}>
                    <Text
                      style={[
                        AuthStyle.buttonText,
                        StreamStyles.deleteBtnText,
                      ]}>
                      {translate('Delete')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.homeBtn]}
                    activeOpacity={0.7}
                    onPress={this.onDelete}>
                    <Text
                      style={[
                        AuthStyle.buttonText,
                        {color: Constants.Colors.WHITE},
                      ]}>
                      {translate('Home')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {toggle && (
                    <Image
                      resizeMode="contain"
                      source={Constants.Images.health}
                      style={StreamStyles.healthData}
                    />
                  )}
                  <TouchableOpacity
                    style={[AuthStyle.loginTouchable, StreamStyles.finishBtn]}
                    activeOpacity={0.7}
                    onPress={this.LeaveChannel}>
                    <Text
                      style={[
                        AuthStyle.buttonText,
                        {color: Constants.Colors.WHITE},
                      ]}>
                      {translate('Finish')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            <View activeOpacity={1} style={[StreamStyles.wrapper, {height}]}>
              <InputField
                value={title}
                placeholder={translate('streams.Title')}
                onChangeText={(text) => this.setState({title: text})}
                onFocus={() => this.setState({isFocused: true})}
                onBlur={() => this.setState({isFocused: false})}
              />
              <View
                style={[
                  StreamStyles.row,
                  StreamStyles.switchContainer,
                  toggle && StreamStyles.switchContainerOn,
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
                  {backgroundColor: Constants.Colors.TEXT_COLOR2},
                ]}
                activeOpacity={0.7}
                onPress={this.onLiveStream}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('streams.LiveStream')}
                </Text>
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
  route: shape({params: shape({isEditMode: bool})}).isRequired,
  t: func.isRequired,
};

export default withTranslation()(CreateStream);
