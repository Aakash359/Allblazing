import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import constants from '../constants';
import { HomeStyles } from '../styles';

export const SingleEvent = () => (
  <TouchableOpacity activeOpacity={0.7} style={HomeStyles.item}>
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
      <View style={HomeStyles.users}>
        {[1, 2, 3, 4, 5].map((user, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <View key={`user-avatar-${index}`}>
            {index < 4 && <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={[HomeStyles.user, index !== 0 && HomeStyles.userSpace]} />}
            {index === 4 && <View style={[HomeStyles.user, HomeStyles.userSpace, HomeStyles.more]}><Text style={HomeStyles.moreText}>{'8+'}</Text></View> }
          </View>
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

export default SingleEvent;
