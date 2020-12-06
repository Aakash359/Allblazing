/* eslint-disable sort-keys */
import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    // flex: 1,
  },
  overlappingStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 16,
  },
  icon: {
    width: 40,
    height: 40,
  },
  profileIcon: {
    height: height * 0.3,
    width: width * 0.9,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 30,
  },
  inputStyle: {
    width: '95%',
    height: height * 0.08,
    // marginVertical: 10,
    borderRadius: 10,
    margin: 10,
  },
  textView: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    borderRadius: 10,
  },
  goalText: {
    fontSize: Constants.BaseStyle.scale(12),
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    borderRadius: 10,
  },
  containerPB: {
    backgroundColor: Constants.Colors.PRIMARY,
    margin: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerViewPB: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerText: {
    ...Constants.Fonts.Regular,
    fontSize: Constants.BaseStyle.scale(16),
    color: Constants.Colors.WHITE,
  },
  liveView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    width: width * 0.9,
    height: height * 0.25,
    borderWidth: 1,
    borderColor: Constants.Colors.BORDER_GREY,
    borderRadius: 10,
  },
  videoIcon: {
    width: 48,
    height: 27,
    marginTop: height * 0.125,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  containerLikes: {
    backgroundColor: Constants.Colors.PRIMARY,
    // margin: 20,
  },
  headerViewLike: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  headerTextLike: {
    ...Constants.Fonts.RegularBold,
    fontSize: Constants.BaseStyle.scale(16),
    color: Constants.Colors.WHITE,
    width: '90%',
  },
  headerQuestuion: {
    ...Constants.Fonts.Regular,
    fontSize: Constants.BaseStyle.scale(14),
    color: Constants.Colors.GREY_CIRCLE,
    paddingBottom: 15,
    width: '90%',
  },
  subHeaderTextLike: {
    ...Constants.Fonts.Regular,
    fontSize: Constants.BaseStyle.scale(16),
    color: Constants.Colors.GREY_BORDER,
  },
  borderStyle: { borderRadius: 20 },
  flexDirection: { flexDirection: 'column' },
});

export default StyleSheet.create(styles);
