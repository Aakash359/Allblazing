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
  groupName: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(16),
    width:'100%'
  },
  groupType: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    margin: 20,
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
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    height: height * 0.3,
    justifyContent: 'center',
    margin: 10,
    marginTop:20,
    width: width * 0.9,
  },

  innerContainer: { marginHorizontal: 6 },
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
    width: width * 0.9,
  },
  optionalSectionView: {
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 8,
    marginHorizontal: width * 0.01,
    marginVertical: width * 0.01,
    width: width * 0.3,
  },
  optionalText: {
    alignSelf: 'center',
    color: Constants.Colors.WHITE,
    padding: 16,
  },
  searchView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: 12,
    flexDirection: 'row',
    margin: 10,
    marginTop: 10,
    padding: 15,
  },
  textAreaWrapper: {
    borderBottomLeftRadius: Constants.BaseStyle.scale(6),
    borderBottomRightRadius: Constants.BaseStyle.scale(6),
    borderRadius: null,
    color:'white',
    marginTop: 0,
  },

});

export default StyleSheet.create(styles);
