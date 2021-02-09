import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Constants from '../constants';
import {HeaderStyles} from '../styles';

function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={HeaderStyles.container}>
      <TouchableOpacity activeOpacity={0.7} style={HeaderStyles.input}>
        <Text style={[HeaderStyles.searchInput]}>
          {'Santee, United States'}
        </Text>
      </TouchableOpacity>
      <View style={HeaderStyles.row}>
        <TouchableOpacity
          style={HeaderStyles.inputSearch}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SearchScreen')}>
          <Image
            resizeMode="contain"
            style={HeaderStyles.searchIcon}
            source={Constants.Images.search}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={HeaderStyles.inputSearch}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Notifications')}>
          <Image
            resizeMode="contain"
            style={HeaderStyles.notificationIcon}
            source={Constants.Images.notifications}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SearchBar;
