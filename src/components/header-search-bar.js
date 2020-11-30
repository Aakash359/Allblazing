import { func, string } from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image, TextInput, View, ViewPropTypes } from 'react-native';
import Constants from '../constants';
import { HeaderStyles } from '../styles';

const SearchBar = ({
  onChangeText,
  keyword,
  style,
}) => (
  <View style={HeaderStyles.container}>
    <View style={HeaderStyles.input}>
      <TextInput
        placeholder="Search"
        placeholderTextColor='#ccc'
        value={keyword}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid='#ccc'
        onChangeText={onChangeText}
        style={[HeaderStyles.searchInput, style]}
      />
    </View>
    <View style={HeaderStyles.row}>
      <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.searchIcon} source={Constants.Images.search} /></TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}><Image resizeMode='contain' style={HeaderStyles.notificationIcon} source={Constants.Images.notifications} /></TouchableOpacity>
    </View>
  </View>
);

SearchBar.propTypes = {
  keyword: string.isRequired,
  onChangeText: func.isRequired,
  style: ViewPropTypes.style,
};

SearchBar.defaultProps = { style: {} };

export default SearchBar;
