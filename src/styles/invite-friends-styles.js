import { StyleSheet } from 'react-native';
import Constants from '../constants';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(6),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(20),
    width: '90%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 5,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(20),
  },
  icon: {
    height: Constants.BaseStyle.scale(20),
    marginHorizontal: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
  location: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.GRAY,
    marginTop: Constants.BaseStyle.scale(5),
    paddingLeft: Constants.BaseStyle.scale(20),
  },
  userImage: {
    borderRadius: 10,
    height: '100%',
    width: Constants.BaseStyle.scale(70),
  },
  userWrapper: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
  },
  username: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    paddingLeft: Constants.BaseStyle.scale(20),
  },
});
