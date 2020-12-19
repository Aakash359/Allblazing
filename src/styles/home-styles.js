
import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({

  ChatBody: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderTopLeftRadius: Constants.BaseStyle.scale(20),
    borderTopRightRadius: Constants.BaseStyle.scale(20),
    bottom: 0,
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(80),
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },

  ChatInput: {
    alignSelf: 'center',
    color: Constants.Colors.TEXT_COLOR,
    height: Constants.BaseStyle.scale(40),
    marginLeft: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(5),
    width: '90%',

  },
  ChatOneToOneContainer: {

    alignItems: 'flex-start',
    backgroundColor: Constants.Colors.TEXT_COLOR2,

    borderBottomRightRadius: Constants.BaseStyle.scale(10),
    borderTopLeftRadius: Constants.BaseStyle.scale(10),
    borderTopRightRadius: Constants.BaseStyle.scale(10),

    justifyContent: 'center',

    marginVertical: Constants.BaseStyle.scale(5),
    padding: Constants.BaseStyle.scale(14),
  },
  ChatOneToOneContainer2: {

    alignItems: 'flex-end',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderBottomLeftRadius: Constants.BaseStyle.scale(10),
    borderTopLeftRadius: Constants.BaseStyle.scale(10),
    borderTopRightRadius: Constants.BaseStyle.scale(10),
    justifyContent: 'center',
    marginVertical: Constants.BaseStyle.scale(5),
    padding: Constants.BaseStyle.scale(14),
  },
  ChatOneToOneContainerOuter: {
    alignSelf: 'flex-start', flexDirection: 'row', margin: Constants.BaseStyle.scale(14),
  },
  ChatOneToOneContainerOuter2: {
    alignSelf: 'flex-end', flexDirection: 'row', margin: Constants.BaseStyle.scale(10),
  },
  ChatOneToOneHeader: {
    flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 2,
  },
  ChatTrinangleLeft: {
    alignSelf: 'flex-end',
    backgroundColor: Constants.Colors.TRANSPARENT,
    borderRightColor: Constants.Colors.TRANSPARENT,
    borderRightWidth: Constants.BaseStyle.scale(10),
    borderStyle: 'solid',
    borderTopColor: Constants.Colors.TEXT_COLOR2,

    borderTopWidth: Constants.BaseStyle.scale(15),
    height: 0,

    marginBottom: Constants.BaseStyle.scale(5),

    transform: [
      { rotate: '180deg' },
    ],
    width: 0,
  },
  ChatTrinangleRight: {
    alignSelf: 'flex-end',
    backgroundColor: Constants.Colors.TRANSPARENT,
    borderRightColor: Constants.Colors.TRANSPARENT,
    borderRightWidth: Constants.BaseStyle.scale(15),
    borderStyle: 'solid',
    borderTopColor: Constants.Colors.SECONDARY_COLOR,
    borderTopWidth: Constants.BaseStyle.scale(15),

    height: 0,

    marginBottom: Constants.BaseStyle.scale(5),

    transform: [
      { rotate: '270deg' },
    ],
    width: 0,
  },
  chatHeader: {

    alignItems: 'center', borderBottomColor: Constants.Colors.TEXT_COLOR_WHITE, borderBottomWidth: Constants.BaseStyle.scale(3), flex: 1,
  },
  chatHeader2: {

    alignItems: 'center', borderBottomColor: Constants.Colors.TEXT_COLOR_WHITE, borderBottomWidth: Constants.BaseStyle.scale(3), flex: 1,
  },

  chatHeaderContainer: {
    flexDirection: 'row', marginTop: Constants.BaseStyle.scale(20),
  },

  chatHeaderContainer2: {
    flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: Constants.BaseStyle.scale(10),
  },

  chatText: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    marginBottom: Constants.BaseStyle.scale(10),
    paddingHorizontal: Constants.BaseStyle.scale(10),

  },

  chatText2: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.WHITE,
    marginBottom: Constants.BaseStyle.scale(10),
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
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

  dateView: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.LIGHT_BLUE,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    height: 48,
    justifyContent: 'center',
    marginRight: Constants.BaseStyle.scale(10),
    width: 60,
  },
  description: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.WHITE,
    marginTop: Constants.BaseStyle.scale(10),
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  header: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  heading: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  icon: {
    height: 20, width: 20,
  },
  iconText: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.WHITE,
    paddingHorizontal: Constants.BaseStyle.scale(5),
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.GREY_CIRCLE,
    borderRadius: 12.5,
    height: 25,
    justifyContent: 'center',
    width: 25,
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Constants.BaseStyle.scale(15),
  },
  imageWrapper: {
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  item: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: 8,
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(10),
    paddingVertical: Constants.BaseStyle.scale(10),
  },
  location: {
    ...Constants.Fonts.Small,
    color: Constants.Colors.GRAY,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  more: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.BLUE,
    borderRadius: Constants.BaseStyle.scale(30) / 2,
    height: Constants.BaseStyle.scale(30),
    justifyContent: 'center',
    width: Constants.BaseStyle.scale(30),
  },
  moreText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
  },
  rightHeading: {
    ...Constants.Fonts.SmallBold,
    color: Constants.Colors.LIGHT_BLUE,
    marginRight: Constants.BaseStyle.scale(10),
  },
  row: {
    flexDirection: 'row',
    marginRight: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(10),
  },
  title: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.BLACK,
    paddingHorizontal: Constants.BaseStyle.scale(10),
  },
  user: {
    borderRadius: Constants.BaseStyle.scale(30) / 2, height: Constants.BaseStyle.scale(30), width: Constants.BaseStyle.scale(30),
  },
  userSpace: { marginLeft: -10 },
  users: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: Constants.BaseStyle.scale(15),
  },
  usersRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: { marginTop: Constants.BaseStyle.scale(10) },
});

export default StyleSheet.create(styles);
