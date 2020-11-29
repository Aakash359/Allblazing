import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.BUTTON_COLOR,
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
};

export default StyleSheet.create(styles);
