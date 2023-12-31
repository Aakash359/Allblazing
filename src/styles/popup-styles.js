import { Platform, StyleSheet } from 'react-native';

import Constants from '../constants';

const styles = {
  agePicker: { width: 300 },
  attachmentsStyle: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.BLACK,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    textAlign: 'left',
  },
  blockBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(45),
    marginVertical: Constants.BaseStyle.MARGIN / 2,
    paddingHorizontal: Constants.BaseStyle.MARGIN,
  },
  blockIcon: {
    height: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
  bottomContainer: {
    backgroundColor: Constants.Colors.TRANSLUCENT,
    flex: 1,
    justifyContent: 'center',
    padding: Constants.BaseStyle.MARGIN,
  },
  bottomWrapper: {
    backgroundColor: Constants.Colors.WHITE,
    bottom: 0,
    height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 25,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  btnSubtitle: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.PRIVCYTEXT,
    marginTop: Constants.BaseStyle.scale(5),
    paddingHorizontal: Constants.BaseStyle.MARGIN,
  },
  btnTitle: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.MARGIN,
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 80,
  },
  camContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginVertical: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
  },
  camera: {
    alignItems: 'center',
    borderColor: Constants.Colors.LIGHTGRAY,
    borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 9,
    borderWidth: 2,
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 18,
    justifyContent: 'center',
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 18,
  },
  CancelButtonStyle: {
    backgroundColor: Constants.Colors.WHITE,
    borderColor: Constants.Colors.PRIMARY,
    borderWidth: 1,
  },
  CancelTextStyle: { color: Constants.Colors.PRIMARY },
  close: {
    alignItems: 'center',
    alignSelf: 'center',
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6,
    justifyContent: 'center',
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 6,
  },
  closeButton: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.PRIMARY,
    borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 8,
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 8,
    justifyContent: 'center',
    position: 'absolute',
    right: (Constants.BaseStyle.DEVICE_WIDTH / 100) * -2,
    top: (Constants.BaseStyle.DEVICE_WIDTH / 100) * -2,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 8,
  },
  container: {
    backgroundColor: Constants.Colors.TRANSLUCENT,
    flex: 1,
    justifyContent: 'center',
    padding: Constants.BaseStyle.MARGIN,
  },
  description: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
  },
  divider: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    height: 1,
  },
  header: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginVertical: Constants.BaseStyle.scale(15),
    textAlign: 'center',
  },
  hourLabel: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    marginLeft: '2%',
    textAlign: 'left',
    width: '20%',
  },
  inviteCount: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.BLACK,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 2,
    textAlign: 'center',
  },
  inviteDescription: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.GRAY,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 65,
  },
  inviteHeading: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.BLACK,
    marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    textAlign: 'left',
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 65,
  },
  logoStyle: {
    height: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 14,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 14,
  },
  logoutButton: { marginHorizontal: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2 },
  logoutContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 3,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 80,
  },
  minuteLabel: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    marginLeft: '24%',
    textAlign: 'left',
    width: '18%',
  },
  monthLabel: { textAlign: 'right' },
  monthPicker: {
    height: 200,
    width: 100,
  },
  monthPickerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  monthPickerItem: {
    color: Constants.Colors.WHITE,
    fontSize: 26,
  },
  moreOptionsContainer: { alignItems: 'center' },
  moreOptionsWrapper: {
    borderRadius: Constants.BaseStyle.scale(10),
    paddingHorizontal: 0,
    paddingVertical: Constants.BaseStyle.MARGIN,
    width: '90%',
  },

  picker: {
    height: 180,
    width: Constants.BaseStyle.scale(50),
  },
  pickerItem: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: 20,
    ...Platform.select({
      android: {
        fontSize: 30,
        height: 60,
      },
    }),
  },
  pickersContainer: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Constants.BaseStyle.scale(2),
    padding: Constants.BaseStyle.scale(10),
  },
  premissionCamera: {
    alignSelf: 'center',
    height: Constants.BaseStyle.scale(60),
    width: Constants.BaseStyle.scale(60),

  },
  reportIcon: {
    height: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
  },
  searchButton: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 5,
    width: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 60,
  },
  secondLabel: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    marginLeft: '26%',
    textAlign: 'left',
    width: '48%',
  },
  subHeader: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginVertical: Constants.BaseStyle.scale(5),
    textAlign: 'center',
  },
  textAlignLeft: { textAlign: 'left' },
  textStyle: {
    ...Constants.Fonts.Large,
    color: Constants.Colors.WHITE,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
    textAlign: 'center',
  },
  titleTextStyle: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.WHITE,
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 1,
    textAlign: 'center',
  },
  webViewStyle: { height: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 30 },
  wrapper: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    padding: Constants.BaseStyle.MARGIN,
  },
  wrapperPermission: {
    backgroundColor: Constants.Colors.CARD_LIGHTGREY,
    borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 3,
    padding: Constants.BaseStyle.MARGIN2,
  },
  yearLabel: {
    marginLeft: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 15,
    textAlign: 'center',
  },
};

export default StyleSheet.create(styles);
