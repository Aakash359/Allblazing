
import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  feedImg: {
    alignSelf: 'center',
    borderRadius: 16,
    height: height * 0.3,
    marginVertical: 20,
    width: width * 0.9,
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
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  nameView: {
    alignSelf: 'center',
    flexDirection: 'column',
  },
  optionalSection1: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },
  sectionMainView: {
    borderColor: Constants.Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginTop: height * 0.05,
  },
  userImage: {
    borderRadius: 23,
    height: 46,
    marginRight: 10,
    width: 46,
  },
});

export default StyleSheet.create(styles);
