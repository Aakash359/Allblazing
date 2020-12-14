import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({

  commentHeader: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    margin: 16,
    marginTop: 24,
  },
  commentImage: {
    height: 36,
    width: 36,
  },
  commentText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
  },
  commentView: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  flexRow: {
    alignItems: 'center', flexDirection: 'row',
  },
  followText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },
  followerView: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    marginLeft: 8,
  },
  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
  },
  heartIcon: {
    height: 16,
    marginRight: 6,
    width: 18,
  },
  heartView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
  },
  levelStyle: {
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  liveLogo: {
    height: 20,
    margin: 16,
    width: 27,
  },
  liveText: {
    borderRadius: 10,
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
    fontSize: Constants.BaseStyle.scale(12),
  },
  liveUserIcone: {
    borderRadius: 23,
    height: 46,
    marginRight: 10,
    width: 46,
  },
  nameText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(14),
  },
  nameView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: 12,
    flexDirection: 'row',
    marginLeft: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  overlappingStyle: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  profileIcon: {
    alignSelf: 'center',
    borderRadius: 20,
    height: height * 0.3,
    width: width * 1,
  },
  sectionMainView: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  subHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
  },
});

export default StyleSheet.create(styles);
