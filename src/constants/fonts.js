import { normalize } from '../utilities/responsive-fonts';

const Fonts = {
  ExtraLarge: {
    fontFamily: 'SFProRounded-Regular',
    fontSize: normalize(18),
  },
  ExtraLargeBold: {
    fontFamily: 'SFProRounded-Bold',
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  ExtraLargeMedium: {
    fontFamily: 'SFProRounded-Medium',
    fontSize: normalize(16),
  },
  Large: {
    fontFamily: 'SFProRounded-Regular',
    fontSize: normalize(14),
  },
  LargeBold: {
    fontFamily: 'SFProRounded-Bold',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  LargeMedium: {
    fontFamily: 'SFProRounded-Medium',
    fontSize: normalize(14),
  },
  Regular: {
    fontFamily: 'SFProRounded-Regular',
    fontSize: normalize(12),
  },
  RegularBold: {
    fontFamily: 'SFProRounded-Bold',
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  RegularMedium: {
    fontFamily: 'SFProRounded-Medium',
    fontSize: normalize(12),
  },
  Small: {
    fontFamily: 'SFProRounded-Regular',
    fontSize: normalize(10),
  },
  SmallBold: {
    fontFamily: 'SFProRounded-Bold',
    fontSize: normalize(10),
    fontWeight: 'bold',
  },
  SmallMedium: {
    fontFamily: 'SFProRounded-Medium',
    fontSize: normalize(10),
  },
};

module.exports = Fonts;
