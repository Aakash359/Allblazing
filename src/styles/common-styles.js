import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  centerItems: {
    alignItems: 'center',
    flex: 0.9,
    marginTop: Constants.BaseStyle.scale(35),
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  crossImage: {
    alignSelf: 'flex-end',
    height: Constants.BaseStyle.scale(18),
    margin: Constants.BaseStyle.scale(18),
    width: Constants.BaseStyle.scale(18),
  },
  crossImage2: {
    alignSelf: 'center',
    height: Constants.BaseStyle.scale(60),
    width: Constants.BaseStyle.scale(60),
  },
  divider: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    height: 1,
    marginVertical: Constants.BaseStyle.scale(10),
    width: '100%',
  },
  headerWrapper: {
    alignItems: 'center', flex: 0.25, marginTop: Constants.BaseStyle.scale(20),
  },
  logo: {
    alignSelf: 'center',
    marginBottom: Constants.BaseStyle.scale(40),
    width: '80%',
  },
  textArea: {
    ...Constants.Fonts.Regular,
    alignSelf: 'center',
    color: Constants.Colors.TEXT_COLOR,
    height: Constants.BaseStyle.scale(200),
    margin: Constants.BaseStyle.scale(15),
    padding: Constants.BaseStyle.scale(15),
    textAlignVertical: 'top',
    width: '100%',
  },
  textAreaWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: Constants.BaseStyle.scale(200),
    justifyContent: 'flex-start',
    width: '90%',
  },
});

export default styles;
