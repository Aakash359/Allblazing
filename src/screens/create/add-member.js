import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Constants from '../../constants';
import {AddMemberStyles} from '../../styles';
import API from '../../constants/baseApi';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {func, shape} from 'prop-types';
import {getAuthToken, getGroupImage, getGroupName} from '../../helpers/auth';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';
class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked: false,
      isLoading: false,
      list: [],
      arrSelectedUsers: [],
    };
  }
  // const [checked, setCheck] = useState(false);
  // const navigation = useNavigation();
  // const [isLoading,setIsLoding]=useState(false);

  componentDidMount() {
    this.UserList();
  }

  UserList = async () => {
    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    // console.log('token===>', config);
    this.setState({
      isLoading: true,
    });
    axios
      .get(API.USER_LIST, config)
      .then((response) => {
        // console.log('response ====', response.data.data.result);
        if (response.data.data.result) {
          // console.log('===>response', response.data.data.result);
          this.setState({list: response?.data?.data?.result});
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  CreateGroup = async () => {
    const {addCreateGroupDetail} = this.props;
    const {
      navigation: {goBack, navigate},
      route: {params},
      t: translate,
    } = this.props;
    const {arrSelectedUsers} = this.state;
    if (arrSelectedUsers.length < 1) {
      Alert.alert('', 'Please Select member!');
      return;
    }
    const name = this.props.route.params.name;
    const photo = this.props.route.params.photo;
    const description = this.props.route.params.description;
    const Type = this.props.route.params.GroupType;
    console.log('===>id', Type);
    this.setState({
      isLoading: true,
    });
    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('token===>', config);

    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('image', {
      uri: Platform.OS === 'android' ? photo : photo.replace('file://', ''),
      name: 'test.jpg',
      type: 'image/jpg',
    });
    // formdata.append('image', photo);
    formdata.append('type', Type);
    for (let index = 0; index < arrSelectedUsers.length; index++) {
      const element = arrSelectedUsers[index];
      formdata.append(`member[${element}]`, element);
    }
    formdata.append('description', description);

    console.log('===>FormData', formdata);
    this.setState({
      isLoading: true,
    });
    axios
      .post(API.CREATE_GROUP, formdata, config)
      .then((response) => {
        console.log('response ======>', response.data);
        if (response?.data?.code === 401) {
          Alert.alert('', response?.data?.message ?? '');
        }
        if (response?.data?.code === 200) {
          Alert.alert('', response?.data?.message ?? '');
          // addCreateGroupDetail(response?.data?.data);
          // console.log('====>Response', response?.data?.data);
          navigate('Home');
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  OnPress = (item) => {
    console.log('item.user_id ', item.user_id);
    // let oldUserList = this.state.
    if (this.state.arrSelectedUsers.includes(item.user_id)) {
      this.removePeople(item.user_id);
    } else {
      this.setState({
        arrSelectedUsers: [...this.state.arrSelectedUsers, item.user_id],
      });
    }
  };

  removePeople(e) {
    var array = [...this.state.arrSelectedUsers]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({arrSelectedUsers: array});
    }
  }

  renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      // onPress={() => this.setState({ischecked: !this.state.ischecked})}
      onPress={() => this.OnPress(item)}
      style={AddMemberStyles.container}>
      <View style={AddMemberStyles.userWrapper}>
        <Image
          source={{
            uri: item.image,
          }}
          style={AddMemberStyles.userImage}
        />
        <View>
          <Text style={AddMemberStyles.username}>{item.full_name}</Text>
          <Text style={AddMemberStyles.location}>Santee, United States</Text>
        </View>
      </View>
      <Image
        source={
          this.state.arrSelectedUsers.includes(item.user_id)
            ? Constants.Images.checkbox
            : Constants.Images.checkoff
        }
        resizeMode="contain"
        style={AddMemberStyles.icon}
      />
    </TouchableOpacity>
  );

  render() {
    // const {nam} = this.state;

    const {
      navigation: {goBack, navigate, getParam, isLoading},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <>
        {isLoading ? (
          <ActivityIndicator color="white" size={25}/>
        ) : (
          <FlatList
            data={this.state.list}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.user_id}
          />
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          // onPress={() => navigation.navigate('AddMember')}
          onPress={this.CreateGroup}
          style={AddMemberStyles.nextView}>
          {isLoading ? (
            <ActivityIndicator color="white" size={25} />
          ) : (
            <Text style={AddMemberStyles.nextText}>Create Group</Text>
          )}
        </TouchableOpacity>
      </>
    );
  }
}

// export default AddMember;
AddMember.propTypes = {
  loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  // addFullName: (params) => setFullName(params),
  addCreateGroupDetail: (params) => setCreateGroupDetails(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AddMember));
