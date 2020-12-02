import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  centerItems: {
    alignItems: 'center',
    flex: 0.9,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  crossImage: {
    alignSelf: 'flex-end',
    height: Constants.BaseStyle.scale(18),
    margin: Constants.BaseStyle.scale(18),
    width: Constants.BaseStyle.scale(18),
  },
  headerWrapper: {
    alignItems: 'center', flex: 0.3, justifyContent: 'space-evenly', marginTop: Constants.BaseStyle.scale(20),
  },
  logo: {
    alignSelf: 'center',
    marginBottom: Constants.BaseStyle.scale(40),
    width: '80%',
  },
});

export default styles;
