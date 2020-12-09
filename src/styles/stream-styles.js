import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  background: {
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: Constants.BaseStyle.scale(45),
    marginVertical: Constants.BaseStyle.scale(20),
    width: '90%',
  },
  input: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR,
    height: Constants.BaseStyle.scale(40),
    marginLeft: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(5),
    width: '100%',
  },
  race: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: 35,
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(10),
    width: '31%',
  },
  raceActive: { backgroundColor: Constants.Colors.TEXT_COLOR2 },
  raceActiveText: { color: Constants.Colors.TEXT_COLOR_WHITE },
  raceText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.TEXT_COLOR2,
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
  wrapper: {
    backgroundColor: Constants.Colors.PRIMARY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    bottom: 0,
    height: 400,
    left: 0,
    position: 'absolute',
    right: 0,
  },
};

export default StyleSheet.create(styles);
