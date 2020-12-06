/* eslint-disable sort-keys */
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { FollowersStyles } from '../../styles';
// import ProfileUnlock from './myProfile';
import Constants from '../../constants';

function FollowingList() {
  // const navigation = useNavigation();
  const [search, setSearch] = useState(false);

  const list = [
    {
      name: 'Cameron Williamson',
      location: 'Santee, United States',
      image: '#F898A4',
    },
    {
      name: 'Sterre Kalis',
      location: 'Santee, United States',
      image: '#B7FFBD',
    },
    {
      name: 'Heather Siegers',
      location: 'Santee, United States',
      image: '#FEFFBE',
    },
    {
      name: 'Esther Corder',
      location: 'Santee, United States',
      image: '#FFBE61',
    },
    {
      name: 'Sheldon Cotrell',
      location: 'Santee, United States',
      image: '#9BE0F1',
    },
    {
      name: 'Mariska Kornet',
      location: 'Santee, United States',
      image: '#FFCFEA',
    },
    {
      name: 'Cameron Williamson',
      location: 'Santee, United States',
      image: '#F898A4',
    },
    {
      name: 'Sterre Kalis',
      location: 'Santee, United States',
      image: '#B7FFBD',
    },
    {
      name: 'Heather Siegers',
      location: 'Santee, United States',
      image: '#FEFFBE',
    },
    {
      name: 'Esther Corder',
      location: 'Santee, United States',
      image: '#FFBE61',
    },
    {
      name: 'Sheldon Cotrell',
      location: 'Santee, United States',
      image: '#9BE0F1',
    },
    {
      name: 'Mariska Kornet',
      location: 'Santee, United States',
      image: '#FFCFEA',
    },
  ];
  const renderItem = ({ item }) => (
    // <View style={}>
    <TouchableOpacity
      style={[FollowersStyles.sectionView]}
      // onPress={() =>{}}
    >
      <View style={[FollowersStyles.listView, { backgroundColor: item.image }]} />
      <View>
        <Text style={FollowersStyles.nameText}>{item.name}</Text>
        <Text style={FollowersStyles.locationText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
    // </View>
  );

  return (
    <>
      <ScrollView style={FollowersStyles.container}>
        <View style={FollowersStyles.searchView}>
          <Image
            source={Constants.Images.search}
            style={FollowersStyles.searchIcon}
          />
          <TextInput
            placeholder="Search Followers (48)"
            placeholderTextColor='#ccc'
            value={search}
            autoCapitalize="none"
            autoCorrect={false}
            // underlineColorAndroid='#ccc'
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>
        <FlatList
          // style={MyProfileStyles.sectionMainView}
          scrollEnabled={false}
          contentContainerStyle={FollowersStyles.flatList}
          data={list}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
}

export default FollowingList;
