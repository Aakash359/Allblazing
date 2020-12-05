import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
    paddingHorizontal: Constants.BaseStyle.scale(20),
  },
  text: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    marginTop: Constants.BaseStyle.scale(20),
  },
};

export default StyleSheet.create(styles);
