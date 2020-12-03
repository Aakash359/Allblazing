import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = {
  popover: {
    backgroundColor: Constants.Colors.TRANSPARENT,
    borderRadius: (Constants.BaseStyle.DEVICE_WIDTH / 100) * 2,
    bottom: Constants.BaseStyle.scale(20),
    position: 'absolute',
  },
  popoverPriceWrapper: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flex: 5,
  },
  popoverWrapper: { flex: 5 },
};

export default StyleSheet.create(styles);
