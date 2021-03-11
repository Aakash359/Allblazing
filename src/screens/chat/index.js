import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { HomeStyles } from '../../styles';
import { ChatFriends } from '../../components';
import Constants from '../../constants';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
class Chats extends React.Component { 
  constructor() {
    super();
    this.state = { activeTab: '0', threds: [],groupThreds:[] };
  }

  renderItem = ({ item }) => {
    const {
      route: { params }, navigation: { navigate }, user_id
    } = this.props;
    const { activeTab } = this.state;
    if (activeTab === '0') {
      const nameObj = item.users.filter(data => {
        return data.id != user_id.toString()
        
      })
      return <ChatFriends   navigation={navigate} type={'chat'} data={item} nameObj={nameObj} />;
    }
    else {
     return <ChatFriends navigation={navigate} type={'groups'} data={item} nameObj={item.members} />;
    }
    // console.log( "nameeeee",nameObj)
    
  }

  onTabPress = (val) => {
    this.setState({ activeTab: val });
  }

  async componentDidMount() {
    const { user_id } = this.props
    console.log(user_id, "IDDDD")
    this.unsubscribe = this.props.navigation.addListener('focus', async () => {
      firestore()
        .collection('chatroom')
        .where("ID", "array-contains", user_id.toString()).onSnapshot(querySnapshot => {
          console.log("myQuerySnapShot", querySnapshot)
          if (querySnapshot == null) {
            return
          }
          else {
            const threads = querySnapshot.docs.map(documentSnapshot => {
              console.log("myQuerySnapShot", documentSnapshot)
              return {
                // _id: documentSnapshot.id,
                // name: documentSnapshot.data.name,
                // latestMessage: { text: '' },
                ...documentSnapshot.data()
              }
         
            })
            this.setState({ threds: threads })
         
          }
        })
    })
     

    firestore()
      .collection('Groups')
      .where("ID", "array-contains", user_id.toString()).onSnapshot(querySnapshot => {
        if (querySnapshot == null) {
          return
        }
        else {
          const threads2 = querySnapshot.docs.map(documentSnapshot => {
        
           
            return {
              // _id: documentSnapshot.id,
              // name: documentSnapshot.data.name,
              // latestMessage: { text: '' },
              ...documentSnapshot.data()
            }
         
          })
           console.log("Groupsss ", threads2)
          this.setState({ groupThreds: threads2 })
        }
         
        })
  
 
          
      
  }
  // async componentDidMount() {
   
     
  //   // var data = await docRef.where("ID", "array-contains", '101').where("user1", "==", 'manoj').get()
    
  //   //  .then((querySnapshot) => {
  //   //                 querySnapshot.forEach((doc) => {
  //   //                     console.log(doc.id, ' => ', doc.data());
  //   //                 });
  //   //             });
  //     // .onSnapshot(querySnapshot => {
  //     //   const threads = querySnapshot.docs
  //     //   console.log("Threads " , threads)
  //     //   //this.setState({threds: threads})
  //     // })
    
  //     }

  // componentWillUnmount() {
  //   this.unsubscribe.remove();
  // }
  
  renderHeader = () => {
    const { activeTab } = this.state;

    return (
      <View style={HomeStyles.chatHeaderContainer}>
        <View style={[HomeStyles.chatHeader, { borderBottomColor: activeTab === '0' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.onTabPress('0')}>
            <Text style={[HomeStyles.chatText, { color: activeTab === '0' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Friends'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[HomeStyles.chatHeader, { borderBottomColor: activeTab === '1' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.onTabPress('1')}>
            <Text style={[HomeStyles.chatText, { color: activeTab === '1' ? Constants.Colors.TEXT_COLOR_WHITE : Constants.Colors.TEXT_COLOR2 }]}>{'Groups'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { navigation: { navigate } } = this.props;

    return (
      <View style={HomeStyles.container}>
        {this.renderHeader({
          navigate, route: 'Events', title: 'Events',
        })}
        {this.state.activeTab ==='0'?<FlatList
          data={this.state.threds}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />:<FlatList
          data={this.state.groupThreds}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`}
        />}
      </View>
    );
  }
}

Chats.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isMapView: bool }) }).isRequired,
};

const mapStateToProps = ({auth:{token,user_id}}) => {
    return {
        user_id,token
    }
}

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
    // addCreateGroupDetail: (params) => setCreateGroupDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(Chats))

