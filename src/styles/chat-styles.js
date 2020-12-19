import { StyleSheet, Dimensions } from 'react-native';
import Constants from '../constants';

const {
  height, width,
} = Dimensions.get('window');

export default StyleSheet.create({
  acceptRejectBtn: {
    marginRight: Constants.BaseStyle.scale(10), maxWidth: '26%',
  },
  borderRadius: { borderRadius: 20 },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(3),
    flex: 1,
    height: Constants.BaseStyle.scale(35),
    justifyContent: 'center',
    width: '80%',
  },

  buttonText: {
    ...Constants.Fonts.RegularMedium,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chatTimeText: {
    bottom: Constants.BaseStyle.scale(-20), left: Constants.BaseStyle.scale(10), position: 'absolute',
  },
  chatTimeText2: {
    bottom: Constants.BaseStyle.scale(-20), position: 'absolute', right: Constants.BaseStyle.scale(20),
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discInput: {

    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    color: Constants.Colors.TEXT_COLOR_WHITE,
    flexDirection: 'row',
    paddingLeft: Constants.BaseStyle.scale(10),
    paddingTop: Constants.BaseStyle.scale(10),

    textAlignVertical: 'top',
    width: '90%',
  },
  discInputContainer: {
    alignSelf: 'center',

    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    flexDirection: 'row',
    height: '80%',
    marginTop: Constants.BaseStyle.scale(40),
    width: '90%',

  },
  discText: {
    marginHorizontal: Constants.BaseStyle.scale(8),
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },

  groupDiscContainer: {

    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(10),

    height: Constants.BaseStyle.scale(200),

    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(20),
  },
  groupDiscHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR2,
    fontSize: Constants.BaseStyle.scale(15),
    padding: Constants.BaseStyle.scale(5),

  },

  groupDiscInnerContainer: {

    borderRadius: Constants.BaseStyle.scale(5),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(60),
    justifyContent: 'space-between',
    paddingTop: Constants.BaseStyle.scale(10),

  },
  groupMemberHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(15),
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(10),
  },
  groupNameContainer: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(10),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(60),
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(5),
  },

  groupNameHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(15),
    marginHorizontal: Constants.BaseStyle.scale(12),
  },

  headerViewEnd: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  heading: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
  },
  icon: {
    height: 40,
    width: 40,

  },
  iconGroupName: {
    height: 40,

    marginHorizontal: Constants.BaseStyle.scale(12),
    width: 40,

  },

  iconView: {
    alignSelf: 'center',
    marginTop: '25%',
  },
  levelStyle: {
    alignSelf: 'flex-end',
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    borderRadius: 4,
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  levelText: {
    borderRadius: 10,
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
    fontSize: Constants.BaseStyle.scale(12),
  },
  lockedIcon: {
    alignSelf: 'center',
    height: 80,
    width: 80,
  },
  mainView: {
    backgroundColor: Constants.Colors.CARD_GREY,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: '20%',
  },
  optionalSection1: {
    alignSelf: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
  },

  optionalSectionView: {
    borderRadius: Constants.BaseStyle.scale(5),
    marginTop: Constants.BaseStyle.scale(20),
    paddingHorizontal: Constants.BaseStyle.scale(20),
    paddingVertical: Constants.BaseStyle.scale(10),
  },

  overlappingStyle: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Constants.BaseStyle.scale(10),
  },
  profileIcon: {
    alignSelf: 'center',
    borderRadius: 20,
    height: height * 0.25,
    marginVertical: 30,
    width: width * 0.9,
  },
  sectionMainView: {
    borderBottomWidth: 0,
    borderColor: Constants.Colors.WHITE,
    borderTopWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  subHeading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(12),
    // alignSelf: 'center',
  },

});
