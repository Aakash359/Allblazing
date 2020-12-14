/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateGroupStyles } from '../../styles';
import Constants from '../../constants';

function CreateGroup() {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  const [option, setOption] = useState('');
  const optionList = ['Public', 'Private', 'Female Only', 'Club', 'Coach', 'Level', 'Expat', 'Elite', 'Ultra'];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[CreateGroupStyles.optionalSectionView, { backgroundColor: item === option ? Constants.Colors.GRAY : Constants.Colors.CARD_GREY }]}
      onPress={() => { setOption(item); }}
    >
      <Text style={[CreateGroupStyles.optionalText]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={CreateGroupStyles.container}>
      <ScrollView style={CreateGroupStyles.innerContainer}>
        <View style={CreateGroupStyles.imageView}>
          <Image
            source={Constants.Images.imageIcon}
            style={CreateGroupStyles.imageIcon}
          />
          <Text style={CreateGroupStyles.imageText}>Add event image</Text>
        </View>
        <View style={CreateGroupStyles.searchView}>
          <TextInput
            placeholder="Group Name"
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateGroupStyles.groupName}
          />
        </View>
        <View>
          <Text style={CreateGroupStyles.groupType}>Group Type</Text>
          <FlatList
            numColumns={3}
            scrollEnabled={false}
            data={optionList}
            renderItem={renderItem}
            keyExtractor={(id, index) => index.toString()}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddMember')}
          style={CreateGroupStyles.nextView}
        >
          <Text style={CreateGroupStyles.nextText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateGroup;
