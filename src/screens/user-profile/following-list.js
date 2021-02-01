import React, { useState,useCallback} from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import { FollowingStyles } from '../../styles';
import Constants from '../../constants';
import {useNavigation} from '@react-navigation/native';

function FollowingList() {
  const [search, setSearch] = useState(false);
  const navigation = useNavigation();

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
  // useEffect(() => {
  //   _fetchFollowing();
  // }, []);

  // const _fetchFollowing = useCallback(async () => {
  //   const token =
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
  //   // console.log('====>', token);
  //   const config = {
  //     headers: {Authorization: `Bearer ${token}`},
  //   };

  //   axios.get(API.FOLLOWING, config).then((response) => {
  //     if (response.data.data.result) {
  //       setList(response.data.data.result);
  //     }
  //     // console.log('res===>' + JSON.stringify(response.data.data.result));
  //   });
  // }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={FollowingStyles.sectionView}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('UserProfile')}
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
            placeholder="Search Following (123)"
            placeholderTextColor='#ccc'
            value={search}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setSearch(text);
            }}
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
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

export default FollowingList;
