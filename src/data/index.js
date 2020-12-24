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
  label: 'distance.200m',
  value: '200m',
}, {
  label: 'distance.400m',
  value: '400m',
}, {
  label: 'distance.1km',
  value: '1km',
}, {
  label: 'distance.1mile',
  value: '1mile',
}, {
  label: 'distance.5km',
  value: '5km',
}, {
  label: 'distance.10km',
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

export const times = [{
  color: Constants.Colors.LIGHT_BLUE,
  label: '< 18 minutes',
  value: 'lessThan18Minutes',
}, {
  color: Constants.Colors.LIGHT_RED,
  label: 'recent5KTimes.between18and20',
  value: 'between18and20',
}, {
  color: Constants.Colors.LIGHT_YELLOW,
  label: 'recent5KTimes.between20and23',
  value: 'between20and23',
}, {
  color: Constants.Colors.LIGHT_PINK,
  label: 'recent5KTimes.between23and26',
  value: 'between23and26',
}, {
  color: Constants.Colors.DARK_YELLOW,
  label: 'recent5KTimes.between26and30',
  value: 'between26and30',
}, {
  color: Constants.Colors.LIGHT_GREEN,
  label: 'recent5KTimes.moreThan30',
  value: 'moreThan30',
}];

export default levels;
