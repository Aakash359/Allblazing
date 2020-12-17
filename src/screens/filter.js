import React from 'react';
import { ScrollView, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from '../constants';
import { CommonStyles, FilterStyles } from '../styles';
import { distanceList, levels } from '../data';

const Filter = () => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [connect, setConnectType] = React.useState('train');
  const [distance, setDistance] = React.useState(null);
  const [gender, setGender] = React.useState('male');

  return (
    <View style={CommonStyles.container}>
      <ScrollView>
        <View style={FilterStyles.wrapper}>
          <Text style={FilterStyles.header}>Location</Text>
          <View style={FilterStyles.row}>
            <Text style={FilterStyles.subHeader}>Near Me</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsEnabled(!isEnabled)}>
              <Image source={isEnabled ? Constants.Images.toggleOn : Constants.Images.toggleOff} style={FilterStyles.switch} />
            </TouchableOpacity>
          </View>
          <View style={FilterStyles.input}>
            <TextInput
              placeholder="Search location"
              placeholderTextColor='#ccc'
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid='#ccc'
              style={FilterStyles.searchInput}
            />
          </View>
          <Text style={FilterStyles.header}>Connect</Text>
          <View style={[FilterStyles.row, FilterStyles.connectRow]}>
            <TouchableOpacity onPress={() => setConnectType('train')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={connect === 'train' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={connect === 'train' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>Train</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setConnectType('race')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={connect === 'race' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={connect === 'race' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>Race</Text>
            </TouchableOpacity>
          </View>
          <Text style={FilterStyles.header}>{connect === 'train' ? 'Level*' : 'Distance to race'}</Text>
          {connect === 'train' ? (
            <View style={[FilterStyles.row, FilterStyles.connectRow, FilterStyles.levelsContainer]}>
              {levels.map((level) => (
                <TouchableOpacity key={level.value} activeOpacity={0.7} style={[FilterStyles.level, { backgroundColor: level.color }]}>
                  <Text style={FilterStyles.levelColor}>
                    {`Level ${level.value}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={[FilterStyles.row, FilterStyles.connectRow, FilterStyles.levelsContainer]}>
              {distanceList.map((dis) => (
                <TouchableOpacity key={dis.value} activeOpacity={0.7} style={[FilterStyles.race, dis.value === distance && FilterStyles.raceActive]} onPress={() => setDistance(dis.value)}>
                  <Text style={[FilterStyles.raceText, dis.value === distance && FilterStyles.raceActiveText]}>{`${dis.label}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={FilterStyles.header}>Gender</Text>
          <View style={[FilterStyles.row, FilterStyles.connectRow]}>
            <TouchableOpacity onPress={() => setGender('male')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={gender === 'male' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={gender === 'male' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('female')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={gender === 'female' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={gender === 'female' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={FilterStyles.buttonsWrapper}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={FilterStyles.subHeader}>Reset All</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={FilterStyles.button}>
            <Text style={FilterStyles.subHeader}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Filter;
