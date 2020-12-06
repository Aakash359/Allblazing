
import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from '../constants';
import { HeaderStyles } from '../styles';

function SearchBar() {
  const navigation = useNavigation();

  return (
    <View style={HeaderStyles.container}>
      <View style={HeaderStyles.input}>
        <Text style={[HeaderStyles.searchInput]}>{'Santee, United States'}</Text>
      </View>
      <View style={HeaderStyles.row}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SearchScreen')}>
          <Image resizeMode='contain' style={HeaderStyles.searchIcon} source={Constants.Images.search} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.notificationIcon} source={Constants.Images.notifications} /></TouchableOpacity>
      </View>
    </View>
  );

  // SearchBar.propTypes = {
  //   keyword: string.isRequired,
  //   onChangeText: func.isRequired,
  //   style: ViewPropTypes.style,
  // };

  // SearchBar.defaultProps = { style: {} };
}

export default SearchBar;
