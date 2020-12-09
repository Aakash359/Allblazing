import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  borderStyle: { borderRadius: 20 },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  endView: {
    backgroundColor: Constants.Colors.CARD_GREY,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopWidth: 1,
    marginHorizontal: 40,
    paddingBottom: 10,
  },
  heading: {
    alignSelf: 'center',
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(24),
    marginBottom: 8,
    marginTop: 24,
  },
  icon: {
    height: 40,
    width: 40,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 90,
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
  mainView: {
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: '20%',
    paddingBottom: 20,
  },
  profileIcon: {
    alignSelf: 'center',
    borderRadius: 20,
    height: height * 0.3,
    width: width * 0.9,
  },
  section1: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },
  section2: {
    alignSelf: 'center',
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
  },
  sectionMainView: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  sectionView: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
  },
  subHeading: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
  },
});

export default StyleSheet.create(styles);
