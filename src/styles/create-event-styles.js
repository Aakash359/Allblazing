import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  calendarIcon: {
    height: 18,
    width: 16,
  },
  clockIcon: {
    height: 16,
    width: 16,
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  description: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(16),
    height: height * 0.15,
    maxWidth: '100%',
    paddingLeft: 5,
    textAlignVertical: 'top',

  },
  eventType: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    marginHorizontal: 20,
    marginTop: 20,
  },
  groupName: {
    textAlign: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(16),
  },
  groupType: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    marginVertical: 10,
  },
  groupTypeView: {
    marginHorizontal: 10,
    marginRight: 20,
  },
  halfView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: 12,
    flexDirection: 'row',
    padding: 15,
    width: width * 0.43,
  },
  imageIcon: {
    alignSelf: 'center',
    height: 36,
    width: 48,
  },
  imageText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(14),
    paddingTop: 13,
    textAlign: 'center',
  },
  imageView: {
    alignSelf: 'center',
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    height: height * 0.3,
    justifyContent: 'center',
    marginVertical: 20,
    // paddingHorizontal: 16,
    width: width * 0.9,
  },
  innerContainer: { marginHorizontal: 6 },
  liveEventView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  nextText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    textAlign: 'center',
  },
  nextView: {
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: 4,
    marginBottom: height * 0.05,
    marginTop: height * 0.05,
    padding: 15,
    width: width * 0.8,
  },
  optionalSectionView: {
    alignSelf: 'center',
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 8,
    marginHorizontal: width * 0.01,
    marginVertical: width * 0.01,
    width: width * 0.28,
  },
  optionalText: {
    alignSelf: 'center',
    color: Constants.Colors.WHITE,
    padding: 16,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  searchView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 15,
  },
});

export default StyleSheet.create(styles);
