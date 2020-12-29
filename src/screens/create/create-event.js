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
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={Constants.Images.toggleOff}
              style={CreateEventStyles.imageIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={CreateEventStyles.eventType}>Event Type</Text>
        <View style={CreateEventStyles.rowStyle}>
          <TouchableOpacity activeOpacity={0.7} style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Group</Text>
          </TouchableOpacity>
        </View>
        <Text style={CreateEventStyles.eventType}>Event Category</Text>
        <View style={CreateEventStyles.rowStyle}>
          <TouchableOpacity activeOpacity={0.7} style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Train</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Race</Text>
          </TouchableOpacity>
        </View>
        <View style={CreateEventStyles.rowStyle}>
          <TouchableOpacity activeOpacity={0.7} style={CreateEventStyles.halfView}>
            <Text style={CreateEventStyles.groupName}>Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={CreateEventStyles.halfView}>
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
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
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
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
          />
          <Image
            source={Constants.Images.calendar}
            style={CreateEventStyles.calendarIcon}
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
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
          />
          <Image
            source={Constants.Images.clock}
            style={CreateEventStyles.clockIcon}
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
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
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
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
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
            underlineColorAndroid={Constants.Colors.TRANSPARENT}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
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
