import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {FollowingStyles} from '../../styles';
import Constants from '../../constants';
import axios from 'axios';
import API from '../../constants/baseApi';
import {getAuthToken} from '../../helpers/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, connect} from 'react-redux';
import {
  setFollowList,
  setFollowUserId,
} from '../../reducers/baseServices/profile';
import {withTranslation} from 'react-i18next';
import {func, shape} from 'prop-types';

class FollowersList extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      list: [],
    };
  }

  // const navigation = useNavigation();
  // const dispatch = useDispatch();

  componentDidMount() {
    this._fetchFollowers();
  }

  _fetchFollowers = async () => {
    const {addFollowUserId} = this.props;

    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    // console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('===>responseFOLLOWERS');
    this.setState({
      isLoading: true,
    });
    axios.get(API.FOLLOWERS, config).then((response) => {
      if (response.data.data.result) {
        console.log('===>responseFOLLOWERS', response.data.data.result);
        this.setState({list: response?.data?.data?.result});
        addFollowUserId(response?.data?.data?.result?.id);
        console.log('====?id', response?.data?.data?.result?.id);
      }
    });
  };

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={FollowingStyles.sectionView}
        activeOpacity={0.7}
        onPress={() => this.props.navigation.navigate('UserProfile',{userid:item.id})}>
        <View
          style={[FollowingStyles.listView, {backgroundColor: '#F898A4'}]}
        />
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
    const {
      navigation: {navigate},
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
              placeholder="Search Followers (48)"
              placeholderTextColor="#ccc"
              value={this.state.search}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState(text);
              }}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
          </View>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={FollowingStyles.flatList}
            data={this.state.list}
            // renderItem={({ item, index }) => this.renderItem(item, navigate)}
            renderItem={({item, index, navigate}) => (
              <this.renderItem item={item} index={index} />
            )}
          />
        </ScrollView>
      </>
    );
  }
}
FollowersList.propTypes = {
  loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};
const mapStateToProps = ({profile: {id}}) => ({
  id,
});

const mapDispatchToProps = {
  addFollowUserId: (params) => setFollowUserId(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(FollowersList));
