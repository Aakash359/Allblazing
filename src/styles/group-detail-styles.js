import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  nextText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    textAlign: 'center',
  },
  nextView: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    // marginBottom: height * 0.05,
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    width: width * 0.9,
  },

});
