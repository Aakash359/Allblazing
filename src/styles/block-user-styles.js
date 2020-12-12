import { StyleSheet } from 'react-native';
import Constants from '../constants';

export default StyleSheet.create({
  container: {
    marginBottom: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(40),
  },
  saveBtn: { marginTop: Constants.BaseStyle.scale(250) },
  saveBtnColor: { backgroundColor: Constants.Colors.SECONDARY_COLOR },
  saveBtnWithTextInput: { marginTop: Constants.BaseStyle.scale(30) },
  subtitle: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginHorizontal: Constants.BaseStyle.scale(30),
    marginVertical: Constants.BaseStyle.scale(5),
    textAlign: 'center',
  },
  textAreaWrapper: { marginTop: Constants.BaseStyle.scale(20) },
  title: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginLeft: Constants.BaseStyle.scale(5),
    marginVertical: Constants.BaseStyle.scale(0),
  },
});
