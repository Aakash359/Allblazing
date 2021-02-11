/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable newline-after-var */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { func, shape } from 'prop-types';
import API from '../../constants/baseApi';
import { FollowingStyles } from '../../styles';
import Constants from '../../constants';
import { setFollowUserId } from '../../reducers/baseServices/profile';
import {getAuthToken} from '../../helpers/auth';
import {useNavigation, useRoute} from '@react-navigation/native';


class FollowersList extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      Loading: false,
      list: [],
      search: '',
    };
  }


  // const navigation = useNavigation();
  // const dispatch = useDispatch();

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    this._fetchFollowers();
  }

  _fetchFollowers = async () => {
    // eslint-disable-next-line react/prop-types
    const { addFollowUserId } = this.props;

    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    console.log('Token====>', this.props.token);
    const config = {
      headers: {Authorization: `Bearer ${this.props.token}`},
      params: {
        id: this.props?.route?.params?.user_id
      }
    };
    // console.log('===>responseFOLLOWERS');
    this.setState({
      Loading: true,
    });
    axios
      .get(API.FOLLOWERS, config)
      .then((response) => {
        console.log('===>responseFOLLOWERS', response);
        if (response.data.data.result) {
          this.setState({list: response?.data?.data?.result});
          // addFollowUserId(response?.data?.data?.result?.id);
          // console.log('====?id', response?.data?.data?.result?.id);
        }
      })
      .finally(() => {
        this.setState({
          Loading: false,
        });
      });
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={FollowingStyles.sectionView}
        activeOpacity={0.7}
        onPress={() =>
          this.props.navigation.navigate('UserProfile', {iseventPage: false,id: item.id})
        }>
        <View
          style={[
            FollowingStyles.listView,
            { backgroundColor: Constants.Colors.LIGHT_RED },
          ]}
        >

        <Image source={item?.followimage} style={{width: 70, height: 70, borderRadius: 12}} resizeMode="cover" />
        </View>
        <View>
          <Text style={FollowingStyles.nameText}>{item.followingName}</Text>
          <Text style={FollowingStyles.locationText}>
            Santee, United States
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {  navigation: { navigate },
 } = this.props;
    return (
      <>
        <ScrollView style={FollowingStyles.container}>
          <View style={FollowingStyles.searchView}>
            <Image
              source={Constants.Images.search}
              style={FollowingStyles.searchIcon}
            />

            <TextInput
              placeholder={`Search Followers (${this.props.route.params.followerCount})`}
              placeholderTextColor="#898989"
              value={this.state.search}
              autoCapitalize="none"
              autoCorrect={false}
              style={{color: 'white', paddingVertical: 10}}
              onChangeText={(text) => {
                this.setState({search: text});
              }}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
          </View>
          {this.state.Loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              <ActivityIndicator color="white" size={25} />
            </View>
          ) : (
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={FollowingStyles.flatList}
              data={this.state.list}
              // renderItem={({ item, index }) => this.renderItem(item, navigate)}
              renderItem={({item, index, navigate}) => (
                <this.renderItem item={item} index={index} />
              )}
            />
          )}
        </ScrollView>
      </>
    );
  }
}
FollowersList.propTypes = {
  // loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};
const mapStateToProps = ({ profile: { id }, auth: {token} }) => ({
  id,
  token
});

const mapDispatchToProps = {
  addFollowUserId: (params) => setFollowUserId(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(FollowersList));
