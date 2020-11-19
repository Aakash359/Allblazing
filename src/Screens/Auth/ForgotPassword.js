import React, { Component } from 'react';
import {
  View,
  StatusBar,TouchableOpacity,Text,Image
} from 'react-native';

import i18n from '../../Translation/i18n';

// assets
import { 
  ImagesPath,
  Colors,
    Scale,
  
  
} from '../../Config';
import { AuthStyle } from './AuthStyle';
import { InputContainer,CloseModal } from '../../Components'
import { SafeAreaView } from 'react-native-safe-area-context';
class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
        email: '',
        showmodal:false
    };
  }
  
    onSelectLang = (code) => {
    this.setState({languageCode:code})
    }
    
    onContinue = () => {
        this.setState({showmodal:true})
    }

    render() {
      const {email,showmodal} = this.state
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.THEME_COLOR }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
  <Image source={ImagesPath.close} resizeMode='contain' style={{width:Scale(20),height:Scale(20),alignSelf:'flex-end',margin:Scale(20)}} />
            </TouchableOpacity>
          
            <StatusBar barStyle="light-content" />
            <View style ={{alignItems:'center',justifyContent:'space-evenly',flex:0.3,marginTop:Scale(20)}}>
              
                <Text style={AuthStyle.selectText}>Forgot Password</Text>
               <Text style={[AuthStyle.buttonText, { textAlign: 'center', marginHorizontal: Scale(40) }]}>{'Please enter your registered email address to reset your password '}</Text>   
           
           <InputContainer value={email} place="Email" onPress={(text) => this.setState({ email: text })} /> 
            </View>
            <View style ={{flex:0.65,flexDirection:'column-reverse'}}>
 <TouchableOpacity
              style={[AuthStyle.loginTouchable,{backgroundColor:Colors.TEXT_COLOR2}]}
              activeOpacity={0.7}
              onPress={() => this.onContinue()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Submit'}</Text>
                    </TouchableOpacity>
            </View>
                <CloseModal
                          visible={showmodal}
                          
                          onPressButton={() => this.setState({showmodal:false},()=>this.props.navigation.navigate('OTP'))}
                        />

          </SafeAreaView>
     
     
    );
  }
}

export default ForgotPassword;