import React from 'react';
import { Image, TouchableOpacity, View,Text } from 'react-native';
import { arrayOf, func, shape, string } from 'prop-types';
import { BottomTabsStyles,CreateNewStyles } from '../styles';
import Constants from '../constants';
import {PlusIconPopup} from '../components';
import Modal from 'react-native-modalbox';
const getTabImage = (name, active) => {
  if (name === 'Home') {
    return active ? Constants.Images.tabBarHomeActive : Constants.Images.tabBarHome;
  }

  if (name === 'Discover') {
    return active ? Constants.Images.tabBarFeedActive : Constants.Images.tabBarFeed;
  }

  if (name === 'Create') {
    return Constants.Images.tabBarAdd;
  }

  if (name === 'Chat') {
    return active ? Constants.Images.tabBarChatActive : Constants.Images.tabBarChat;
  }

  if (name === 'Me') {
    return active ? Constants.Images.tabBarProfileActive : Constants.Images.tabBarProfile;
  }

  return Constants.Images.tabBarHome;
};

export const BottomTab = ({
  state, descriptors, navigation
}) => {
  const [visible,setVisible] = React.useState(false) 
  return( <View style={[BottomTabsStyles.tabs]}>
 
    {visible && (
           <PlusIconPopup
           navigation = {navigation}
             onClose={() => setVisible(false)}
           />
         )}
     {state.routes.map((route, index) => {
       const { options } = descriptors[route.key];
 
       let label = '';
 
       if (options.tabBarLabel) {
         label = options.tabBarLabel;
       } else if (options.title) {
         label = options.title;
       } else {
         label = route.name;
       }
 
       const isFocused = state.index === index;
 
       const onPress = () => {
         
         
         const event = navigation.emit({
           canPreventDefault: true,
           target: route.key,
           type: 'tabPress',
         });
 
         if (!isFocused && !event.defaultPrevented) {
           navigation.navigate(route.name);
         }
         if(route.name ==='Create'){
            setVisible(true)
           
           
                   }
       };
 
       const onLongPress = () => {
         navigation.emit({
           target: route.key,
           type: 'tabLongPress',
         });
       };
 
       const currentImage = getTabImage(label, isFocused);
 
       return label === 'Create' ? (
         <View style={BottomTabsStyles.addContainer} key={`${index}`}>
           <TouchableOpacity
             activeOpacity={0.7}
             key={route.key}
             style={BottomTabsStyles.add}
             onPress={onPress}
             onLongPress={onLongPress}
             accessibilityRole="button"
             accessibilityState={isFocused ? { selected: true } : {}}
             accessibilityLabel={options.tabBarAccessibilityLabel}
             testID={options.tabBarTestID}
           >
             <Image style={BottomTabsStyles.image} source={currentImage} />
           </TouchableOpacity>
         </View>
       ) : (
         <TouchableOpacity
           activeOpacity={0.7}
           key={route.key}
           style={BottomTabsStyles.tab}
           onPress={onPress}
           onLongPress={onLongPress}
           accessibilityRole="button"
           accessibilityState={isFocused ? { selected: true } : {}}
           accessibilityLabel={options.tabBarAccessibilityLabel}
           testID={options.tabBarTestID}
         >
           <Image style={BottomTabsStyles.image} source={currentImage} />
         </TouchableOpacity>
       );
     })}
   </View>)
}
 


BottomTab.propTypes = {
  descriptors: shape({ name: string }).isRequired,
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
  state: shape({ routes: arrayOf(shape({ key: string.isRequired })).isRequired }).isRequired,
};

export default BottomTab;
