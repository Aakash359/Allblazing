
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { FollowingStyles } from '../../styles';
import Constants from '../../constants';

function FollowersList() {
  const [search, setSearch] = useState('');

  const list = [
    {
      image: '#F898A4',
      location: 'Santee, United States',
      name: 'Cameron Williamson',

    },
    {
      image: '#B7FFBD',
      location: 'Santee, United States',
      name: 'Sterre Kalis',
    },
    {
      image: '#FEFFBE',
      location: 'Santee, United States',
      name: 'Heather Siegers',
    },
    {
      image: '#FFBE61',
      location: 'Santee, United States',
      name: 'Esther Corder',
    },
    {
      image: '#9BE0F1',
      location: 'Santee, United States',
      name: 'Sheldon Cotrell',
    },
    {
      image: '#FFCFEA',
      location: 'Santee, United States',
      name: 'Mariska Kornet',
    },
    {
      image: '#F898A4',
      location: 'Santee, United States',
      name: 'Cameron Williamson',
    },
    {
      image: '#B7FFBD',
      location: 'Santee, United States',
      name: 'Sterre Kalis',
    },
    {
      image: '#FEFFBE',
      location: 'Santee, United States',
      name: 'Heather Siegers',
    },
  ];
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={FollowingStyles.sectionView}
    >
      <View style={[FollowingStyles.listView, { backgroundColor: item.image }]} />
      <View>
        <Text style={FollowingStyles.nameText}>{item.name}</Text>
        <Text style={FollowingStyles.locationText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView style={FollowingStyles.container}>
        <View style={FollowingStyles.searchView}>
          <Image
            source={Constants.Images.search}
            style={FollowingStyles.searchIcon}
          />
          <TextInput
            placeholder="Search Followers (48)"
            placeholderTextColor='#ccc'
            value={search}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={FollowingStyles.flatList}
          data={list}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
}

export default FollowersList;
