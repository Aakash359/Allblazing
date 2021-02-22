import React, {Component} from 'react';
import {
  ScrollView,
  Platform,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {func, shape} from 'prop-types';
import {withTranslation} from 'react-i18next';
import Constants from '../../constants';
import {
  AuthStyle,
  CommonStyles,
  ContactUSStyles,
  UsernameStyle,
} from '../../styles';
import {InputField} from '../../components';
import Axios from 'axios';
import API from '../../constants/baseApi';
import { ActivityIndicator } from 'react-native';
import { getAuthToken } from '../../helpers/auth';

class ContactUs extends Component {
  descriptionRef = React.createRef();
  scrollViewRef = React.createRef();

  constructor() {
    super();
    this.state = {
      description: '',
      subject: '',
      isLoading:false,
    };
  }

  onChangeText = (description) => {
    this.setState({description});
  };
  OnSubmit = async() => {
    const {
      navigation:{navigate},
  } = this.props;

    const {subject,description} = this.state;
    if (subject == '') {
      Alert.alert(
        '',
        'Please enter subject',
        
      );
      return;
    } else if (description == '') {
      Alert.alert(
        '',
        'Please enter description',
      );
      return;
    }
    this.setState({
      isLoading: true,
    });
    // markwinz06@gmail.com/mark@1234
    const token = await getAuthToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  console.log(config);

    Axios
      .post(API.CONTACT_US, {
        subject: subject,
        message: description,
      },config)
      .then((response) => {
        console.log('response ====', response.data);
        if (response?.data?.code === 401) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            
          );
        }
        if (response?.data?.code === 200) {
          Alert.alert(
            '',
            response?.data?.message ?? '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel pressed'),
                style: 'Cancel',
              },
              {
                text: 'OK',
                onPress: () => navigate('Settings'),
              },
            ],
            {Cancelable:false}
            
          );

          // navigate('Settings');

        }
        
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };
  render() {
    const {description, subject,isLoading} = this.state;
    const {
      navigation: {goBack},
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
            <View style={UsernameStyle.inputWrapper}>
              <InputField
                placeholder={translate('contactus.Subject')}
                returnKeyType="next"
                value={subject}
                onChangeText={(text) => this.setState({subject: text})}
                onSubmitEditing={() => this.descriptionRef.current.focus()}
              />
              <View style={CommonStyles.textAreaWrapper}>
                <TextInput
                  multiline
                  ref={this.descriptionRef}
                  maxLength={500}
                  numberOfLines={15}
                  style={CommonStyles.textArea}
                  placeholder={translate('contactus.Description')}
                  value={description}
                  onChangeText={this.onChangeText}
                  placeholderTextColor={Constants.Colors.TEXT_COLOR}
                  onSubmitEditing={() => goBack()}
                  underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[AuthStyle.saveBtn, ContactUSStyles.saveBtn]}
              // onPress={() => goBack()}
              onPress={this.OnSubmit}
              >
              
              {isLoading ? (
                    <ActivityIndicator color="white" size={25}/>
               ):(
                <Text
                style={[AuthStyle.buttonText, {color: Constants.Colors.WHITE}]}>
                {translate('Submit')}
              </Text>
               )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ContactUs.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

export default withTranslation()(ContactUs);
