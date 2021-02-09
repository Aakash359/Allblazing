import {StyleSheet} from 'react-native';
import Constants from '../constants';

// const {
//   height, width,
// } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Constants.BaseStyle.scale(10),
    marginVertical: Constants.BaseStyle.scale(10),
  },
  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  optionalSection1: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },
  optionalSectionView: {
    borderRadius: 20,
    marginRight: 10,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    // alignItems:'center',
    // width: '50%'
  },
  rightHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.LIGHT_BLUE,
    marginRight: Constants.BaseStyle.scale(10),
    // marginRight: 10,
  },
  searchIcon: {
    height: 18,
    marginRight: 10,
    width: 18,
  },
  searchText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.GREY_BORDER,
    fontSize: Constants.BaseStyle.scale(16),
  },
  searchView: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 40,
    padding: 4,
  },
  sectionMainView: {
    borderColor: Constants.Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});

export default StyleSheet.create(styles);
