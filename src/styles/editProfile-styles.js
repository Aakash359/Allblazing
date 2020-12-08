import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  borderStyle: { borderRadius: 20 },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    // flex: 1,
  },
  containerLikes: {
    backgroundColor: Constants.Colors.PRIMARY,
    // margin: 20,
  },
  containerPB: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 10,
    margin: 20,
  },
  flexDirection: { flexDirection: 'column' },
  goalText: {
    borderRadius: 10,
    fontSize: Constants.BaseStyle.scale(12),
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
  },
  headerQuestion: {
    color: Constants.Colors.GREY_CIRCLE,
    ...Constants.Fonts.Regular,
    fontSize: Constants.BaseStyle.scale(14),
    paddingBottom: 15,
    width: '90%',
  },
  headerText: {
    color: Constants.Colors.WHITE,
    ...Constants.Fonts.Regular,
    fontSize: Constants.BaseStyle.scale(16),
  },
  headerTextLike: {
    color: Constants.Colors.WHITE,
    ...Constants.Fonts.RegularBold,
    fontSize: Constants.BaseStyle.scale(16),
    width: '90%',
  },
  headerViewLike: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
  },
  headerViewPB: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  icon: {
    height: 40,
    width: 40,
  },
  inputStyle: {
    borderRadius: 10,
    height: height * 0.08,
    margin: 10,
    width: '95%',
  },
  liveView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderColor: Constants.Colors.BORDER_GREY,
    borderRadius: 10,
    borderWidth: 1,
    height: height * 0.25,
    width: width * 0.9,
  },
  overlappingStyle: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 16,
  },
  profileIcon: {
    alignSelf: 'center',
    borderRadius: 20,
    height: height * 0.3,
    marginVertical: 30,
    width: width * 0.9,
  },
  subHeaderTextLike: {
    color: Constants.Colors.GREY_BORDER,
    ...Constants.Fonts.Regular,
    fontSize: Constants.BaseStyle.scale(16),
  },
  textView: {
    borderRadius: 10,
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
  },
  videoIcon: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 27,
    justifyContent: 'center',
    width: 48,
  },
});

export default StyleSheet.create(styles);
