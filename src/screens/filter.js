import React from 'react';
import { ScrollView, TextInput, View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../constants';
import { CommonStyles, FilterStyles } from '../styles';
import { distanceList, levels } from '../data';

const Filter = ({ t: translate }) => {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [connect, setConnectType] = React.useState('train');
  const [distance, setDistance] = React.useState(null);
  const [gender, setGender] = React.useState('male');

  return (
    <View style={CommonStyles.container}>
      <ScrollView>
        <View style={FilterStyles.wrapper}>
          <Text style={FilterStyles.header}>{translate('filters.Location')}</Text>
          <View style={[FilterStyles.row, isEnabled && FilterStyles.switchOn]}>
            <Text style={FilterStyles.subHeader}>Near Me</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsEnabled(!isEnabled)}>
              <Image source={isEnabled ? Constants.Images.toggleOn : Constants.Images.toggleOff} style={FilterStyles.switch} />
            </TouchableOpacity>
          </View>
          <View style={FilterStyles.input}>
            <TextInput
              placeholder={translate('filters.SearchLocation')}
              placeholderTextColor={Constants.Colors.TEXT_COLOR}
              autoCapitalize="none"
              autoCorrect={false}
              style={FilterStyles.searchInput}
              underlineColorAndroid={Constants.Colors.TRANSPARENT}
            />
          </View>
          <Text style={FilterStyles.header}>{translate('filters.Connect')}</Text>
          <View style={[FilterStyles.row, FilterStyles.connectRow]}>
            <TouchableOpacity onPress={() => setConnectType('train')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={connect === 'train' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={connect === 'train' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>{translate('filters.Train')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setConnectType('race')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={connect === 'race' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={connect === 'race' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>{translate('filters.Race')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={FilterStyles.header}>{connect === 'train' ? `${translate('filters.Level')}*` : translate('filters.Distance')}</Text>
          {connect === 'train' ? (
            <View style={[FilterStyles.row, FilterStyles.connectRow, FilterStyles.levelsContainer]}>
              {levels.map((level) => (
                <TouchableOpacity key={level.value} activeOpacity={0.7} style={[FilterStyles.level, { backgroundColor: level.color }]}>
                  <Text style={FilterStyles.levelColor}>
                    {`${translate('filters.Level')} ${level.value}`}
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
          <Text style={FilterStyles.header}>{translate('Gender')}</Text>
          <View style={[FilterStyles.row, FilterStyles.connectRow]}>
            <TouchableOpacity onPress={() => setGender('male')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={gender === 'male' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={gender === 'male' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>{translate('Male')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('female')} activeOpacity={0.7} style={FilterStyles.radio}>
              <Ionicons
                name={gender === 'female' ? 'ios-radio-button-on-outline' : 'ios-radio-button-off-outline'}
                size={25}
                color={gender === 'female' ? Constants.Colors.WHITE : Constants.Colors.TEXT_COLOR2}
              />
              <Text style={FilterStyles.subHeader}>{translate('Female')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={FilterStyles.buttonsWrapper}>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={FilterStyles.subHeader}>{translate('ResetAll')}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={FilterStyles.button}>
            <Text style={FilterStyles.subHeader}>{translate('Apply')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

Filter.propTypes = { t: func.isRequired };

export default withTranslation()(Filter);
