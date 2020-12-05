import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    borderRadius: 55 / 2,
    height: 55,
    justifyContent: 'center',
    width: 55,
  },
  coaching: { backgroundColor: Constants.Colors.LIGHT_YELLOW },
  container: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cover: {
    height: 70,
    overflow: 'visible',
    width: 70,
  },
  customMarkerContainer: {
    flexDirection: 'row',
    height: 70,
    margin: 5,
    width: 220,
  },
  icon: {
    height: 20,
    width: 20,
  },
  image: {
    backgroundColor: Constants.Colors.LIGHT_YELLOW,
    borderColor: Constants.Colors.LIGHT_YELLOW,
    borderRadius: 55 / 2,
    borderWidth: 3,
    height: 55,
    width: 55,
  },
  km: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.LIGHT_GRAY,
    fontSize: 12,
    marginLeft: 2,
  },
  live: {
    height: 25,
    position: 'absolute',
    right: -5,
    top: -5,
    width: 25,
  },
  location: {
    height: 70,
    width: 70,
  },
  lock: {
    height: 15,
    marginLeft: 10,
    width: 15,
  },
  map: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  racing: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  text: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.LIGHT_BLACK,
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  training: { backgroundColor: Constants.Colors.LIGHT_GREEN },
  wrapper: {
    backgroundColor: Constants.Colors.WHITE,
    flexDirection: 'row',
    height: 40,
    left: 50,
    position: 'absolute',
    top: 15,
    width: 160,
  },
});

export default styles;
