import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(6),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginHorizontal: Constants.BaseStyle.scale(20),
    width: '40%',
  },
  buttonsWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Constants.BaseStyle.scale(20),
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(100),
  },
  connectRow: { marginHorizontal: Constants.BaseStyle.scale(20) },
  connectRowText: { marginLeft: Constants.BaseStyle.scale(20) },
  header: {
    ...Constants.Fonts.LargeBold,
    color: Constants.Colors.GRAY,
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(20),
  },
  input: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: Constants.BaseStyle.scale(45),
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(20),
    paddingHorizontal: Constants.BaseStyle.scale(10),
    textAlign: 'left',
  },
  level: {
    alignItems: 'center',
    borderRadius: Constants.BaseStyle.scale(8),
    height: 40,
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(10),
    width: '31%',
  },
  levelColor: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
  },
  levelsContainer: { flexWrap: 'wrap' },
  race: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: 40,
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(10),
    width: '31%',
  },
  raceActive: { backgroundColor: Constants.Colors.TEXT_COLOR2 },
  raceActiveText: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  raceText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR2,
  },
  radio: {
    alignItems: 'center', flexDirection: 'row', width: '50%',
  },
  radioRow: {
    alignItems: 'center', flexDirection: 'row', width: '50%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(10),
  },
  searchInput: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR,
    flex: 1,
    fontSize: 18,
    marginBottom: 2,
    marginRight: 5,
    paddingLeft: 5,
    width: '100%',
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
  switchOn: { marginRight: Constants.BaseStyle.scale(10) },
  wrapper: { backgroundColor: Constants.Colors.PRIMARY },
});

export default styles;
