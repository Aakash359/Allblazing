import React, { Component } from 'react';
import { View,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  TextInput } from 'react-native';
import { func, shape } from 'prop-types';
import { ImagesPath, Colors, Scale, Fonts } from '../../Config';
import { InputContainer } from '../../Components';
import { AuthStyle, CommonStyles, RegisterStyle } from './AuthStyle';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isPasswordVisible: false,
      password: '',
    };
  }

	onContinue = () => {
	  const { navigation: { navigate } } = this.props;

	  navigate('Username');
	};

	render() {
	  const {
	    email, password, isPasswordVisible,
	  } = this.state;

	  return (
  <SafeAreaView style={CommonStyles.container}>
  <StatusBar barStyle="light-content" />
  <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
	        <Image source={ImagesPath.close} resizeMode='contain' style={CommonStyles.crossImage} />
	      </TouchableOpacity>
  <View style={{
	        flex: 0.9, marginTop: Scale(10),
	      }}
	      >
  <View style={{
	          alignItems: 'center', justifyContent: 'space-evenly', flex: 0.3, marginTop: Scale(20),
	        }}
	        >
  <Text style={{
	            ...AuthStyle.selectText,
	            fontSize: Scale(30),
	          }}
	          >Sign Up
	          </Text>
	        </View>
  <View>
  <InputContainer value={email} place="Email" onPress={(text) => this.setState({ email: text })} />
  <View style={{
	            marginTop: Scale(4), flexDirection: 'row', alignSelf: 'center', height: Scale(45), width: '90%', backgroundColor: Colors.BUTTON_COLOR, borderRadius: Scale(8), alignItems: 'center',
	          }}
	          >
  <TextInput
  style={[{
	                color: Colors.TEXT_COLOR,
	                height: Scale(40),
	                marginLeft: Scale(10),
	                width: '85%',
	                alignSelf: 'center',
	                fontSize: Scale(14),
	                marginTop: Scale(5),
	                fontFamily: Fonts.Regular,
	              }]}
  placeholder="Password"
  secureTextEntry={!isPasswordVisible}
  value={password}
  onChangeText={(text) => this.setState({ password: text })}
  placeholderTextColor={Colors.TEXT_COLOR}
	            />
  <TouchableOpacity onPress={() => this.setState({ isPasswordVisible: !isPasswordVisible })}>
  {isPasswordVisible ? <Image source={ImagesPath.eyeon} resizeMode='contain' style={AuthStyle.checkImg} /> : <Image source={ImagesPath.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />}
	            </TouchableOpacity>
	          </View>
	        </View>
	      </View>

  <TouchableOpacity
  style={RegisterStyle.button}
  activeOpacity={0.7}
  onPress={() => this.onContinue()}
	      >
  <Text style={[AuthStyle.buttonText, { color: Colors.WHITE }]}>{'Sign Up'}</Text>
	      </TouchableOpacity>
	    </SafeAreaView>
	  );
	}
}

Register.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};
