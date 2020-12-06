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
  invitedUserContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    marginTop: Constants.BaseStyle.scale(5),
  },
  invitedUserImage: {
    height: 40, width: Constants.BaseStyle.scale(40),
  },
  invitedUserWrapper: { height: 40 },
  location: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.GRAY,
    flexWrap: 'wrap',
    marginTop: Constants.BaseStyle.scale(5),
    paddingLeft: Constants.BaseStyle.scale(20),
  },
  padding: {
    paddingLeft: Constants.BaseStyle.scale(10),
    textAlign: 'left',
  },
  pending: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.LIGHT_ORANGE,
  },
  pendingBtn: {
    alignItems: 'center',
    borderColor: Constants.Colors.LIGHT_ORANGE,
    borderWidth: 1,
    height: Constants.BaseStyle.scale(28),
    justifyContent: 'center',
    padding: Constants.BaseStyle.scale(5),
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
    textAlign: 'left',
  },
  username: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    paddingLeft: Constants.BaseStyle.scale(20),
    textAlign: 'left',
  },
});
