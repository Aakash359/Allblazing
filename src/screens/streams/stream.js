import React from 'react'
import {
    ImageBackground,
    Dimensions,
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard,
    PermissionsAndroid,
    Alert,
} from 'react-native'
import Share from 'react-native-share'
import {CommonActions} from '@react-navigation/native'
import {bool, func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../../constants'
import RtcEngine from 'react-native-agora'
import {AuthStyle, StreamStyles} from '../../styles'
import {
    RtcLocalView,
    RtcRemoteView,
    ChannelProfile,
    ClientRole,
    VideoRenderMode,
} from 'react-native-agora'
import API from '../../constants/baseApi'
import axios from 'axios'
import {connect} from 'react-redux'

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
class Stream extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            timer: null,
            isFocused: false,
            selected: [],
            title: '',
            toggle: false,
            joined: false,
            flash: false,
            minutes_Counter: '00',
            seconds_Counter: '00',
            channel: '',
        }
        this.AgoraEngine = React.createRef()
    }

    init = async () => {
        this.AgoraEngine.current = await RtcEngine.create(
            '22143d65ab6a440099dec92cbb2c6f2f'
        )

        this.AgoraEngine.current.enableVideo()

        //this.AgoraEngine.current.enableAudio();
        this.AgoraEngine.current.setChannelProfile(
            ChannelProfile.LiveBroadcasting
        )

        this.AgoraEngine.current.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed)

                this.setState({joined: true})
                this.onButtonStart()
            }
        )

        this.AgoraEngine.current.addListener('LeaveChannel', (data) => {
            console.log('LeaeveChhannel', data)
            const {navigation} = this.props
            const options = {
                index: 0,
                routes: [{name: 'Dashboard'}],
            }
            const action = CommonActions.reset(options)

            navigation.dispatch(action)
        })

        this.AgoraEngine.current.addListener(
            'RemoteVideoStateChanged',
            (uid, state) => {
                // if (uid === 1) setBroadcasterVideoState(state);
                console.log('Startuusss changed', state)
                if (state == 0) {
                    Alert.alert(
                        '',
                        'Stream is finished by user',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    this.LeaveChannel()
                                    console.log('OK Pressed')
                                },
                            },
                        ],
                        {Cancelable: false}
                    )
                }
            }
        )
    }
    permissionAsk = async () => {
        if (Platform.OS === 'android') {
            await this.requestCameraAndAudioPermission()
        }
    }

    getRtcToken = async (channelName) => {
        const token = this.props.token
        const formdata = new FormData()
        formdata.append('channel_name', channelName)
        formdata.append('role', '1')
        formdata.append('user_id', this.props.user_id)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        axios
            .post(API.RTC_TOKEN, formdata, config)
            .then((response) => {
                if (response?.data) {
                    console.log('===>response', response?.data?.data?.scalar)

                    let token2 = response.data.data.scalar

                    this.init()
                        .then(() => {
                            this.AgoraEngine.current.joinChannel(
                                token2,
                                channelName,
                                null,
                                this.props.user_id
                            )
                        })
                        .catch((e) => console.log('errrorrr', e))
                }
            })
            .finally(() => {})
    }

    destroy = async () => {
        await AgoraEngine.current.destroy()
    }
<<<<<<< HEAD
  }
  
  componentWillUnmount() {
  
    Keyboard.removeListener('keyboardDidShow', this.onKeyboardOpen);
    Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide);
      clearInterval(this.state.timer);
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



  onDelete = () => {
    clearInterval(this.state.timer);
    
   
    this.AgoraEngine.current.leaveChannel();
  };
