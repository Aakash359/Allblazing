import { arrayOf, number } from 'prop-types';
import React from 'react';
import { ViewPropTypes, Text, View, Image } from 'react-native';
import { HomeStyles } from '../styles';

export const UserImages = ({
  style, users,
}) => (
  <View style={[HomeStyles.users, style]}>
    {users.map((user, index) => (
    // eslint-disable-next-line react/no-array-index-key
      <View key={`user-avatar-${index}`}>
        {index < 4 && <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={[HomeStyles.user, index !== 0 && HomeStyles.userSpace]} />}
        {index === 4 && <View style={[HomeStyles.user, HomeStyles.userSpace, HomeStyles.more]}><Text style={HomeStyles.moreText}>{'4+'}</Text></View> }
      </View>
    ))}
  </View>
);

UserImages.propTypes = {
  style: ViewPropTypes.style,
  users: arrayOf(number).isRequired,
};
UserImages.defaultProps = {
  style: {},
};

export default UserImages;
