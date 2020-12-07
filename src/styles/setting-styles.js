import { StyleSheet } from 'react-native';
import Constants from '../constants';
import { normalize } from '../utilities/responsive-fonts';

const styles = {
  arrow: {
    height: Constants.BaseStyle.scale(18),
    width: Constants.BaseStyle.scale(18),
  },
  container: {
    borderBottomColor: Constants.Colors.SECONDARY_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginRight: Constants.BaseStyle.scale(10),
    paddingVertical: Constants.BaseStyle.scale(15),
  },
  switch: {
    height: Constants.BaseStyle.scale(24),
    width: Constants.BaseStyle.scale(40),
  },
  title: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: normalize(13),
    textAlign: 'left',
  },
};

export default StyleSheet.create(styles);
