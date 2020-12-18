import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateEventStyles } from '../../styles';
import Constants from '../../constants';

function CreateEvent() {
  const navigation = useNavigation();
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={CreateEventStyles.container}>
      <ScrollView style={CreateEventStyles.innerContainer}>
        <View style={CreateEventStyles.imageView}>
          <Image
            source={Constants.Images.imageIcon}
            style={CreateEventStyles.imageIcon}
          />
          <View>
            <Text style={CreateEventStyles.imageText}>Add event image</Text>
          </View>
        </View>
        <View style={CreateEventStyles.liveEventView}>
          <Text style={CreateEventStyles.groupType}>Live Event</Text>
          <TouchableOpacity>
            <Image
              source={Constants.Images.toggleOff}
              style={CreateEventStyles.imageIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={CreateEventStyles.eventType}>Event Type</Text>
        <View style={CreateEventStyles.rowStyle}>
          <TouchableOpacity style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Group</Text>
          </TouchableOpacity>
        </View>
        <Text style={CreateEventStyles.eventType}>Event Category</Text>
        <View style={CreateEventStyles.rowStyle}>
          <TouchableOpacity style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Running</Text>
          </TouchableOpacity>
          <TouchableOpacity style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Racing</Text>
          </TouchableOpacity>
        </View>
        <View style={CreateEventStyles.rowStyle}>
          <TouchableOpacity style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Club</Text>
          </TouchableOpacity>
        </View>

        <View style={CreateEventStyles.searchView}>
          <TextInput
            placeholder="Event Name"
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateEventStyles.groupName}
          />
        </View>
        <View style={CreateEventStyles.searchView}>
          <TextInput
            placeholder="Date"
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateEventStyles.groupName}
          />
          <Image
            source={Constants.Images.calendar}
            style={CreateEventStyles.calendarIcon}
          />
        </View>
        <View style={CreateEventStyles.searchView}>
          <TextInput
            placeholder="Time"
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateEventStyles.groupName}
          />
          <Image
            source={Constants.Images.clock}
            style={CreateEventStyles.clockIcon}
          />
        </View>
        <View style={CreateEventStyles.searchView}>
          <TextInput
            placeholder="Event Address Line 1"
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateEventStyles.groupName}
          />
        </View>
        <View style={CreateEventStyles.searchView}>
          <TextInput
            placeholder="Event Address Line 2"
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateEventStyles.groupName}
          />
        </View>
        <View style={CreateEventStyles.searchView}>
          <TextInput
            multiline
            numberOfLines={5}
            placeholder="Description..."
            placeholderTextColor={Constants.Colors.GREY_BORDER}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => {
              setName(text);
            }}
            style={CreateEventStyles.description}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddMember')}
          style={CreateEventStyles.nextView}
        >
          <Text style={CreateEventStyles.nextText}>Create Event</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateEvent;
