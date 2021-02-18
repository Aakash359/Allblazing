import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {bool, func, shape} from 'prop-types';
import {HomeStyles} from '../../styles';
import {ChatGroup} from '../../components';
import Constants from '../../constants';
import {getAuthToken} from '../../helpers/auth';
import axios from 'axios';
import API from '../../constants/baseApi';

class ChatsGroup extends React.Component {
  constructor() {
    super();
    this.state = {activeTab: '0', list: [], Loading: false};
  }
  componentDidMount() {
    this.MyGroupsList();
  }

  MyGroupsList = async () => {
    // const token = await getAuthToken();

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('token===>', config);
    this.setState({
      Loading: true,
    });
    axios
      .get(API.MY_GROUPS, config)
      .then((response) => {
        // console.log('response ====', response.data?.data?.result);
        if (response.data?.data?.result) {
          console.log('===>mygroups', response.data?.data?.result);
          this.setState({list: response.data?.data?.result});
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };
  AllGroupsList = async () => {
    // const token = await getAuthToken();

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('token===>', config);
    this.setState({
      Loading: true,
    });
    axios
      .get(API.ALL_GROUPS, config)
      .then((response) => {
        // console.log('response ====', response.data?.data?.result);
        if (response.data?.data?.result) {
          console.log('===>Allgroups', response.data?.data?.result);
          this.setState({list: response.data?.data?.result});
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };

  Requested = async () => {
    // const token = await getAuthToken();

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTEzMDM2ODIsImV4cCI6MTY0MjgzOTY4MiwibmJmIjoxNjExMzAzNjgyLCJqdGkiOiI1NWdpTmY2S3BLUXdvR09kIiwic3ViIjoxOSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.U5S1A-THEAFzeQAR_OYbATfRXScVinRshSVRjlt_8Zg';
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('token===>', config);
    this.setState({
      Loading: true,
    });
    axios
      .get(API.REQUESTED, config)
      .then((response) => {
        // console.log('response ====', response.data?.data?.resceived);
        var resceived = response.data?.data?.resceived;
        // console.log('resceived==>',resceived);
        var request = response.data?.data?.request;
        // console.log('request===>',request);
        resceived.push(...request);
        console.log('merege===>', resceived);
        if (response.data?.data.resceived) {
          // console.log('===>requested', response.data?.data);
          this.setState({list: response.data?.data?.resceived});
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };
  renderItem = ({item}) => {
    const {
      route: {params},
      navigation: {navigate},
    } = this.props;
    const {activeTab} = this.state;

    if (activeTab === '0') {
      return (
        <ChatGroup
          data={item}
          isMyGroupPage={val = '0'}
          hasCheckBox={params?.hasCheckBox}
          hasTick={params?.hasTick}
          navigation={navigate}
        />
      );
    }
    if (activeTab === '1') {
      return (
        <ChatGroup
          data={item}
          isMyGroupPage={val='1'}
          hasCheckBox={params?.hasCheckBox}
          hasTick={params?.hasTick}
          navigation={navigate}
        />
      );
    }

    return (
      <ChatGroup
        data={item}
        isMyGroupPage={val = '2'}
        hasCheckBox={params?.hasCheckBox}
        hasTick={params?.hasTick}
        navigation={navigate}
      />
    );
  };

  onTabPress = (val) => {
    if (val == '0') {
      this.MyGroupsList();
      this.setState({activeTab: val});
    } else if (val == '1') {
      this.AllGroupsList();
      this.setState({activeTab: val});
    } else if (val == '2') {
      this.Requested();
      this.setState({activeTab: val});
    }
  };

  renderHeader = () => {
    const {activeTab} = this.state;

    return (
      <View style={HomeStyles.chatHeaderContainer}>
        <View
          style={[
            HomeStyles.chatHeader,
            {
              borderBottomColor:
                activeTab === '0'
                  ? Constants.Colors.TEXT_COLOR_WHITE
                  : Constants.Colors.TEXT_COLOR2,
            },
          ]}>
          <TouchableOpacity onPress={() => this.onTabPress('0')}>
            <Text
              style={[
                HomeStyles.chatText,
                {
                  color:
                    activeTab === '0'
                      ? Constants.Colors.TEXT_COLOR_WHITE
                      : Constants.Colors.TEXT_COLOR2,
                },
              ]}>
              {'My Groups'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            HomeStyles.chatHeader,
            {
              borderBottomColor:
                activeTab === '1'
                  ? Constants.Colors.TEXT_COLOR_WHITE
                  : Constants.Colors.TEXT_COLOR2,
            },
          ]}>
          <TouchableOpacity onPress={() => this.onTabPress('1')}>
            <Text
              style={[
                HomeStyles.chatText,
                {
                  color:
                    activeTab === '1'
                      ? Constants.Colors.TEXT_COLOR_WHITE
                      : Constants.Colors.TEXT_COLOR2,
                },
              ]}>
              {'All Groups'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            HomeStyles.chatHeader,
            {
              borderBottomColor:
                activeTab === '2'
                  ? Constants.Colors.TEXT_COLOR_WHITE
                  : Constants.Colors.TEXT_COLOR2,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.onTabPress('2')}>
            <Text
              style={[
                HomeStyles.chatText,
                {
                  color:
                    activeTab === '2'
                      ? Constants.Colors.TEXT_COLOR_WHITE
                      : Constants.Colors.TEXT_COLOR2,
                },
              ]}>
              {'Requested'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {
      navigation: {navigate},
    } = this.props;

    return (
      <View style={HomeStyles.container}>
        {this.renderHeader({
          navigate,
          route: 'Events',
          title: 'Events',
        })}
        {this.state.isLoading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <ActivityIndicator color="white" size={25} />
          </View>
        ) : (
          <FlatList
            data={this.state.list}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
      </View>
    );
  }
}

ChatsGroup.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({params: shape({isMapView: bool})}).isRequired,
};

export default ChatsGroup;
