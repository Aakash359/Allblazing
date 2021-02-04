import {StyleSheet, Dimensions} from 'react-native';
import Constants from '../constants';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  bottomView: {marginBottom: height * 0.2},
  icons: {
    height: 32,
    width: 32,
  },
  logoIcon: {
    height: height * 0.2,
    width: width * 0.8,
  },
  modal: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderTopLeftRadius: Constants.BaseStyle.scale(16),
    borderTopRightRadius: Constants.BaseStyle.scale(16),
    height: height * 0.22,
    paddingTop: Constants.BaseStyle.scale(20),
  },
  modalText: {
    color: Constants.Colors.WHITE,
    marginLeft: 10,
    textAlign: 'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  runnerImage: {
    alignSelf: 'center',
    height: height * 0.16,
    marginTop: 50,
    width: width * 0.6,
  },
  tagView: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.PRIMARY,
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    width: width * 0.4,
  },
});
