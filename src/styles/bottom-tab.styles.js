import { Platform, StyleSheet } from 'react-native';

import Constants from '../constants';

export default StyleSheet.create({
  active: { color: Constants.Colors.WHITE },
  add: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.WHITE,
    borderRadius: 23,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  addContainer: {
    flex: 1,
    padding: 10,
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  image: {
    height: 25,
    width: 25,
  },
  label: {
    ...Constants.Fonts.Regular,
    marginVertical: 5,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  tabText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.TEXT_COLOR2,
    ...Platform.select({ android: { fontSize: 13 } }),
    paddingTop: 3,
  },
  tabs: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    // paddingHorizontal: 5,
    width: '100%',
  },
});