onButtonStart = () => {
 
    let timer = setInterval(() => {
 
      var num = (Number(this.state.seconds_Counter) + 1).toString(),
        count = this.state.minutes_Counter;
 
      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }
 
      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);
    this.setState({ timer });
 
    this.setState({startDisable : true})
  }
  render() {
    const { height, selected, title, toggle, joined } = this.state;
    const {
      route: { params },
      t: translate,
    } = this.props;
    const { channelName } = params
    const  {id}  = params
console.log("Dattaaaaa",channelName ,this.props.user_id)

    return (
      <View style ={{flex:1}}>
        {!joined ?
          <View style={{ flex:1 ,backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              size={30}
              color="#fff"
             
            />
            <Text style={{ color: 'white' }}>Joining Stream, Please Wait</Text>
          </View>
          : <View style={{ flex: 1 }}>
            <RtcRemoteView.SurfaceView
              style={{width: dimensions.width,
                height: dimensions.height,}}
              uid={id}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
                           
            />
            
  
            <View style={StreamStyles.button}>
              
              <TouchableOpacity
                style={[AuthStyle.loginTouchable,{ height: Constants.BaseStyle.scale(50),backgroundColor:Constants.Colors.TAB}]}
                activeOpacity={0.7}
                onPress={this.onDelete}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    { color: Constants.Colors.WHITE },
                  ]}>
                  {translate('Finish')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>}
      </View>)
  }
}
=======
    componentDidMount() {
        const {
            route: {params},
            t: translate,
            user_id,
        } = this.props
>>>>>>> dcb6bc165d236da730b7d978ae40419ebd668f40

        const {channelName} = params
        console.log('DATTAAAFORLIVE', channelName)
        this.permissionAsk()

        this.getRtcToken(channelName)
        Keyboard.addListener('keyboardDidShow', this.onKeyboardOpen)
        Keyboard.addListener('keyboardDidHide', this.onKeyboardHide)
    }
    onSwitchCamera = () => {
        console.log('Called22')
        this.AgoraEngine.current.switchCamera()
    }
    LeaveChannel = () => {
        this.AgoraEngine.current.leaveChannel()
    }

    SendMessge = () => {
        console.log('mesaageData', streamID, message)
        this.AgoraEngine.current.sendStreamMessage(streamID, message)
    }

    async requestCameraAndAudioPermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ])
            if (
                granted['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.CAMERA'] ===
                    PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('You can use the cameras & mic')
            } else {
                console.log('Permission denied')
            }
        } catch (err) {
            console.warn(err)
        }
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this.onKeyboardOpen)
        Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide)
        clearInterval(this.state.timer)
    }

    onKeyboardOpen = () => {
        this.setState({height: (Constants.BaseStyle.DEVICE_HEIGHT * 58) / 100})
    }

    onKeyboardHide = () => {
        const {toggle} = this.state

        this.setState({
            height: toggle
                ? (Constants.BaseStyle.DEVICE_HEIGHT * 55) / 100
                : (Constants.BaseStyle.DEVICE_HEIGHT * 38) / 100,
        })
    }

    onDelete = () => {
        clearInterval(this.state.timer)

        this.AgoraEngine.current.leaveChannel()
    }
    onButtonStart = () => {
        let timer = setInterval(() => {
            var num = (Number(this.state.seconds_Counter) + 1).toString(),
                count = this.state.minutes_Counter

            if (Number(this.state.seconds_Counter) == 59) {
                count = (Number(this.state.minutes_Counter) + 1).toString()
                num = '00'
            }

            this.setState({
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num,
            })
        }, 1000)
        this.setState({timer})

        this.setState({startDisable: true})
    }
    render() {
        const {height, selected, title, toggle, joined} = this.state
        const {
            route: {params},
            t: translate,
        } = this.props
        const {channelName} = params
        const {id} = params
        console.log('Dattaaaaa', channelName, this.props.user_id)

        return (
            <View style={{flex: 1}}>
                {!joined ? (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size={30} color="#fff" />
                        <Text style={{color: 'white'}}>
                            Joining Stream, Please Wait
                        </Text>
                    </View>
                ) : (
                    <View style={{flex: 1}}>
                        <RtcRemoteView.SurfaceView
                            style={{
                                width: dimensions.width,
                                height: dimensions.height,
                            }}
                            uid={id}
                            channelId={channelName}
                            renderMode={VideoRenderMode.Hidden}
                        />

                        <View style={StreamStyles.button}>
                            <TouchableOpacity
                                style={[
                                    AuthStyle.loginTouchable,
                                    {
                                        height: Constants.BaseStyle.scale(50),
                                        backgroundColor: Constants.Colors.TAB,
                                    },
                                ]}
                                activeOpacity={0.7}
                                onPress={this.onDelete}>
                                <Text
                                    style={[
                                        AuthStyle.buttonText,
                                        {color: Constants.Colors.WHITE},
                                    ]}>
                                    {translate('Finish')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

Stream.propTypes = {
    navigation: shape({
        navigate: func.isRequired,
        setParams: func.isRequired,
    }).isRequired,
    route: shape({params: shape({isEditMode: bool})}).isRequired,
    t: func.isRequired,
}
const mapStateToProps = ({auth: {token, user_id, image, full_name}}) => {
    return {
        user_id,
        token,
        image,
        full_name,
    }
}

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(Stream))
