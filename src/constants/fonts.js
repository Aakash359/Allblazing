import { normalize } from '../utilities/responsive-fonts';

const Fonts = {
  ExtraLarge: {
    fontFamily: 'System',
    fontSize: normalize(18),
    // fontWeight: 'normal',
  },
  ExtraLargeBold: {
    fontFamily: 'System',
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  ExtraLargeMedium: {
    fontFamily: 'System',
    fontSize: normalize(16),
    // fontWeight: '500',
  },
  Large: {
    fontFamily: 'System',
    fontSize: normalize(14),
    // fontWeight: 'normal',
  },
  LargeBold: {
    fontFamily: 'System',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  LargeMedium: {
    fontFamily: 'System',
    fontSize: normalize(14),
    // fontWeight: '500',
  },
  Regular: {
    fontFamily: 'System',
    fontSize: normalize(12),
    // fontWeight: 'normal',
  },
  RegularBold: {
    fontFamily: 'System',
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  RegularMedium: {
    fontFamily: 'System',
    fontSize: normalize(12),
    // fontWeight: '500',
  },
  Small: {
    fontFamily: 'System',
    fontSize: normalize(10),
    // fontWeight: 'normal',
  },
  SmallBold: {
    fontFamily: 'System',
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  SmallMedium: {
    fontFamily: 'System',
    fontSize: normalize(10),
    // fontWeight: '500',
  },
};

module.exports = Fonts;
