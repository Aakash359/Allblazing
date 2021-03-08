import React, {useState, useRef, useEffect, useCallback} from 'react'
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView,
    TextInput,
    SafeAreaView,
    Platform,
    ActivityIndicator,
    PermissionsAndroid,
    Dimensions,
} from 'react-native'
import {LiveFeedStyles, HeaderStyles} from '../../styles'
import Constants from '../../constants'
import {PermisionPopup} from '../../components'
import RtcEngine from 'react-native-agora'
import {
    RtcLocalView,
    RtcRemoteView,
    ChannelProfile,
    ClientRole,
} from 'react-native-agora'
import API from '../../constants/baseApi'
import {useNavigation} from '@react-navigation/native'
import {
    GiftedChat,
    Bubble,
    Composer,
    InputToolbar,
    Send,
} from 'react-native-gifted-chat'
import RtmAdapter from '../../utilities/rtm-adapter'
import moment from 'moment'
import {scale} from 'react-native-size-matters'
import {
    getAuthToken,
    getGroupImage,
    getGroupName,
    getUserId,
} from '../../helpers/auth'
import axios from 'axios'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
function LiveFeed(props) {
    console.log('porssss', props.name, props.image)
    const client = new RtmAdapter()
    const [like, setLike] = useState(false)
    const [channel, setChannel] = useState('live_streaming')
    const [showPopup, setShowPopup] = useState(false)
    const [messages, setMessages] = useState([])
    const AgoraEngine = useRef()
    const [joined, setJoined] = useState(false)
    const [isTyping, setisTyping] = useState(true)
    const [chat, setChat] = useState([])
    const [userCount, setUserCount] = useState([])
    const [token, setToken] = useState('222')
    const [likes, setLikes] = useState(0)
    const [RTMtoken, setRTMToken] = useState('11')
    const [streamID, setStreamID] = useState(0)
    const dimensions = {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
    const navigation = useNavigation()

    const getRtmToken = async () => {
        const token = props.token
        const formdata = new FormData()
        formdata.append('role', '1')
        formdata.append('user_id', props.user_id)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        axios
            .post(API.RTM, formdata, config)
            .then((response) => {
                if (response?.data) {
                    console.log('mount chat ', response?.data)
                    let token = response.data.data.scalar
                    var id = props.user_id.toString()
                    client.login(id, token).then((data) => {
                        console.log('mount chat ', data)
                        subscribeChannelMessage()

                        client
                            .join(channel)
                            .then(() => {
                                console.log('join channel success RTM', channel)
                                setChannel(channel)
                                setJoined(true)
                            })
                            .catch(() => {
                                console.warn('join failured')
                            })
                    })
                }
            })
            .catch((e) => console.log('errrorrr', e))
    }

    const getRtcToken = async () => {
        const token = props.token
        const formdata = new FormData()
        formdata.append('channel_name', channel)
        formdata.append('role', '1')
        formdata.append('user_id', props.user_id)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        axios
            .post(API.RTC_TOKEN, formdata, config)
            .then((response) => {
                if (response?.data) {
                    console.log('===>response', response?.data?.data?.scalar)

                    let token = response.data.data.scalar
                    setToken(token)
                    init()
                        .then(() => {
                            AgoraEngine.current.joinChannel(
                                token,
                                channel,
                                null,
                                props.user_id
                            )
                        })
                        .catch((e) => console.log('errrorrr', e))
                }
            })
            .finally(() => {})
    }

    function renderBubble(props) {
        let User = props.currentMessage.user

        console.log('Props', props)

        if (User._id === '1') {
            return (
                <View
                    style={{
                        alignSelf: 'flex-start',
                        flexDirection: 'row',
                        margin: scale(15),
                    }}>
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                alignItems: 'flex-end',
                                backgroundColor: '#636363',
                                borderBottomLeftRadius: scale(10),
                                borderBottomRightRadius: 0,
                                borderTopLeftRadius: scale(10),
                                borderTopRightRadius: scale(10),
                                justifyContent: 'center',
                                marginVertical: scale(5),
                                padding: scale(8),
                            },
                        }}
                        textStyle={{
                            right: {
                                color: 'white',
                            },
                            left: {
                                color: 'white',
                            },
                        }}
                    />

                    <View style={styles.rightTriangle} />
                    <Text
                        style={{
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            alignItems: 'baseline',
                            position: 'absolute',
                            right: 15,
                            bottom: -12,
                            color: '#898989',
                            fontSize: 12,
                        }}>
                        {moment(props.currentMessage.createdAt).format('LT')}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{flexDirection: 'row', margin: scale(14)}}>
                    <View style={styles.leftTriangle} />

                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                alignItems: 'flex-start',
                                backgroundColor: '#252525',
                                borderBottomRightRadius: scale(10),
                                borderTopLeftRadius: scale(10),
                                borderTopRightRadius: scale(10),
                                borderBottomLeftRadius: 0,
                                justifyContent: 'center',
                                marginVertical: scale(5),
                                padding: scale(8),
                            },
                        }}
                        textStyle={{
                            right: {
                                color: 'white',
                            },
                            left: {
                                color: 'white',
                            },
                        }}
                    />

                    <Text
                        style={{
                            textAlign: 'left',
                            alignSelf: 'flex-end',
                            justifyContent: 'flex-start',
                            alignItems: 'baseline',
                            position: 'absolute',
                            left: 15,
                            bottom: -12,
                            color: '#898989',
                            fontSize: 12,
                        }}>
                        {moment(props.currentMessage.createdAt).format('LT')}
                    </Text>
                </View>
            )
        }
    }
    function renderComposer(props) {
        return (
            <Composer
                {...props}
                placeholder={'Write your messasge...'}
                placeholderTextColor={'white'}
            />
        )
    }

    function renderInputToolbar(props) {
        return (
            <InputToolbar
                {...props}
                containerStyle={styles.ChatOneToOneContainer}
            />
        )
    }

    function renderFooter() {
        if (isTyping) {
            return <Text>{this.user.name} is typing</Text>
        }
        return null
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <Icon
                    name="send-sharp"
                    style={{marginRight: -10}}
                    size={30}
                    color="white"
                />
            </Send>
        )
    }

    function subscribeChannelMessage() {
        client.on('error', () => {
            Logger.log(evt)
        })

        client.on('channelMessageReceived', () => {
            const {uid, channelId, text} = evt
            console.log('evt', evt)
            Logger.log('channelMessageReceived uid ', uid)
            if (channelId === channel) {
                setMessages((prevState) => ({
                    messages: GiftedChat.append(prevState.messages, [
                        {
                            _id: +new Date(),
                            text,
                            user: {
                                _id: +new Date(),
                                name: uid.substr(uid.length - 1, uid.length),
                            },
                            createdAt: new Date(),
                        },
                    ]),
                }))
                console.log('message from current channel', text)
            }
        })
    }

    const onSend = (messages = []) => {
        console.log('send channel', channel)
        messages.forEach((message) => {
            client
                .sendChannelMessage({
                    channel,
                    message: `${message.text}`,
                })
                .then(() => {
                    console.log('send message')
                    setMessages(GiftedChat.append(messages, [message]))
                })
                .catch(() => {
                    console.warn('send failured')
                })
        })
    }
    const init = async () => {
        AgoraEngine.current = await RtcEngine.create(
            '22143d65ab6a440099dec92cbb2c6f2f'
        )
        AgoraEngine.current.createDataStream(true, true).then((data) => {
            console.log('dataaattaaa', data)
            setStreamID(data)
        })
        AgoraEngine.current.enableVideo()
        AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting)
        AgoraEngine.current.setClientRole(ClientRole.Broadcaster)

        AgoraEngine.current.addListener(
            'JoinChannelSuccess',
            (channel, uid, elapsed) => {
                console.log('JoinChannelSuccess', channel, uid, elapsed)
                setJoined(true)
            }
        )

        AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
            console.log('UserJoined', uid, elapsed)

            if (userCount.indexOf(uid) === -1) {
                setUserCount([...userCount, uid])
            }
        })
        AgoraEngine.current.addListener(
            'StreamMessage',
            (uid, streamid, data) => {
                let data2 = {
                    id: Math.floor(Math.random() * 100) + 1,
                    message: data,
                }

                setChat((chat) => [...chat, data2])
                console.log('Messgage', chat, data2)
            }
        )
        AgoraEngine.current.addListener('StreamMessageError', (data) => {
            console.log('Messgage', data)
        })

        AgoraEngine.current.addListener('LeaveChannel', (data) => {
            console.log('LeaeveChhannel', data)
            client.leave(channel)
            navigation.navigate('Home')
        })

        AgoraEngine.current.addListener(
            'RemoteVideoStateChanged',
            (uid, state) => {
                // if (uid === 1) setBroadcasterVideoState(state);
            }
        )
    }
    const requestCameraAndAudioPermission = async () => {
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
    const permissionAsk = async () => {
        if (Platform.OS === 'android') await requestCameraAndAudioPermission()
    }

    const destroy = async () => {
        await AgoraEngine.current.destroy()
    }

    useEffect(() => {
        permissionAsk()
        getRtcToken()
        getRtmToken()
    }, [])

    const LeaveChannel = () => {
        client.logout()
        client.destroy()
        AgoraEngine.current.leaveChannel()
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <Image
                    source={Constants.Images.send}
                    style={LiveFeedStyles.messageIcon}
                />
            </Send>
        )
    }
    function renderTime(props) {
        return (
            <Time {...props}>
                <Text>{''}</Text>
            </Time>
        )
    }
    function renderInputToolbar(props) {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    alignItems: 'flex-start',
                    backgroundColor: '#212121',
                    borderBottomRightRadius: Constants.BaseStyle.scale(10),
                    borderTopLeftRadius: Constants.BaseStyle.scale(10),
                    borderTopRightRadius: Constants.BaseStyle.scale(10),
                    justifyContent: 'center',
                    borderColor: '#212121',
                    borderTopWidth: 0,
                    marginVertical: Constants.BaseStyle.scale(5),
                    padding: Constants.BaseStyle.scale(4),
                }}
            />
        )
    }
    return (
        <SafeAreaView style={[LiveFeedStyles.container]}>
            <View style={LiveFeedStyles.sectionMainView2}>
                <TouchableOpacity
                    style={{width: 60}}
                    activeOpacity={0.7}
                    onPress={LeaveChannel}>
                    <Image
                        resizeMode="contain"
                        style={HeaderStyles.crossIcon}
                        source={Constants.Images.back}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        width: '40%',
                    }}>
                    <Text style={{color: 'white'}}>Live</Text>
                </View>
            </View>

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
                <>
                    <RtcLocalView.SurfaceView
                        style={{
                            width: dimensions.width,
                            height: dimensions.height / 3,
                            position: 'relative',
                        }}
                        channelId={channel}
                    />

                    {/* <RtcRemoteView.SurfaceView
                  uid={1}
                  style={{width: dimensions.width,
    height: dimensions.height/2,
    position:'relative'}}
                  channelId={'live_stream'}
                /> */}
                    <View style={LiveFeedStyles.overlappingStyle}>
                        <View style={LiveFeedStyles.flexRow}>
                            <View style={LiveFeedStyles.levelStyle}>
                                <Text style={LiveFeedStyles.liveText}>
                                    Live
                                </Text>
                            </View>
                            <Text style={LiveFeedStyles.followerView}>
                                {userCount.length + ' ' + 'Viewers'}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {}}>
                            {props.image ? (
                                <Image
                                    source={{uri: props.image}}
                                    style={{
                                        borderRadius: Constants.BaseStyle.scale(
                                            25
                                        ),
                                        height: Constants.BaseStyle.scale(50),
                                        width: Constants.BaseStyle.scale(50),
                                    }}
                                />
                            ) : (
                                <Image
                                    source={Constants.Images.profilePic}
                                    style={{
                                        borderRadius: Constants.BaseStyle.scale(
                                            25
                                        ),
                                        height: Constants.BaseStyle.scale(50),
                                        width: Constants.BaseStyle.scale(50),
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={{height: dimensions.height / 2}}>
                        <View style={LiveFeedStyles.sectionMainView}>
                            <View style={LiveFeedStyles.flexRow}>
                                <Image
                                    source={Constants.Images.user1}
                                    style={LiveFeedStyles.liveUserIcone}
                                />
                                <View style={LiveFeedStyles.sectionView}>
                                    <Text style={LiveFeedStyles.heading}>
                                        {props.full_name + ' , ' + '23'}
                                    </Text>
                                    <Text style={LiveFeedStyles.subHeading}>
                                        {'text'}
                                    </Text>
                                </View>
                            </View>
                            <View style={LiveFeedStyles.sectionView}>
                                <View style={LiveFeedStyles.heartView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setLike(!like)
                                        }}>
                                        <Image
                                            source={Constants.Images.heart}
                                            style={LiveFeedStyles.messageIcon}
                                        />
                                    </TouchableOpacity>
                                    <Text style={LiveFeedStyles.followText}>
                                        {likes}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Text style={LiveFeedStyles.commentHeader}>
                            {'Comments'}
                        </Text>
                        {/* <GiftedChat
                 listViewProps={{
            style: {
                     backgroundColor: 'black',
              marginBottom:40
            },
                }}
                renderTime={() => null}
                renderUsernameOnMessage ={true}
                renderInputToolbar={renderInputToolbar}
                alwaysShowSend={true}
                messages={messages}
                renderSend={renderSend}
                 textInputStyle={ { color: 'white'}}
               onSend={messages => onSend(messages)}
                user={{
                  _id: 11,
                  name: 'React Native',
                  avatar: 'https://placeimg.com/140/140/any',
                }}
              /> */}
                        <GiftedChat
                            messages={messages}
                            listViewProps={{
                                style: {
                                    backgroundColor: 'black',
                                },
                            }}
                            renderUsernameOnMessage={true}
                            renderAvatar={() => null}
                            renderTime={() => null}
                            alwaysShowSend={true}
                            textInputStyle={{color: 'white'}}
                            renderBubble={renderBubble}
                            renderComposer={renderComposer}
                            renderInputToolbar={renderInputToolbar}
                            renderSend={renderSend}
                            renderFooter={renderFooter}
                            onSend={(messages) => onSend(messages)}
                            isTyping={true}
                            user={{
                                _id: '1',
                                name: 'manoj',
                            }}
                        />
                    </View>
                </>
            )}

            {showPopup && (
                <PermisionPopup
                    onLogout={() => setShowPopup(!showPopup)}
                    onCancel={() => setShowPopup(false)}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ChatOneToOneContainer: {
        alignItems: 'flex-start',
        backgroundColor: '#212121',
        borderTopLeftRadius: scale(10),
        borderTopRightRadius: scale(10),
        justifyContent: 'center',
        padding: scale(14),
        borderTopWidth: 0,
    },

    leftTriangle: {
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
        borderRightColor: 'transparent',
        borderRightWidth: scale(15),
        borderStyle: 'solid',
        marginLeft: -1.5,
        borderTopColor: '#252525',
        borderTopWidth: scale(15),
        height: 0,
        marginBottom: scale(5),
        transform: [{rotate: '180deg'}],
        width: 0,
    },
    rightTriangle: {
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
        borderRightColor: 'transparent',
        borderRightWidth: scale(15),
        borderStyle: 'solid',
        borderTopColor: '#636363',
        marginLeft: -1.5,
        borderTopWidth: scale(15),
        height: 0,
        marginBottom: scale(5),
        transform: [{rotate: '270deg'}],
        width: 0,
    },
})

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
    addCreateGroupDetail: (params) => setCreateGroupDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(LiveFeed))
