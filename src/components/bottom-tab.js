import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { func, shape } from 'prop-types';
import { BottomTabsStyles } from '../styles';
import Constants from '../constants';

export const BottomTab = ({ navigation: { navigate } }) => {
  const [t] = useTranslation();
  const i18 = (key) => t(key);

  return (
    <View style={BottomTabsStyles.tabs}>
      <TouchableOpacity style={BottomTabsStyles.tab} onPress={() => navigate('Home')}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarHome} />
        <Text style={BottomTabsStyles.tabText}>{i18('home')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={BottomTabsStyles.tab} onPress={() => navigate('Settings')}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarFeed} />
        <Text style={BottomTabsStyles.tabText}>{i18('discover')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[BottomTabsStyles.tab, BottomTabsStyles.add]} onPress={() => navigate('Home')}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarAdd} />
      </TouchableOpacity>
      <TouchableOpacity style={BottomTabsStyles.tab} onPress={() => navigate('Home')}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarChat} />
        <Text style={BottomTabsStyles.tabText}>{i18('chat')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={BottomTabsStyles.tab} onPress={() => navigate('Home')}>
        <Image style={BottomTabsStyles.image} source={Constants.Images.tabBarProfile} />
        <Text style={BottomTabsStyles.tabText}>{i18('me')}</Text>
      </TouchableOpacity>
    </View>
  );
};

BottomTab.propTypes = {
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
};

export default BottomTab;
