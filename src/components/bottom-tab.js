import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { BottomTabsStyles } from '../styles';
import Constants from '../constants';

export const BottomTab = () => {
  const [t] = useTranslation();
  const i18 = (key) => t(key);

  return (
    <View style={BottomTabsStyles.tabs}>
      <TouchableOpacity style={BottomTabsStyles.tab}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarHome} />
        <Text style={BottomTabsStyles.tabText}>{i18('Home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={BottomTabsStyles.tab}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarFeed} />
        <Text style={BottomTabsStyles.tabText}>{i18('Discover')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[BottomTabsStyles.tab, BottomTabsStyles.add]}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarAdd} />
      </TouchableOpacity>
      <TouchableOpacity style={BottomTabsStyles.tab}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarChat} />
        <Text style={BottomTabsStyles.tabText}>{i18('Chat')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={BottomTabsStyles.tab}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarProfile} />
        <Text style={BottomTabsStyles.tabText}>{i18('MyProfile')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;
