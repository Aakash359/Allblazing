import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  acceptRejectBtn: { maxWidth: '45%' },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(6),
    flex: 1,
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    width: '90%',
  },
  buttonText: {
    ...Constants.Fonts.RegularMedium,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  calendar: {
    height: 25,
    width: 25,
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    paddingHorizontal: Constants.BaseStyle.scale(20),
  },
  divider: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    height: 1,
    marginVertical: Constants.BaseStyle.scale(20),
  },
  eventDescription: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    marginTop: Constants.BaseStyle.scale(15),
  },
  eventTitle: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.WHITE,
    marginTop: Constants.BaseStyle.scale(15),
  },
  eventType: {
    ...Constants.Fonts.Large,
    color: Constants.Colors.WHITE,
  },
  header: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.PRIVCYTEXT,
  },
  headerImage: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderRadius: Constants.BaseStyle.scale(5),
    height: Constants.BaseStyle.scale(220),
    marginVertical: Constants.BaseStyle.scale(20),
    width: '100%',
  },
  live: {
    height: 25,
    width: 25,
  },
  margin: { marginTop: Constants.BaseStyle.scale(10) },
  marginLeft: { marginLeft: Constants.BaseStyle.scale(8) },
  memberImages: { paddingBottom: 0 },
  members: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  subtitle: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.LIGHT_GRAY,
    fontSize: 12,
  },
  userContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(70),
  },
  userInformation: { padding: Constants.BaseStyle.scale(20) },
  username: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.WHITE,
  },
};

export default StyleSheet.create(styles);
