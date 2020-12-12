import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  container: {
    alignItems: 'flex-end',
    backgroundColor: Constants.Colors.TRANSLUCENT,
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginTop: Constants.BaseStyle.scale(20),
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(30),
    marginVertical: Constants.BaseStyle.scale(20),
  },
  social: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    height: 36,
    width: 36,
  },
  socialText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginTop: Constants.BaseStyle.scale(4),
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: Constants.Colors.PRIMARY,
    height: 150,
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
};

export default StyleSheet.create(styles);
