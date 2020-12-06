/* eslint-disable sort-keys */
import { StyleSheet } from 'react-native';
import Constants from '../constants';

// const {
//   height, width,
// } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  searchView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 40,
    margin: 10,
    padding: 15,
    borderRadius: 12,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  flatList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: Constants.Colors.CARD_GREY,
  },
  sectionView: {
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    // width: '50%'
  },
  listView: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 10,
  },
  nameText: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
  },
  locationText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(12),
  },

});

export default StyleSheet.create(styles);
