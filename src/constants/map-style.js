const style = [
  {
    elementType: 'geometry',
    stylers: [
      { color: '#f5f5f5' },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      { visibility: 'off' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#616161' },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#f5f5f5' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'administrative.land_parcel',
    stylers: [
      { color: '#bdbdbd' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'poi',
    stylers: [
      { color: '#eeeeee' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'poi',
    stylers: [
      { color: '#757575' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'poi.park',
    stylers: [
      { color: '#e5e5e5' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'poi.park',
    stylers: [
      { color: '#9e9e9e' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'road',
    stylers: [
      { color: '#ffffff' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'road.arterial',
    stylers: [
      { color: '#757575' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'road.highway',
    stylers: [
      { color: '#dadada' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'road.highway',
    stylers: [
      { color: '#616161' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'road.local',
    stylers: [
      { color: '#9e9e9e' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'transit.line',
    stylers: [
      { color: '#e5e5e5' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'transit.station',
    stylers: [
      { color: '#eeeeee' },
    ],
  },
  {
    elementType: 'geometry',
    featureType: 'water',
    stylers: [
      { color: '#c9c9c9' },
    ],
  },
  {
    elementType: 'labels.text.fill',
    featureType: 'water',
    stylers: [
      { color: '#9e9e9e' },
    ],
  },
];

module.exports = style;
