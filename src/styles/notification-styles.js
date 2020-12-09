import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  description: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    marginTop: Constants.BaseStyle.scale(10),
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  header: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(18),
    paddingHorizontal: Constants.BaseStyle.scale(12),
  },
  icon: {
    height: 25, width: 25,
  },
  iconText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.PRIVCYTEXT,
    paddingHorizontal: Constants.BaseStyle.scale(5),
  },
  item: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 8,
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(20),
    paddingVertical: Constants.BaseStyle.scale(10),
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(10),
  },
  usersRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StyleSheet.create(styles);
