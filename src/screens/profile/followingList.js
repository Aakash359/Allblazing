import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { FollowersStyles } from '../../styles';
import Constants from '../../constants';

function FollowingList() {
  // const navigation = useNavigation();
  const [search, setSearch] = useState(false);

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
