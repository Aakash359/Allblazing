import React, { Component } from 'react';
import {
  View,
  StatusBar,TouchableOpacity,Text,Image
} from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input';
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
class OTP extends Component {
  constructor() {
    super();
    this.state = {
        otp: '',
        
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
                     <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
  <Image source={ImagesPath.close} resizeMode='contain' style={{width:Scale(20),height:Scale(20),alignSelf:'flex-end',margin:Scale(20)}} />
            </TouchableOpacity>
            <StatusBar barStyle="light-content" />
            <View style ={{alignItems:'center',justifyContent:'space-evenly',flex:0.3,marginTop:Scale(20)}}>
              
                <Text style={AuthStyle.selectText}>Verification Code</Text>
                <Text style={[AuthStyle.buttonText, { textAlign: 'center', marginHorizontal: Scale(40) }]}>{'Please enter the code sent to "xyz@gmail.com" '}</Text> 
               {/* <Text style={[AuthStyle.buttonText, { textAlign: 'center', marginHorizontal: Scale(40) }]}>{'"xyz@gmail.com"'}</Text>  */}
            </View>
              <OTPInputView
                    style={{
                      width: '70%',
                      height: Scale(60),
                      alignSelf: 'center',
                      selectionColor : 'white'
                    }}
                    pinCount={4}
                    keyboardType="phone-pad"
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged = {code => {  this.setState({ otp: code })}}
                    autoFocusOnLoad ={true}
                    codeInputFieldStyle={{
                      backgroundColor: Colors.BUTTON_COLOR,
                      borderWidth: 0,
                      borderRadius: Scale(5),
                      selectionColor : 'white' //change the cursor color here
                    }}
                    
                    code={this.state.otp}
                    codeInputHighlightStyle={{
                      color: Colors.WHITE,
                      fontSize: Scale(16),
                    }}
                    onCodeFilled={(code) => {
                      this.setState({ otp: code })
                    }}
                    
                  />
            <View style={{ flex: 0.65, flexDirection: 'column-reverse' }}>
               <TouchableOpacity
             
           style ={{alignItems:'center',margin:Scale(10)}}
              onPress={() => this.onContinue()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE,}]}>{'Resend Link'}</Text>
                </TouchableOpacity>  
 <TouchableOpacity
              style={[AuthStyle.loginTouchable,{backgroundColor:Colors.TEXT_COLOR2}]}
              activeOpacity={0.7}
              onPress={() => this.onContinue()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Verify'}</Text>
                </TouchableOpacity>
                
                
                
              
            </View>
               

          </SafeAreaView>
     
     
    );
  }
}

export default OTP;