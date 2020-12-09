import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  borderRadius: { borderRadius: 20 },
  bottomHeader: {
    alignSelf: 'center',
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(20),
    marginTop: 20,
  },
  bottomHeader2: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(16),
    marginTop: 10,
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
  },
  icon: {
    height: 40,
    width: 40,
  },
  iconView: {
    alignSelf: 'center',
    marginTop: '25%',
  },
  levelStyle: {
    alignSelf: 'flex-end',
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    borderRadius: 4,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  levelText: {
    borderRadius: 10,
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
    fontSize: Constants.BaseStyle.scale(12),
  },
  lockedIcon: {
    alignSelf: 'center',
    height: 80,
    width: 80,
  },
  mainView: {
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: '20%',
  },

  optionalSection1: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },
  optionalSectionView: {
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  overlappingStyle: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
  profileIcon: {
    alignSelf: 'center',
    borderRadius: 20,
    height: height * 0.3,
    marginVertical: 30,
    width: width * 0.9,
  },
  section1: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(12),
  },
  section2: {
    alignSelf: 'center',
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
  },
  sectionMainView: {
    borderBottomWidth: 1,
    borderColor: Constants.Colors.WHITE,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  sectionView: {
    borderColor: Constants.Colors.WHITE,
    borderRightWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionViewEnd: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
    // alignSelf: 'center',
  },

});

export default StyleSheet.create(styles);
