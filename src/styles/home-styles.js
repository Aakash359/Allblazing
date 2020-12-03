import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Constants.BaseStyle.scale(10),
    marginVertical: Constants.BaseStyle.scale(10),
  },
  dateView: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    height: 48,
    justifyContent: 'center',
    marginRight: Constants.BaseStyle.scale(10),
    width: 60,
  },
  description: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.WHITE,
    marginTop: Constants.BaseStyle.scale(10),
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  header: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  icon: {
    height: 25, width: 25,
  },
  iconText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(5),
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Constants.BaseStyle.scale(15),
  },
  item: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 8,
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(20),
    paddingVertical: Constants.BaseStyle.scale(10),
  },
  location: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.GRAY,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  more: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.BLUE,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  moreText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
  },
  rightHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.LIGHT_BLUE,
    marginRight: Constants.BaseStyle.scale(10),
  },
  row: {
    flexDirection: 'row',
    marginRight: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(10),
  },
  title: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.BLACK,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  user: {
    borderRadius: 15, height: 30, width: 30,
  },
  userSpace: { marginLeft: -10 },
  users: {
    flexDirection: 'row',
    paddingBottom: Constants.BaseStyle.scale(15),
  },
  usersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: { marginTop: Constants.BaseStyle.scale(10) },
});

export default StyleSheet.create(styles);
