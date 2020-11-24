import { Dimensions } from 'react-native';

// Grab the window object from that native screen size.
const { height, width } = Dimensions.get('window');

const screenHeight = height;
const screenWidth = width;
const baselineHeight = screenHeight < 750 ? 680 : 800;

export const scale = value => Math.round((screenHeight / baselineHeight) * value);
export const cv = (val) =>  scale(val);
export const wp = (percentage) => {
  const value = (percentage * screenWidth) / 100;

  return Math.round(value);
};

export default cv;
