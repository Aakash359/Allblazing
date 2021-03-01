import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, TextInput,StyleSheet } from 'react-native';
import { func, shape } from 'prop-types';
import { CommonStyles, HomeStyles, InviteFriendsStyles, ChatStyles } from '../../styles';
import { MoreOptionsPopup } from '../../components';
import Constants from '../../constants';
import RtmAdapter from '../../utilities/rtm-adapter';
import { scale, } from 'react-native-size-matters';
import { GiftedChat ,Bubble,Composer,InputToolbar,Send,} from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
import { connect } from 'react-redux';
import {withTranslation} from 'react-i18next';
class ChatOneToOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '', visible: false,
      messages: [],
      channel: 'live_streaming',
      name: '',
      id: '101',
      isTyping: true,
      userData:[]
    };
  
  }

Id_generator(id,id2)
{
let num1 = parseInt(id);
let num2 = parseInt(id2);
if(num1>num2){
return `${num2}_${num1}`
}
else{
return `${num1}_${num2}`
}

}

  async handleSend(newMessage = []) {
    const {
    
      route: {params},
      t: translate,user_id
    } = this.props;
       let another_id   = params.id
    let threadName = this.Id_generator(user_id, another_id)
          const text = newMessage[0].text
            this.setState({ messages: GiftedChat.append(this.state.messages, newMessage) })
          console.log('Messg' , newMessage)
          firestore()
          .collection('Messages')
          .doc(threadName)
          .collection('MESSAGES')
          .add({
          text,
          createdAt: new Date().getTime(),
          user: {
          _id: this.state.id,
          name:this.state.name

          }
          })

          await firestore()
          .collection('Messages')
          .doc(threadName)
          .set(
          {
          latestMessage: {
          text,
          createdAt: new Date().getTime()
          }
          },
          { merge: true }
          )
          }


            // componentDidMount() {
              
            // }

  
  componentDidMount() {
       const {
    
      route: {params},user_id,
      t: translate,
       } = this.props;
     
    let another_id = params.id;
    let userData = params.userData;
    let threadName = this.Id_generator(user_id, another_id)
    console.log("threadDATAA" ,userData,another_id)
                 
                  this.setState({id:user_id,userData:userData})
                this.unsubscribeListener = firestore()
              .collection('Messages')
              .doc(threadName)
              .collection('MESSAGES')
              .orderBy('createdAt', 'desc')
              .onSnapshot(querySnapshot => {
              const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data()

              const data = {
              _id: doc.id,
              ...firebaseData
              }

              if (!firebaseData.system) {
              data.user = {
              ...firebaseData.user,

              }
              }

              return data
              })
              console.log('DataFireStore-------->', messages )
                this.setState({ messages:messages })
              })

                  // this.client.login(`10`).then(() => {
                  // let channel = this.state.channel
                  // console.log('mount chat ', channel);
                  // this.subscribeChannelMessage();
                  // this.client
                  //   .join(channel)
                  //   .then(() => {
                  //     console.log('join channel success');
                  //     this.setState({
                  //       channel,
                  //     });
                  //   })
                  //   .catch(() => {
                  //     console.warn('join failured');
                  //   });
                  // });
                }

  renderBubble(props ,id) {
                   
    //           let User = props.currentMessage.user
    //          let name = this.props.route.params.name
   
    let User = props.currentMessage.user
              console.log('Props',props ,id)


              if (User._id === id)
              {
              return (


              <View style={{alignSelf: 'flex-start',
              flexDirection: 'row',
              margin: scale(15),}}>

              <Bubble

              {...props}
              wrapperStyle={{

              right: {
              alignItems: 'flex-end',
              backgroundColor: '#636363',
              borderBottomLeftRadius: scale(10),
              borderBottomRightRadius:0,
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
              }
              }}
              />

              <View style={styles.rightTriangle}/>
              <Text style={{textAlign:'left',alignSelf:"flex-start",justifyContent:'flex-start',
              alignItems:'baseline',position:'absolute',right:15,bottom:-12,color:'#898989',fontSize:12}}>{moment(props.currentMessage.createdAt).format("LT")}</Text>
              </View>
              );
              }
              else {
              return (

              <View style={{flexDirection: 'row',
              margin: scale(14),}} >

              <View style={styles.leftTriangle}/>

              <Bubble

              {...props}
              wrapperStyle={{
              left: {
              alignItems: 'flex-start',
              backgroundColor:'#252525',
              borderBottomRightRadius: scale(10),
              borderTopLeftRadius:scale(10),
              borderTopRightRadius: scale(10),
              borderBottomLeftRadius:0,
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
              }
              }}
              />

              <Text style={{textAlign:'left',alignSelf:"flex-end",justifyContent:'flex-start',
              alignItems:'baseline',position:'absolute',left:15,bottom:-12,color:'#898989',fontSize:12}}>{moment(props.currentMessage.createdAt).format("LT")}</Text>

              </View>


              );

              }

              }
              renderComposer(props)
              {
              return ( <Composer {...props} placeholder={'Write your messasge...'}
              placeholderTextColor={'white'}/> );
              }

              renderInputToolbar (props) {

              return <InputToolbar {...props}
              containerStyle={styles.ChatOneToOneContainer}/>
              }

              renderFooter(){
              // if (this.state.isTyping){
              // return (<Text>{this.state.name} is typing</Text>)
              // }
              return null;
              }


              renderSend(props) {
              return (
              <Send {...props}
              >
               <Image
                source={Constants.Images.send}
                resizeMode='contain'
                style={{
                  height: Constants.BaseStyle.scale(20),
                  marginRight: Constants.BaseStyle.scale(2),
                  width: Constants.BaseStyle.scale(20),
                }}
              />
              </Send>
              );
              }


  renderHeader = ({ goBack }) => (
    <View style={HomeStyles.ChatOneToOneHeader}>
      <View style={[InviteFriendsStyles.userWrapper]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => goBack()}>
          <Image source={Constants.Images.back} resizeMode='contain' style={CommonStyles.crossImage} />
        </TouchableOpacity>
        {this.state.userData.length >0 ?<Image
          source={{ uri: this.state.userData['0'].pic  }}
          style={{
            borderRadius: Constants.BaseStyle.scale(25),
            height: Constants.BaseStyle.scale(50),
            width: Constants.BaseStyle.scale(50),
          }}
        />:<Image
          source={Constants.Images.profilePic}
          style={{
            borderRadius: Constants.BaseStyle.scale(25),
            height: Constants.BaseStyle.scale(50),
            width: Constants.BaseStyle.scale(50),
          }}
        />}
        <View>
          <Text style={InviteFriendsStyles.username}>{ this.state.userData.length >0 &&this.state.userData['0'].name}</Text>
         {/* <Text style={InviteFriendsStyles.location}>{ this.state.userData.length >0 &&this.state.userData['0'].address}</Text> */}
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ visible: true })}>
        <Image source={Constants.Images.more} resizeMode='contain' style={CommonStyles.crossImage} />
      </TouchableOpacity>
    </View>

  );

  render() {
    const {
      navigation: {
        goBack, navigate,
      },
    } = this.props;
    const {
      message, visible,
    } = this.state;
        
    return (
      <View style={HomeStyles.container}>
        {this.renderHeader({
          goBack, route: 'Events', title: 'Events',
        })}
        {/* <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />
        <View style={HomeStyles.ChatBody}>
          <View style={HomeStyles.ChatBody}>
            <TextInput
              style={HomeStyles.ChatInput}
              multiline
              value={message}
              placeholder="Write your message..."
              placeholderTextColor={Constants.Colors.TEXT_COLOR}
              onChangeText={(text) => this.setState({ message: text })}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
            <TouchableOpacity>
              <Image
                source={Constants.Images.send}
                resizeMode='contain'
                style={{
                  height: Constants.BaseStyle.scale(20),
                  marginRight: Constants.BaseStyle.scale(20),
                  width: Constants.BaseStyle.scale(20),
                }}
              />
            </TouchableOpacity>
          </View>
        </View> */}
       <GiftedChat
messages={this.state.messages}
listViewProps={{
style: {
    backgroundColor: 'black',
  marginBottom:scale(30),
},
}}
renderUsernameOnMessage={false}
renderAvatar={() => null}
renderTime={() => null}
alwaysShowSend={true}
textInputStyle={ { color: 'white'}}
renderBubble={props => this.renderBubble(props,this.props.user_id)}
renderComposer={this.renderComposer}
renderInputToolbar={this.renderInputToolbar}
renderSend={this.renderSend}
renderFooter={this.renderFooter}
onSend={newMessage => this.handleSend(newMessage)}
isTyping={true}
user={{
_id: this.state.id,
name: this.state.name
}}


/>
        <MoreOptionsPopup
          hasUnFollowBtn={false}
          visible={visible}
          onBlock={() => {
            this.setState({ visible: false });
            navigate('BlockReportUser', { isBlockPage: true });
          }}
          onReport={() => {
            this.setState({ visible: false });
            navigate('BlockReportUser', { isBlockPage: false });
          }}
          onClose={() => this.setState({ visible: false })}
        />
      </View>
    );
  }
}

ChatOneToOne.propTypes = {
  navigation: shape({
    goBack: func,
    navigate: func,
    setParams: func,

  }).isRequired,
};
const styles = StyleSheet.create({

ChatOneToOneContainer : {
alignItems: 'flex-start',
backgroundColor: '#212121',
borderTopLeftRadius: scale(10),
borderTopRightRadius: scale(10),
justifyContent: 'center',
padding: scale(14),
borderTopWidth:0,
},


leftTriangle: {
alignSelf: 'flex-end',
backgroundColor: 'transparent',
borderRightColor: 'transparent',
borderRightWidth: scale(15),
borderStyle: 'solid',
marginLeft:-1.5,
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
marginLeft:-1.5,
borderTopWidth: scale(15),
height: 0,
marginBottom: scale(5),
transform: [{rotate: '270deg'}],
width: 0,
},
});

const mapStateToProps = ({auth: {email,status,data,code,user_id},user:{loginStatus}}) => ({
  email,status,data ,code ,loginStatus,user_id
});

const mapDispatchToProps = {
  // addLoginDetail: (params) => setLoginDetails(params),
  // loginSuccess: actions.loginSuccess,
  // login: actions.login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(ChatOneToOne));
