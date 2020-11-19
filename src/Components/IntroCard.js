import React, { Component } from 'react'
import { View, Text,Image,TouchableOpacity} from 'react-native';

import { 
  ImagesPath,
  Colors,
  Scale,Fonts
  
} from '../Config';

export const IntroCard = (props) => {
    const {title,selected, img} = props
    return (
        <View style={{
            flex: 1, marginBottom: Scale(50), marginTop:Scale(20)}}>
            <View style = {{flexDirection:'row',justifyContent:'space-evenly',marginHorizontal:Scale(10)}}>
                <View style={{ flex: 1, height: Scale(3), backgroundColor: Colors.WHITE }}></View>
                <View style={{ flex: 1, height: Scale(3), backgroundColor: selected ==='2' || selected==='3'? Colors.WHITE: Colors.TEXT_COLOR2,marginHorizontal:Scale(10)}}></View>
                 <View style ={{flex:1,height:Scale(3),backgroundColor: selected==='3'? Colors.WHITE: Colors.TEXT_COLOR2}}></View>
           </View>
            <View style ={{height:Scale(100),width:'70%',alignSelf:'center' ,justifyContent:'center'}}>
                <Text style={{ fontSize: Scale(22),
    color: Colors.TEXT_COLOR_WHITE,
     fontFamily: Fonts.Bold,
    lineHeight:Scale(30),
    fontWeight: 'bold',
    textAlign:'center',
                        marginLeft: Scale(5),
                    }}>{title} </Text>
               </View>
                      
                     <Image source={img} resizeMode='cover' style={{ height:'90%',  width:'100%'}} /> 
               
        
             
        </View>
    )
}