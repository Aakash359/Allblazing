import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  flatList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  listView: {
    borderRadius: 12,
    height: 56,
    marginRight: 10,
    width: 56,
  },
  locationText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(12),
  },
  nameText: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
  },
  searchIcon: {
    height: 18,
    marginRight: 10,
    width: 18,
  },
  searchView: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: 12,
    flexDirection: 'row',
    margin: 10,
    marginTop: 40,
    padding: 15,
  },
  sectionView: {
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: 10,
  },

});

export default StyleSheet.create(styles);
