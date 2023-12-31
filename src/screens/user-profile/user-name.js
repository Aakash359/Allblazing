import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator
} from 'react-native';
import {bool, func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {InputField, StepBar} from '../../components';
import {AuthStyle, CommonStyles, UsernameStyle} from '../../styles';
import {getAuthToken, setUserName} from '../../helpers/auth';
import axios from 'axios';
import API from '../../constants/baseApi';
import {connect} from 'react-redux';
import {setFullName} from '../../reducers/baseServices/profile';

class Username extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      Loading:false,
    };
  }

componentDidMount(){
  const full_name = this.props.route?.params?.full_name ?? '';
    console.log('fullname==>',full_name );
    const data = this.props.route?.params?.data
    console.log('fullname==>',data );
    this.setState({name: full_name})
}

  NameStore = () => {
    console.log('fullname==>', this.state.name);
    if (this.state.name === '') {
      Alert.alert(
        '',
        'Please enter the full Name',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'Cancel',
          },
          {
            text: 'OK',
            onPress: () => console.log('ok Pressed'),
          },
        ],
        {Cancelable:false}
      );
    } else {
      setUserName(this.state.name);
      this.props.navigation.navigate('Userage');
    }
  };

  onSave = async() => {
    const {addFullName} = this.props;
    const {
      navigation: {navigate},
    } = this.props;
    const {name} = this.state;

    const token = await getAuthToken();
    const config = {
      headers: {Authorization: `Bearer ${token}`},
      };
      this.setState({
        Loading:true,
      });

    if (name === '') {
      Alert.alert('', 'Please enter your full name', '');
    } else {
      axios
        .post(
          API.UPDATE_PROFILE,
          {
            full_name: name,
          },
          config,
        )
        .then((response) => {
          if (response?.data?.code === 200) {
            Alert.alert('',
             response?.data?.message ?? '',
             [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('EditProfile'),
              },
            ],
            {Cancelable:false}
             );
            addFullName(name);
            console.log('name:==>',name);
            // navigate('EditProfile');
          }
        }).finally(() => {
          this.setState({
            Loading: false,
          });
        });
    }
  };

  render() {
    // const {name} = this.state;
    const {
      navigation: {goBack, navigate},
      route: {params},
      t: translate,
    } = this.props;
    
    return (
      <View style={CommonStyles.container}>
        <ScrollView
          ref={this.scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'none'}
          keyboardShouldPersistTaps="always">
          <View style={UsernameStyle.wrapper}>
            {!params?.isEditMode && <StepBar count={5} selected={[0]} />}
            <View style={UsernameStyle.inputWrapper}>
              {!params?.isEditMode && (
                <Text style={UsernameStyle.input}>
                  {translate('Your FullName?')}
                </Text>
              )}
              <InputField
                value={this.state.name}
                style={{color:'white'}}
                placeholder={translate('Full Name')}
                onChangeText={(text) => this.setState({name: text})}
              />
            </View>
          </View>
        </ScrollView>
        <View style={UsernameStyle.buttonsWrapper}>
          {params?.isEditMode ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[AuthStyle.saveBtn, UsernameStyle.saveBtn]}
              onPress={() => this.onSave()}
              // onPress={() => goBack()}
            >
              {this.state.Loading ? (
                <ActivityIndicator color="white" size={25}/>
              ):(
                <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {translate('Save')}
              </Text>
              )}
              
            </TouchableOpacity>
          ) : (
            <View style={UsernameStyle.buttons}>
              <TouchableOpacity
                style={[
                  AuthStyle.introButton,
                  {backgroundColor: Constants.Colors.TRANSPARENT},
                ]}
                activeOpacity={0.7}
                onPress={() => goBack()}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Back')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={AuthStyle.introButton}
                activeOpacity={0.7}
                onPress={() => this.NameStore()}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Next')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
Username.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = ({auth: {email}}) => ({
  email,
});

const mapDispatchToProps = {
  addFullName: (params) => setFullName(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Username));
