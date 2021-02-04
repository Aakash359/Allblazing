/* eslint-disable consistent-return */
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
ActivityIndicator,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CreateGroupStyles, CommonStyles} from '../../styles';
import Constants from '../../constants';
import {connect} from 'react-redux';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheetIOS} from 'react-native';
import {Alert} from 'react-native';
import {getAuthToken, setGroupImage, setGroupName} from '../../helpers/auth';
import {Dimensions} from 'react-native';
import Axios from 'axios';
import API from '../../constants/baseApi';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.actionSheetRef = React.createRef();
    this.state = {
      photo: '',
      description: '',
      isLoading: false,
      name: '',
      selectedId: null,
      data: [],
      list: [],
    };
  }
  NameStore = () => {
    if (this.state.photo === '') {
      Alert.alert('', 'please Select Image', '');
    } else if (this.state.name === '') {
      Alert.alert('', 'Please Enter Full Name', '');
    } else if (this.state.list > 0) {
      Alert.alert('', 'Please select Group Type', '');
    } else {
      this.props.navigation.navigate('AddMember', {
        iseventPage: false,
        name: this.state.name,
        GroupType: this.state.list[0].id,
        photo: this.state.photo,
        description: this.state.description,
      });
    }
  };
  componentDidMount() {
    this.GroupType();
  }

  GroupType = async () => {
    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    console.log('token===>', config);
    this.setState({
      isLoading: true,
    });
    Axios.get(API.GROUP_TYPE, config)
      .then((response) => {
        console.log('response ====', response.data.data.result);
        if (response.data.data.result) {
          console.log('===>response', response.data.data.result);
          this.setState({list: response?.data?.data?.result});
        }
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  choosePhotosFromGallery = (index) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then((photo) => {
      console.log('image details ', photo);
      const {mime, filename, data, path} = photo;
      const uri = `data:${mime};base64,${data}`;
      this.setState(() => {
        return {photo: photo.path, imagedetails: photo};
      });
      console.log(photo.path);
    });
  };
  OnPress = (item) => {
    console.log('item.id ', item.id);
    // let oldUserList = this.state.
    if (this.state.data.includes(item.id)) {
      this.removePeople(item.id);
    } else {
      this.setState({
        data: [...this.state.data, item.id],
      });
    }
  };

  removePeople(e) {
    var array = [...this.state.data]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({data: array});
    }
  }
  renderItem = ({item, option}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        CreateGroupStyles.optionalSectionView,
        {
          backgroundColor: this.state.data.includes(item.id)
            ? Constants.Colors.GRAY
            : Constants.Colors.CARD_GREY,
        },
      ]}
      // onPress={(item) => this.setState({option:item.id,selectedId:item.id})}
      onPress={() => this.OnPress(item)}
      >
      <Text style={[CreateGroupStyles.optionalText]}>{item.name}</Text>
    </TouchableOpacity>
  );
  render() {
    const {name, photo, option, Data, description,isLoading} = this.state;
    const {height, width} = Dimensions.get('window');
    const {
      navigation: {goBack, navigate},
      route: {params},
      t: translate,
    } = this.props;

    return (
      <SafeAreaView style={CreateGroupStyles.container}>
        <ScrollView style={CreateGroupStyles.innerContainer}>
          <View style={CreateGroupStyles.imageView}>
            <TouchableOpacity onPress={() => this.choosePhotosFromGallery()}>
              {photo == '' ? (
                <Image
                  source={Constants.Images.imageIcon}
                  style={CreateGroupStyles.imageIcon}
                />
              ) : (
                <Image
                  source={{uri: photo}}
                  style={{borderRadius: 16, height: '100%', width: '100%'}}
                />
              )}
            </TouchableOpacity>
            {photo == '' ? (
              <Text style={CreateGroupStyles.imageText}>Add event image</Text>
            ) : null}
          </View>
          <View style={CreateGroupStyles.searchView}>
            <TextInput
              placeholder="Group Name"
              placeholderTextColor={Constants.Colors.GREY_BORDER}
              value={name}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => this.setState({name: text})}
              style={CreateGroupStyles.groupName}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
          </View>
          <View>
            <Text style={CreateGroupStyles.groupType}>Group Type</Text>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={this.state.list}
                renderItem={this.renderItem}
                keyExtractor={(id, index) => index.toString()}
              />
            )}
          </View>
          <Text style={CreateGroupStyles.groupType}>Description</Text>

          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: Constants.Colors.SECONDARY_COLOR,
              borderRadius: Constants.BaseStyle.scale(8),
              height: Constants.BaseStyle.scale(200),
              justifyContent: 'flex-start',
              width: '95%',
            }}>
            <TextInput
              multiline
              maxLength={450}
              numberOfLines={20}
              style={[
                CommonStyles.textAreaWrapper,
                CreateGroupStyles.textAreaWrapper,
              ]}
              placeholder={translate(' description here...')}
              value={description}
              onChangeText={(text) => this.setState({description: text})}
              placeholderTextColor={Constants.Colors.TEXT_COLOR}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() => this.props.navigation.navigate('AddMember')}
            onPress={() => this.NameStore()}
            style={CreateGroupStyles.nextView}>
            <Text style={CreateGroupStyles.nextText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// export default CreateGroup;

CreateGroup.propTypes = {
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(CreateGroup));
