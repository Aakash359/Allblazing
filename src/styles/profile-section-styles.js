import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { backgroundColor: Constants.Colors.PRIMARY },
  containerLikes: { backgroundColor: Constants.Colors.PRIMARY },
  containerPB: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    margin: 20,
  },
  goalText: {
    borderRadius: 10,
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
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
    fontSize: Constants.BaseStyle.scale(18),
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
    marginTop: height * 0.125,
    width: 48,
  },

});

export default StyleSheet.create(styles);
