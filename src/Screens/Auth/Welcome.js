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
import {AuthStyle} from './AuthStyle';
class Welcome extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }
  
    
    
    onContinue = () => {
        this.props.navigation.navigate('Intro');
    }

    render() {
      const {languageCode} = this.state
    return (
          <View style={{ flex: 1 , backgroundColor : Colors.THEME_COLOR,  }}>
            <StatusBar barStyle="light-content" />
            <View style ={{alignItems:'center',justifyContent:'center',flex:0.9,marginTop:Scale(30)}}>
                <View style ={{alignItems:'center',justifyContent:'center',marginBottom:Scale(30)}}>
                    <Text style={[AuthStyle.selectText,{fontWeight:'bold',fontSize:Scale(30),paddingVertical:Scale(10)}]}>Welcome</Text>
                <Text style={AuthStyle.selectText}>to ALLBLAZING</Text>
             </View>
                <View style = {AuthStyle.welcomeView}>
                    <Text style={[AuthStyle.buttonText, { textAlign: 'center', marginHorizontal: Scale(40) }]}>{'Connect with other runners in your area'}</Text>   
                </View>
                <Image source={ImagesPath.path1} resizeMode='contain' style={{ height: Scale(80), alignSelf: 'flex-start', }} /> 
                <View style = {AuthStyle.welcomeView}>
                    <Text style={[AuthStyle.buttonText, { textAlign: 'center', marginHorizontal: Scale(30) }]}>{'Train or race together'}</Text> 
                    
                </View>
                <Image source={ImagesPath.path2} resizeMode='contain' style={{ height: Scale(80), alignSelf: 'flex-end', }} /> 
            <View style = {AuthStyle.welcomeView}>
                    <Text style={[AuthStyle.buttonText, { textAlign: 'center', marginHorizontal: Scale(30) }]}>{'Capture and share the experience'}</Text> 
                    
                </View>
            </View>
             
              <TouchableOpacity
              style={[AuthStyle.loginTouchable,{backgroundColor:Colors.TEXT_COLOR2}]}
              activeOpacity={0.7}
              onPress={() => this.onContinue()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Get Started'}</Text>
            </TouchableOpacity>
          </View>
     
     
    );
  }
}

export default Welcome;