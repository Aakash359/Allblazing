import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  background: {
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  button: {
    bottom: (Constants.BaseStyle.DEVICE_HEIGHT * 12) / 100,
    position: 'absolute',
    width: '100%',
  },
  camera: {
    height: 25,
    marginLeft: Constants.BaseStyle.scale(15),
    width: 25,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  deleteBtn: {
    backgroundColor: '#DADADC',
    width: '48%',
  },
  deleteBtnText: { color: '#25283D' },
  finishBtn: {
    backgroundColor: Constants.Colors.TEXT_COLOR,
    marginTop: Constants.BaseStyle.scale(0),
  },
  flash: {
    height: 35,
    marginBottom: -Constants.BaseStyle.scale(4),
    width: 35,
  },
  header: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.BLUE,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    marginRight: -Constants.BaseStyle.scale(5),
    width: 60,
  },
  headerIcons: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: Constants.BaseStyle.scale(0),
  },
  headerText: {
    ...Constants.Fonts.SmallBold,
    color: Constants.Colors.WHITE,
  },
  healthData: {
    height: Constants.BaseStyle.scale(200),
    marginHorizontal: Constants.BaseStyle.scale(10),
    width: '94%',
  },
  homeBtn: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    width: '48%',
  },
  input: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR,
    height: Constants.BaseStyle.scale(40),
    marginLeft: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(5),
    width: '100%',
  },
  logo: {
    height: 25,
    width: 25,
  },
  race: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: 35,
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(10),
    padding: Constants.BaseStyle.scale(10),
    width: '31%',
  },
  raceActive: { backgroundColor: Constants.Colors.TEXT_COLOR2 },
  raceActiveText: { color: Constants.Colors.TEXT_COLOR_WHITE },
  raceText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.TEXT_COLOR2,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(10),
  },
  subHeader: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    marginHorizontal: Constants.BaseStyle.scale(20),
  },
  switch: {
    height: 45,
    width: 55,
  },
  switchContainer: {
    marginLeft: 0,
    marginRight: Constants.BaseStyle.scale(20),
  },
  switchContainerOn: { marginRight: 0 },
  wearable: { height: 400 },
  wearableInput: { height: 600 },
  wrapper: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    bottom: 0,
    height: 250,
    left: 0,
    position: 'absolute',
    right: 0,
  },
};

export default StyleSheet.create(styles);
