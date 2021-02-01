import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.PRIMARY,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginVertical: Constants.BaseStyle.scale(10),
  },
  icon: {
    height: Constants.BaseStyle.scale(20),
    marginHorizontal: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
  location: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.GRAY,
    flexWrap: 'wrap',
    marginTop: Constants.BaseStyle.scale(5),
    paddingLeft: Constants.BaseStyle.scale(20),
  },
  nextText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
    textAlign: 'center',
  },
  nextView: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: 4,
    marginBottom: height * 0.02,
    marginHorizontal: 40,
    padding: 15,
    paddingTop: height * 0.02,
    width: width * 0.8,
    flexDirection:'row',
    justifyContent:'center'
  },
  userImage: {
    borderRadius: 10,
    height: '100%',
    width: Constants.BaseStyle.scale(70),
  },
  userWrapper: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  username: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    paddingLeft: Constants.BaseStyle.scale(20),
    textAlign: 'left',
  },
});

export default StyleSheet.create(styles);
