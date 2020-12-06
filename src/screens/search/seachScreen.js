import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SingleEvent, InviteFriend } from '../../components';
import { SearchScreen } from '../../styles';
// import ProfileUnlock from './myProfile';

import Constants from '../../constants';

function SearchSeceen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState(false);

  const renderItem = () => <SingleEvent />;

  const renderHeader = ({
    route, title,
  }) => (
    <View style={SearchScreen.content}>
      <Text style={SearchScreen.heading}>{title}</Text>
      <TouchableOpacity hitSlop={Constants.BaseStyle.HALF_HIT_SLOP} onPress={() => navigation.navigate(route)}>
        <Text style={SearchScreen.rightHeading}>{'View All'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <SafeAreaView style={SearchScreen.container}>
        <ScrollView>
          <View style={SearchScreen.searchView}>
            <Image
              source={Constants.Images.search}
              style={SearchScreen.searchIcon}
            />
            <TextInput
              placeholder="Find runner, group, event, club, coach etc..."
              placeholderTextColor={Constants.Colors.GREY_BORDER}
              style={SearchScreen.searchText}
              value={search}
              autoCapitalize="none"
              autoCorrect={false}
              // underlineColorAndroid='#ccc'
              onChangeText={(text) => {
                setSearch(text);
              }}
            />
          </View>
          <View>
            {renderHeader({
              navigation, route: 'Runners', title: 'Runners',
            })}
            <FlatList
              data={[1, 2, 3, 4]}
              renderItem={() => <InviteFriend />}
              keyExtractor={(item, index) => index}
            />
            {renderHeader({
              navigation, route: 'Events', title: 'Events',
            })}
            <FlatList
              scrollEnabled={false}
              data={[1]}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default SearchSeceen;
