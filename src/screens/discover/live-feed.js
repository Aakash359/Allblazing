import React, { useState, useRef,useEffect ,useCallback} from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView, TextInput, SafeAreaView,Platform,ActivityIndicator,PermissionsAndroid,Dimensions } from 'react-native';
import { LiveFeedStyles ,HeaderStyles} from '../../styles';
import Constants from '../../constants';
import { PermisionPopup } from '../../components';
import RtcEngine from 'react-native-agora';
import {
  RtcLocalView,
  RtcRemoteView,
  ChannelProfile,
  ClientRole,
 
} from 'react-native-agora';
import { useNavigation } from '@react-navigation/native';
import { GiftedChat, Send, InputToolbar, Time } from 'react-native-gifted-chat';
import RtmAdapter from '../../utilities/rtm-adapter';
function LiveFeed(props) {
   const client = new RtmAdapter()
  const [like, setLike] = useState(false);
    const [channel, setChannel] = useState('live_streaming');
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([ ]);
 const AgoraEngine = useRef();
  const [joined, setJoined] = useState(false);
  const [flash, setflash] = useState(true);
  const [chat, setChat] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [streamID, setStreamID] = useState(0);
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
   const navigation = useNavigation();
  // const comment = [
  //   {
  //     image: Constants.Images.user1, message: 'Hello!', name: 'Cassey -',
  //   },
  //   {
  //     image: Constants.Images.user2, message: 'Hello!', name: 'Clark -',
  //   },
  //   {
  //     image: Constants.Images.user3, message: 'Hello!', name: 'Alex -',
  //   },
  //   {
  //     image: Constants.Images.user4, message: 'Hello!', name: 'Jordan -',
  //   },
  //   {
  //     image: Constants.Images.user5, message: 'Hello!', name: 'Mike -',
  //   },
  //   {
  //     image: Constants.Images.user6, message: 'Hello!', name: 'Carey -',
  //   },
  // ];
// const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
//   }, [])

  function subscribeChannelMessage() {
    client.on('error', () => {
      Logger.log(evt);
    });

    client.on('channelMessageReceived', () => {
      const { uid, channelId, text } = evt;
      console.log('evt', evt);
      Logger.log('channelMessageReceived uid ', uid);
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
        }));
        console.log('message from current channel', text);
      }
    });
  }

  const onSend =(messages = [])=> {
    
    console.log('send channel', channel);
    messages.forEach((message) => {
      client
        .sendChannelMessage({
          channel,
          message: `${message.text}`,
        })
        .then(() => {
          console.log('send message');
          setMessages(GiftedChat.append(messages, [message]),
          );
        })
        .catch(() => {
          console.warn('send failured');
        });
    });
  }
  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(
      '22143d65ab6a440099dec92cbb2c6f2f',
    );
    AgoraEngine.current.createDataStream(true, true).then(data => {
      console.log("dataaattaaa", data)
      setStreamID(data)
      
    }
    )
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
      AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
    
    
    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setJoined(true);
      },
    );
    
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
         id:Math.floor(Math.random()*100)+1,
          message:data
        }
        
       
      
        setChat(chat => [...chat, data2])
          console.log('Messgage', chat,data2);
      },
    );
    AgoraEngine.current.addListener(
      'StreamMessageError',
      (data) => {
        console.log('Messgage', data);
        
      },
    );

   AgoraEngine.current.addListener(
      'LeaveChannel',
      (data) => {
        console.log('LeaeveChhannel', data);
       
    navigation.navigate('Home')
        
      },
   );
    
    AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
      // if (uid === 1) setBroadcasterVideoState(state);
    });
  };
  const permissionAsk = async () => { if (Platform.OS === 'android') await requestCameraAndAudioPermission(); }
  
  const destroy = async () => { await AgoraEngine.current.destroy(); }
  
  useEffect(() => {
   
    client.login("12").then((data) => {
   
    console.log('mount chat ', data);
    subscribeChannelMessage();
    
      client.join(channel)
      .then(() => {
        console.log('join channel success',channel);
        setChannel(channel)
        setJoined(true)
      })
      .catch(() => {
        console.warn('join failured');
      });
    });
    
    // console.log('ISSSSBRODSSST', isBroadcaster, uid);
  //   permissionAsk()
  //   init().then(() =>
  //     AgoraEngine.current.joinChannel(
  //       '00622143d65ab6a440099dec92cbb2c6f2fIADhEFw+yio/mhKRGC2zNgDnKqUmU+SuH6vi+4B9s2PB6oaYxM0NvtUaIgARmgAAueEwYAQAAQA5qn5gAwA5qn5gAgA5qn5gBAA5qn5g',
  //       'live_cast',
  //       null,
  //       2,
  //     ),
  //   );
  //  destroy()
  
  }, []);
  
  const onSwitchCamera = () => {
     console.log("Called22") 
    AgoraEngine.current.switchCamera()
  };
  const LeaveChannel = () => {
    client.leave(channel)
    AgoraEngine.current.leaveChannel()
  };
  const touchOn = () => {
     console.log("Called") 
     AgoraEngine.current.setCameraTorchOn(true)
  } 

  const SendMessge = () => {
  console.log('mesaageData',streamID,message)
    AgoraEngine.current.sendStreamMessage(streamID,message)
  }
  async function requestCameraAndAudioPermission() {
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

  function renderSend(props) {
      return (
        <Send {...props} >
       <Image
          source={Constants.Images.send}
          style={LiveFeedStyles.messageIcon}
        />
          
        
        </Send>
      );
  }
  function renderTime(props) {
      return (
        <Time {...props} >
          <Text>{""}</Text>
          
        
        </Time>
      );
  }
  function renderInputToolbar (props) {
       
       return <InputToolbar {...props} 
       containerStyle={{alignItems: 'flex-start',
        backgroundColor: '#212121',
        borderBottomRightRadius:Constants.BaseStyle.scale(10),
        borderTopLeftRadius: Constants.BaseStyle.scale(10),
        borderTopRightRadius: Constants.BaseStyle.scale(10),
         justifyContent: 'center',
         borderColor: '#212121',
        borderTopWidth: 0,
        marginVertical: Constants.BaseStyle.scale(5),
        padding: Constants.BaseStyle.scale(4),}}/>
     }
  return (
    <SafeAreaView style={[LiveFeedStyles.container]}>
      <View style={LiveFeedStyles.sectionMainView2}>
        <TouchableOpacity
          style = {{width:60}}
                activeOpacity={0.7}
                onPress={ LeaveChannel}>
                <Image
                  resizeMode="contain"
                  style={HeaderStyles.crossIcon}
                  source={Constants.Images.back}
          />
         
        </TouchableOpacity>
        <View style={{  alignItems:'flex-end',justifyContent:'flex-end',width:'40%'}}> 
   <Text style={{ color: 'white' ,}}>Live</Text>
        
        </View>
     
      </View>
       
         {!joined ? (
        <View style={{ flex:1 ,backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              size={30}
              color="#fff"
             
            />
            <Text style={{ color: 'white' }}>Joining Stream, Please Wait</Text>
          </View>
      ) : (
          <>
            
           
              {/* <RtcLocalView.SurfaceView
                style={{width: dimensions.width,
                height: dimensions.height / 3,
    position:'relative'
    }}
                channelId={'live_cast'}
              /> */}
        
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
                  <Text style={LiveFeedStyles.liveText}>Live</Text>
                </View>
                <Text style={LiveFeedStyles.followerView}>{'187 Viewers'}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {}}
              >
                <Image
                  source={Constants.Images.rotatePhone}
                  resizeMode='contain'
                  style={LiveFeedStyles.icon}
                />
              </TouchableOpacity>
            </View>
            <View style={{ height: dimensions.height / 2, }}>
            
         <View style={LiveFeedStyles.sectionMainView}>
          <View style={LiveFeedStyles.flexRow}>
            <Image
              source={Constants.Images.user1}
              style={LiveFeedStyles.liveUserIcone}
            />
            <View style={LiveFeedStyles.sectionView}>
              <Text style={LiveFeedStyles.heading}>{'Cameron Williamson, 23'}</Text>
              <Text style={LiveFeedStyles.subHeading}>{'text'}</Text>
            </View>
          </View>
          <View style={LiveFeedStyles.sectionView}>
            <View style={LiveFeedStyles.heartView}>
              <TouchableOpacity
                onPress={() => { setLike(!like); }}
              >
                <Image
                  source={like ? Constants.Images.selectedHeart : Constants.Images.heart}
                  style={LiveFeedStyles.heartIcon}
                />
              </TouchableOpacity>
              <Text style={LiveFeedStyles.followText}>{'500'}</Text>
            </View>
                </View>
               
           </View>
              <Text style={LiveFeedStyles.commentHeader}>{'Comments'}</Text>
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
        onSend={(messages) => onSend(messages)}
        user={{
          _id: '1',
        }}
      />
            </View>
          </>
            )}
     

      { showPopup && (
        <PermisionPopup
          onLogout={() => setShowPopup(!showPopup)}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </SafeAreaView>
  );
}

export default LiveFeed;
