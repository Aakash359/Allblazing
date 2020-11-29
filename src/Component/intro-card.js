import React from 'react';
import { arrayOf, number, oneOfType, string } from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import Constants from '../constants';
import StepBar from './step-bar';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Constants.BaseStyle.scale(50),
    marginTop: Constants.BaseStyle.scale(20),
  },
  image: {
    height: '90%', width: '100%',
  },
  title: {
    color: Constants.Colors.TEXT_COLOR_WHITE,
    lineHeight: Constants.BaseStyle.scale(30),
    marginLeft: Constants.BaseStyle.scale(5),
    textAlign: 'center',
    ...Constants.Fonts.ExtraLargeBold,
  },
  titleWrapper: {
    alignSelf: 'center',
    height: Constants.BaseStyle.scale(100),
    justifyContent: 'center',
    width: '70%',
  },
});

const IntroCard = ({
  title, selected, image,
}) => (
  <View style={styles.container}>
    <StepBar count={3} selected={selected} />
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <Image source={image} resizeMode='cover' style={styles.image} />
  </View>
);

IntroCard.propTypes = {
  image: number.isRequired,
  selected: arrayOf(oneOfType([string.isRequired, number.isRequired])).isRequired,
  title: string.isRequired,
};

export default IntroCard;
