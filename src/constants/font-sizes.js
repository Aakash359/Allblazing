import { normalize } from '../utilities/responsive-fonts';

const Fonts = {
  ExtraLarge: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(18),
    fontWeight: 'normal',
  },
  ExtraLargeBold: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(18),
    fontWeight: '900',
  },
  ExtraLargeMedium: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(16),
    fontWeight: '500',
  },
  Large: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(14),
    fontWeight: 'normal',
  },
  LargeBold: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(14),
    fontWeight: '900',
  },
  LargeMedium: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(14),
    fontWeight: '500',
  },
  Regular: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(12),
    fontWeight: 'normal',
  },
  RegularBold: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(12),
    fontWeight: '900',
  },
  RegularMedium: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(12),
    fontWeight: '500',
  },
  Small: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(10),
    fontWeight: 'normal',
  },
  SmallBold: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(10),
    fontWeight: '900',
  },
  SmallMedium: {
    fontFamily: 'SF Pro Rounded',
    fontSize: normalize(10),
    fontWeight: '500',
  },
};

module.exports = Fonts;
