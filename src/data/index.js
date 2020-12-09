import Constants from '../constants';

export const levels = [{
  color: Constants.Colors.LIGHT_BLUE,
  value: 1,
}, {
  color: Constants.Colors.LIGHT_RED,
  value: 2,
}, {
  color: Constants.Colors.LIGHT_YELLOW,
  value: 3,
}, {
  color: Constants.Colors.LIGHT_PINK,
  value: 4,
}, {
  color: Constants.Colors.DARK_YELLOW,
  value: 5,
}, {
  color: Constants.Colors.LIGHT_GREEN,
  value: 6,
}];

export const distanceList = [{
  label: '200 m',
  value: '200m',
}, {
  label: '400 m',
  value: '400m',
}, {
  label: '1 km',
  value: '1km',
}, {
  label: '1 mile',
  value: '1mile',
}, {
  label: '5 km',
  value: '5km',
}, {
  label: '10 km',
  value: '10km',
}];

export const blockReportReasons = [{
  label: 'Inappropriate messages',
  value: 'Inappropriate messages',
}, {
  label: 'Inappropriate photos/videos',
  value: 'Inappropriate photos/videos',
}, {
  label: 'Feels like spam',
  value: 'Feels like spam',
}, {
  label: 'Other',
  value: 'Other',
}];

export const wearableOptions = [{
  label: 'Avg. Pace',
  value: 'Avg. Pace',
}, {
  label: 'Distance',
  value: 'Distance',
}, {
  label: 'Distance To Go',
  value: 'Distance To Go',
}, {
  label: 'Current Pace',
  value: 'Current Pace',
}, {
  label: 'Hill Gradient',
  value: 'Hill Gradient',
}, {
  label: 'Heart Rate',
  value: 'Heart Rate',
}, {
  label: 'Avg. Heart Rate',
  value: 'Avg. Heart Rate',
}, {
  label: 'Heart Rate Zone',
  value: 'Heart Rate Zone',
}, {
  label: 'Watts',
  value: 'Watts',
}];

export default levels;
