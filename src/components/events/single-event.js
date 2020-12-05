import { func } from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import constants from '../../constants';
import { HomeStyles } from '../../styles';
import UserImages from '../user-images';

export const SingleEvent = ({ onPress }) => (
  <TouchableOpacity activeOpacity={1} style={HomeStyles.item} onPress={onPress}>
    <View style={HomeStyles.row}>
      <View style={HomeStyles.dateView}>
        <Text style={HomeStyles.title}>{'30'}</Text>
        <Text style={HomeStyles.title}>{'Oct'}</Text>
      </View>
      <View style={HomeStyles.wrapper}>
        <Text style={HomeStyles.header}>{'Emily Vs Maaike, 1km Race'}</Text>
        <Text style={HomeStyles.location}>{'NY, US United States'}</Text>
      </View>
    </View>
    <Text style={HomeStyles.description}>
      {'Emily and Maaike go head to head over 1km. For more info on the runners\' stats... Alongside the professional 10km event, there’s also a 5km and 10km event for recreational...'}
    </Text>
    <View style={[HomeStyles.row, HomeStyles.usersRow]}>
      <View style={HomeStyles.icons}>
        <Image source={constants.Images.fb} style={HomeStyles.icon} />
        <Text style={HomeStyles.iconText}>{'Watching'}</Text>
      </View>
      <UserImages users={[1, 2, 3, 4, 5]} />
    </View>
  </TouchableOpacity>
);

SingleEvent.propTypes = { onPress: func.isRequired };

export default SingleEvent;
