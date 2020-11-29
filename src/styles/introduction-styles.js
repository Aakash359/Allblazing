import { StyleSheet } from 'react-native';
import Constants from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.PRIMARY,
    flex: 1,
  },
  crossImage: {
    alignSelf: 'flex-end',
    height: Constants.BaseStyle.scale(20),
    margin: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
});

export default styles;
