import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    borderRadius: 60 / 2,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  image: {
    backgroundColor: Constants.Colors.LIGHT_YELLOW,
    borderColor: Constants.Colors.LIGHT_YELLOW,
    borderRadius: 60 / 2,
    borderWidth: 3,
    height: 60,
    width: 60,
  },
  map: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default styles;
