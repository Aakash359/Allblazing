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
class SelectLanguage extends Component {
  constructor() {
    super();
    this.state = {
      languageCode: '',
    };
  }
  
    onSelectLang = (code) => {
    this.setState({languageCode:code})
    }
    
    onContinue = () => {
      this.props.navigation.navigate('Welcome');
    }

    render() {
      const {languageCode} = this.state
    return (
          <View style={{ flex: 1 , backgroundColor : Colors.THEME_COLOR  }}>
            <StatusBar barStyle="light-content" />
            <View style ={{alignItems:'center',justifyContent:'center',flex:0.9}}>
               <Image source={ImagesPath.slectLangLogo2x} resizeMode='contain' style ={{width:'80%',alignSelf:'center',marginBottom:Scale(40)}} />
                <Text style={AuthStyle.selectText}>Select Your Language</Text>
                <TouchableOpacity
           style={[AuthStyle.loginTouchable,{flexDirection: 'row', justifyContent: 'space-between',}]}
              activeOpacity={0.7}
                    onPress={() => this.onSelectLang('en')}>
                     <Text style={AuthStyle.buttonText}>{"     "}</Text>
                    <Text style={[AuthStyle.buttonText,{color:languageCode !=="en"?Colors.TEXT_COLOR2:Colors.TEXT_COLOR_WHITE}]}>{'English'}</Text>
                {languageCode ==='en'?<Image source={ImagesPath.check} resizeMode='contain' style={AuthStyle.checkImg}/>: <Text  style={AuthStyle.checkImg}>{}</Text>}
                </TouchableOpacity>
                 <TouchableOpacity
              style={[AuthStyle.loginTouchable,{flexDirection: 'row', justifyContent: 'space-between',}]}
              activeOpacity={0.7}
                    onPress={() => this.onSelectLang('du')}>
                     <Text style={AuthStyle.buttonText}>{"     "}</Text>
                    <Text style={[AuthStyle.buttonText,{color:languageCode !=="du"?Colors.TEXT_COLOR2:Colors.TEXT_COLOR_WHITE}]}>{'Dutch'}</Text>
                    {languageCode ==='du'?<Image source={ImagesPath.check} resizeMode='contain' style={AuthStyle.checkImg}/>: <Text  style={AuthStyle.checkImg}>{}</Text>}
            </TouchableOpacity>

            </View>
              <TouchableOpacity
              style={[AuthStyle.loginTouchable,{backgroundColor:languageCode ===""?Colors.BUTTON_COLOR:Colors.TEXT_COLOR2,}]}
              activeOpacity={0.7}
              onPress={() => this.onContinue()}>
              <Text style={[AuthStyle.buttonText,{color:languageCode ===""?Colors.TEXT_COLOR2:Colors.TEXT_COLOR_WHITE,}]}>{' Select & Continue '}</Text>
            </TouchableOpacity>
          </View>
     
     
    );
  }
}

export default SelectLanguage;