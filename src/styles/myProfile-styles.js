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
  sectionMainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: Constants.Colors.CARD_GREY,

  },
  sectionView: {
    marginTop: 20,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    // alignItems:'center',
    // width: '50%'
  },
  section1: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
    alignSelf: 'center',
  },
  mainView: {
    marginHorizontal: 20,
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    marginTop: '20%',
  },
  headerView: {
    borderRightWidth: 1,
    borderColor: Constants.Colors.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerViewEnd: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  headerMainView: {
    flexDirection: 'row',
    // alignSelf: 'center',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: Constants.Colors.WHITE,
  },
  profileIcon: {
    height: height * 0.3,
    width: width * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 30,
  },
  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    // marginTop: 24,
    // marginBottom: 8,
  },
  overlappingStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    margin: 16,
  },
  subHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
    // alignSelf: 'center',
  },
  section2: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    alignSelf: 'center',
  },
  bottomHeader: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(20),
    alignSelf: 'center',
    marginTop: 20,
  },
  bottomHeader2: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(16),
    alignSelf: 'center',
    marginTop: 10,
  },
  iconView: {
    alignSelf: 'center',
    marginTop: '25%',
  },
  icon: {
    width: 40,
    height: 40,
  },
  lockedIcon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  borderRadius: { borderRadius: 20 },

});

export default StyleSheet.create(styles);
