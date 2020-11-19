import React, { Component } from 'react'
import { View, Text,Image,TouchableOpacity,TextInput} from 'react-native';

import { 
  ImagesPath,
  Colors,
  Scale,Fonts
  
} from '../Config';

export const InputContainer = (props) => {
    const {place,placeColor,value,mystyle,onPress} = props
    return (
       
           
            <View style ={{marginVertical:Scale(20), alignSelf:'center',height:Scale(45),width:'90%',backgroundColor:Colors. BUTTON_COLOR,borderRadius:Scale(8),alignItems:'center'}}>
            <TextInput
                {...props}   
             style={[{
          color: Colors.TEXT_COLOR,
          height: Scale(40),
         marginLeft:Scale(20),
          width: '100%',
        
          fontSize: Scale(14),
          marginTop: Scale(5),
          fontFamily: Fonts.Regular,
        },mystyle]}
        placeholder={place}
          value={value}
          onChangeText = {onPress}
      
        placeholderTextColor={Colors.TEXT_COLOR}
              />
               </View>
                 
    )
}