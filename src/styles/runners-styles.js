/* eslint-disable sort-keys */
import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  mainView: {
    marginHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    marginTop: '20%',
  },
  sectionMainView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  profileIcon: {
    height: height * 0.3,
    width: width * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
    // marginTop: 50,
  },
  levelStyle: {
    // backgroundColor : '#9BE0F1',
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    alignSelf: 'flex-end',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 16,
  },
  levelText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
    fontSize: Constants.BaseStyle.scale(12),
    borderRadius: 10,
    // margin: 20,
  },
  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(24),
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  subHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    alignSelf: 'center',
  },
  sectionView: {
    marginHorizontal: 20,
    backgroundColor: Constants.Colors.PRIMARY,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    // alignItems:'center',
    // width: '50%'
  },
  section1: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
    alignSelf: 'center',
  },
  section2: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 90,
    marginTop: 30,
  },
  endView: {
    marginHorizontal: 40,
    backgroundColor: Constants.Colors.CARD_GREY,
    borderTopWidth: 1,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 10,
  },
  borderStyle: { borderRadius: 20 },

});

export default StyleSheet.create(styles);
