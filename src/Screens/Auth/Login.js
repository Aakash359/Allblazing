import React, { Component } from 'react';
import {
  View,
  StatusBar,TouchableOpacity,Text,Image, SafeAreaView,TextInput
} from 'react-native';

import i18n from '../../Translation/i18n';

// assets
import { 
  ImagesPath,
  Colors,
    Scale,
  Fonts
  
} from '../../Config';
import { InputContainer } from '../../Components'
import {AuthStyle} from './AuthStyle';
class Login extends Component {
  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        isShow: false,
        isRemember:false
    };
  }
  
    
    onContinue = () => {
        alert("clicked")
    }

    render() {
      const {email,password,isShow,isRemember} = this.state
    return (
          <SafeAreaView style={{ flex: 1,backgroundColor : Colors.THEME_COLOR  }}>
            <StatusBar barStyle="light-content" />
            <View style ={{flex:0.9,marginTop:Scale(80)}}>
               <Image source={ImagesPath.slectLangLogo2x} resizeMode='contain' style ={{width:'80%',alignSelf:'center',marginBottom:Scale(40)}} />
                <View>
                    <InputContainer value={email} place="Email" onPress={(text) => this.setState({ email: text })} /> 
                    
                    <View style ={{flexDirection:'row', alignSelf:'center',height:Scale(45),width:'90%',backgroundColor:Colors. BUTTON_COLOR,borderRadius:Scale(8),alignItems:'center'}}>
            <TextInput
                
             style={[{
          color: Colors.TEXT_COLOR,
          height: Scale(40),
         marginLeft:Scale(10),
          width: '85%',
          alignSelf: 'center',
          fontSize: Scale(14),
          marginTop: Scale(5),
          fontFamily: Fonts.Regular,
        }]}
                            placeholder={'Password'}
                            secureTextEntry ={isShow?false:true}
          value={password}
          onChangeText = {(text) => this.setState({ password: text })}
      
        placeholderTextColor={Colors.TEXT_COLOR}
                        />
                        {isShow?<TouchableOpacity onPress ={()=>this.setState({isShow:!this.state.isShow})}>
                            <Image source={ImagesPath.eyeon} resizeMode='contain' style={AuthStyle.checkImg} />
                        </TouchableOpacity> :<TouchableOpacity onPress ={()=>this.setState({isShow:!this.state.isShow})}>
                            <Image source={ImagesPath.eyeoff} resizeMode='contain' style={AuthStyle.checkImg} />
                        </TouchableOpacity> }
                    </View>
                    <View style={{ height:Scale(70),marginTop:Scale(30), flexDirection: 'row' ,justifyContent:'space-between',marginHorizontal:Scale(20)}}>
                        
                        <View style={{ flexDirection: 'row', }}>
                            {isRemember ? <TouchableOpacity onPress={() => this.setState({ isRemember: !this.state.isRemember })} style={{ }}>
                                <Image source={ImagesPath.checkbox} resizeMode='contain' style={{  width: Scale(20),
    height: Scale(18),}} /></TouchableOpacity> : <TouchableOpacity onPress={() => this.setState({ isRemember: !this.state.isRemember })}><Image source={ImagesPath.checkoff} resizeMode='contain' style={{
                                    width: Scale(20),
    height: Scale(18),}} /></TouchableOpacity>}
                            <Text style={ { color: Colors.WHITE, fontSize:Scale(14),paddingHorizontal:Scale(6)}}>{'Remember me'}</Text>
                        </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={[AuthStyle.buttonText, { color: Colors.WHITE, fontSize:Scale(14)}]}>{'Forgot password?'}</Text>
              </TouchableOpacity> 
    </View>

                
                    <TouchableOpacity
              style={[AuthStyle.loginTouchable,{backgroundColor:Colors.TEXT_COLOR2}]}
              activeOpacity={0.7}
              onPress={() => this.onContinue()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Login'}</Text>
                    </TouchableOpacity>
                    
                    <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center' ,marginTop:Scale(50)}}>
                          <Image source={ImagesPath.line} resizeMode='contain' style={{width:Scale(80)}} />
                        <Text style={{ color: Colors.WHITE, fontSize: Scale(14),marginHorizontal:Scale(10) }}>{'or login using'}</Text>
                          <Image source={ImagesPath.line} resizeMode='contain' style={{width:Scale(80)}} />
                        
                    </View>

                     <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'space-evenly' ,marginHorizontal:Scale(30),marginVertical:Scale(30)}}>
                          <Image source={ImagesPath.email} resizeMode='contain' style={{width:Scale(40),height:Scale(40)}} />
                        <Image source={ImagesPath.fb} resizeMode='contain' style={{ width: Scale(40), height: Scale(40) }} />
                        <Image source={ImagesPath.insta} resizeMode='contain' style={{ width: Scale(40), height: Scale(40) }} />
                        <Image source={ImagesPath.twitter} resizeMode='contain' style={{ width: Scale(40), height: Scale(40) }} />
                        <Image source={ImagesPath.tiktok} resizeMode='contain' style={{width:Scale(40),height:Scale(40)}} />
                          
                        
                    </View>
               </View>

            </View>
            <View style = {{  width:'100%', alignItems:'center',justifyContent:'center', position:'absolute',bottom:0, backgroundColor:Colors. BUTTON_COLOR, flexDirection:'row',height:Scale(100),borderTopLeftRadius:Scale(20),borderTopRightRadius:Scale(20)}}>
                <Text style={{ color: Colors.TEXT_COLOR, fontSize: Scale(16),}}>Don't have account?</Text>
            <Text style={{ color: Colors.RED, fontSize: Scale(16),marginHorizontal:Scale(2) }}>{'Create account'}</Text>  
            </View>
          </SafeAreaView>
     
     
    );
  }
}

export default Login;