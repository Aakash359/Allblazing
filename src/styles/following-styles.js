import { Platform } from 'react-native';
import {StyleSheet} from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  flatList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    marginHorizontal: 10,
    width: 18,
  },
  searchView: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 12,
    
    flexDirection: 'row',
    marginLeft: 4,
    alignItems: 'center',
    margin: 10,
  },
  sectionView: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 12,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: 10,
    padding: Platform.OS === 'ios' ? 15 : 10 
    // width: '50%'
  },
});

export default StyleSheet.create(styles);
