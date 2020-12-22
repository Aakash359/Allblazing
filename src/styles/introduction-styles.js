import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  buttons: {
    flex: 0.1,
    paddingBottom: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.scale(20),
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  crossImage: {
    alignSelf: 'flex-end',
    height: Constants.BaseStyle.scale(20),
    margin: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
  wrapper: { flex: 0.9 },
});

export default styles;
