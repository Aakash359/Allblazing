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
  label: 'blockReasons.messages',
  value: 'Inappropriate messages',
}, {
  label: 'blockReasons.videos',
  value: 'Inappropriate photos/videos',
}, {
  label: 'blockReasons.spam',
  value: 'Feels like spam',
}, {
  label: 'blockReasons.other',
  value: 'Other',
}];

export const wearableOptions = [{
  label: 'wearableOptions.Pace',
  value: 'Avg. Pace',
}, {
  label: 'wearableOptions.Distance',
  value: 'Distance',
}, {
  label: 'wearableOptions.DistanceToGo',
  value: 'Distance To Go',
}, {
  label: 'wearableOptions.CurrentPace',
  value: 'Current Pace',
}, {
  label: 'wearableOptions.HillGradient',
  value: 'Hill Gradient',
}, {
  label: 'wearableOptions.HeartRate',
  value: 'Heart Rate',
}, {
  label: 'wearableOptions.AvgHeartRate',
  value: 'Avg. Heart Rate',
}, {
  label: 'wearableOptions.HeartRateZone',
  value: 'Heart Rate Zone',
}, {
  label: 'wearableOptions.Watts',
  value: 'Watts',
}];

export default levels;
