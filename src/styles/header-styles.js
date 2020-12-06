import { StyleSheet } from 'react-native';
import Constants from '../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterIcon: {
    height: 20,
    marginRight: 10,
    width: 20,
  },
  headerRightTextStyle: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    marginHorizontal: Constants.BaseStyle.scale(10),
  },
  input: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: Constants.BaseStyle.scale(45),
    marginHorizontal: Constants.BaseStyle.scale(10),
    marginVertical: Constants.BaseStyle.scale(20),
    padding: Constants.BaseStyle.scale(10),
    textAlign: 'left',
    width: '70%',
  },
  mapIcon: {
    height: 20,
    marginHorizontal: Constants.BaseStyle.scale(10),
    width: 20,
  },
  notificationIcon: {
    height: 20,
    marginHorizontal: Constants.BaseStyle.scale(10),
    width: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchIcon: {
    height: 20,
    marginHorizontal: Constants.BaseStyle.scale(10),
    width: 20,
  },
  searchInput: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR,
    flex: 1,
    fontSize: 18,
    marginBottom: 2,
    marginRight: 5,
    paddingLeft: 5,
  },
});
