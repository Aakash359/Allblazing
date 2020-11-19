import React, { Component } from 'react';
import {
  View,
  StatusBar,TouchableOpacity,Text,Image, SafeAreaView
} from 'react-native';

import i18n from '../../Translation/i18n';

// assets
import { 
  ImagesPath,
  Colors,
  Scale,Fonts
  
} from '../../Config';
import { IntroCard } from '../../Components'
import {AuthStyle} from './AuthStyle';
class Intro extends Component {
  constructor() {
    super();
    this.state = {
     itemSelected:''
    };
  }
  
    
    
    onNext1 (value){
    this.setState({itemSelected:value})
    }
    onBack1() {
     this.setState({itemSelected:""})
}
     onNext2 (value){
    this.setState({itemSelected:value})
     }
     onBack2() {
     this.setState({itemSelected:""})
     }
    
    onStarted() {
       this.props.navigation.navigate('Login');
    }

    render() {
      const {itemSelected} = this.state
    return (
          <SafeAreaView style={{ flex: 1 , backgroundColor : Colors.THEME_COLOR,  }}>
            <StatusBar barStyle="light-content" />
            {itemSelected === "2" ?
                <View style={{ flex: 0.9 }}>
                    <IntroCard selected={itemSelected} img={ImagesPath.intro2} title = "Train or race together" />
                     <View style ={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(20)}}>
  <TouchableOpacity
              style={[AuthStyle.introButton,{backgroundColor:Colors.TRANSPARENT}]}
              activeOpacity={0.7}
              onPress={() => this.onBack2()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Back'}</Text>
                </TouchableOpacity>
                  <TouchableOpacity
              style={AuthStyle.introButton}
             
              onPress={() => this.onNext2("3")}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Next'}</Text>
            </TouchableOpacity>
            </View>
                </View>
                :
                itemSelected === "3" ?
                    <View style={{ flex: 0.9 }}>
                    <IntroCard selected={itemSelected} img={ImagesPath.intro3} title = "Capture and share the experience"/>
                     <TouchableOpacity
              style={[AuthStyle.loginTouchable,{backgroundColor:Colors.TEXT_COLOR2}]}
              activeOpacity={0.7}
              onPress={() => this.onStarted()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Get Started'}</Text>
            </TouchableOpacity>
            </View>
                 :
             <View style={{ flex: 0.9}}>
                    <IntroCard selected={""} img={ImagesPath.intro1} title = "Connect with other runners in your area" />
                     <View style ={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:Scale(20)}}>
  <TouchableOpacity
              style={[AuthStyle.introButton,{backgroundColor:Colors.TRANSPARENT}]}
              activeOpacity={0.7}
              onPress={() => this.onBack1()}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Back'}</Text>
                </TouchableOpacity>
                  <TouchableOpacity
              style={AuthStyle.introButton}
             
              onPress={() => this.onNext1("2")}>
              <Text style={[AuthStyle.buttonText,{color:Colors.WHITE}]}>{'Next'}</Text>
            </TouchableOpacity>
            </View>
                </View>    
            }

          </SafeAreaView>
     
     
    );
  }
}

export default Intro;