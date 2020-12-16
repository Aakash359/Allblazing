import { StyleSheet } from 'react-native';
import Constants from '../constants';

export default StyleSheet.create({
  button: {
    alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { textAlign: 'center' },
  container: {
    marginBottom: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(40),
  },
  otherBtn: {
    borderRadius: null,
    borderTopLeftRadius: Constants.BaseStyle.scale(6),
    borderTopRightRadius: Constants.BaseStyle.scale(6),
  },
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
  saveBtnColor: { backgroundColor: Constants.Colors.SECONDARY_COLOR },
  saveBtnWithTextInput: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
  select: {
    position: 'absolute', right: Constants.BaseStyle.scale(5),
  },
  subtitle: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginHorizontal: Constants.BaseStyle.scale(30),
    marginVertical: Constants.BaseStyle.scale(5),
    textAlign: 'center',
  },
  textAreaWrapper: {
    borderBottomLeftRadius: Constants.BaseStyle.scale(6),
    borderBottomRightRadius: Constants.BaseStyle.scale(6),
    borderRadius: null,
    marginTop: 0,
  },
  title: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginLeft: Constants.BaseStyle.scale(5),
    marginVertical: Constants.BaseStyle.scale(0),
  },
});
