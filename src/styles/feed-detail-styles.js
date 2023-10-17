
import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  arrowLeft: {
    height: 20,
    marginRight: 26,
    width: 10,
  },
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  feedImg: {
    height: height * 0.9,
    marginTop: 10,
    width,
  },
  flatList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  heartIcon: {
    height: 16,
    marginRight: 6,
    width: 18,
  },
  heartView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerView: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  listView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 16,
  },
  userImage: {
    borderRadius: 23,
    height: 46,
    marginRight: 10,
    width: 46,
  },
});

export default StyleSheet.create(styles);
