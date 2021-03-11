import {StyleSheet} from 'react-native';
import Constants from '../constants';

export const AuthStyle = StyleSheet.create({
  buttonActiveText: {
    ...Constants.Fonts.RegularBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  buttonLanguageText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR2,
  },
  buttonText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  checkImg: {
    height: Constants.BaseStyle.scale(20),
    marginRight: Constants.BaseStyle.scale(20),
    width: Constants.BaseStyle.scale(20),
  },
  imageBg: {
    height: '100%',
    width: Constants.BaseStyle.DEVICE_WIDTH,
  },
  introButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(6),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(20),
    width: '40%',
  },
  introButton2: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(6),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(20),
    width: '90%',
  },
  langHeaderText: {fontSize: 28},
  loginTouchable: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(6),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(20),
    width: '90%',
  },
  loginTouchableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutBtn: {marginTop: Constants.BaseStyle.scale(30)},
  margin: {marginTop: Constants.BaseStyle.scale(20)},
  privcyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: Constants.BaseStyle.scale(25),
  },
  privcyText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.PRIVCYTEXT,
  },
  privcyText2: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  saveBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(6),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(500),
    width: '90%',
  },
  selectText: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: 28,
    marginLeft: Constants.BaseStyle.scale(5),
    marginVertical: Constants.BaseStyle.scale(0),
    marginTop: Constants.BaseStyle.scale(20),
  },
  Reset: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: 28,
  },
  welcomeView: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(10),
    height: Constants.BaseStyle.scale(80),
    justifyContent: 'center',
    width: '78%',
  },
});

export const RegisterStyle = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(6),
    color: Constants.Colors.WHITE,
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    marginBottom: Constants.BaseStyle.scale(40),
    width: '90%',
  },
  mottoCount: {
    color: Constants.Colors.WHITE,
    marginTop: Constants.BaseStyle.scale(5),
    textAlign: 'right',
    width: '90%',
  },
  password: {
    alignSelf: 'center',
    color: Constants.Colors.TEXT_COLOR,
    ...Constants.Fonts.Regular,
    height: Constants.BaseStyle.scale(40),
    marginLeft: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(5),
    width: '85%',
  },
  email: {
    alignSelf: 'center',
    color: Constants.Colors.TEXT_COLOR,
    ...Constants.Fonts.Regular,
    height: Constants.BaseStyle.scale(40),
    marginLeft: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(5),
    width: '86%',
  },
  Reset: {
    alignItems: 'center',
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
  },
  passwordInput: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(45),
    marginTop: Constants.BaseStyle.scale(20),
    width: '90%',
  },
  emailInput: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(45),
    marginTop: Constants.BaseStyle.scale(10),
    width: '100%',
  },
  textLinkView: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: Constants.BaseStyle.scale(25),
    marginTop: Constants.BaseStyle.scale(10),
  },
  textSmallLinkStyle: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  textSmallStyle: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.PRIVCYTEXT,
  },
  wrapper: {
    flex: 0.9,
    marginTop: Constants.BaseStyle.scale(10),
    alignItems: 'center',
  },
});

export const UsernameStyle = StyleSheet.create({
  age: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
  },
  ageBlur: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR2,
  },
  ageButton: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'space-between',
    marginVertical: Constants.BaseStyle.scale(20),
    paddingHorizontal: Constants.BaseStyle.scale(15),
    paddingVertical: Constants.BaseStyle.scale(5),
    width: '90%',
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Constants.BaseStyle.scale(15),
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(10),
  },
  buttonsWrapper: {
    flexDirection: 'column-reverse',
    marginTop: (Constants.BaseStyle.DEVICE_HEIGHT / 100) * 0,
  },
  input: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: 28,
    marginTop: Constants.BaseStyle.scale(40),
    textAlign: 'center',
    width: '80%',
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
  wrapper: {
    flex: 1,
    marginTop: Constants.BaseStyle.scale(20),
  },
});

export const ConnectUserTypeStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(6),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'space-between',
    marginTop: Constants.BaseStyle.scale(20),
    width: '90%',
  },
  buttonText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
  },
  buttonsWrapper: {
    flexDirection: 'column-reverse',
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
  input: {
    ...Constants.Fonts.ExtraLargeBold,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: 28,
    marginTop: Constants.BaseStyle.scale(40),
    textAlign: 'center',
    width: '90%',
  },
  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  wrapper: {
    flex: 1,
    marginBottom: Constants.BaseStyle.scale(50),
    marginTop: Constants.BaseStyle.scale(20),
  },
});

export const Repeat5KStyles = StyleSheet.create({
  active: {...Constants.Fonts.RegularBold},
  buttonText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.BLACK,
  },
  buttonsWrapper: {
    flexDirection: 'column-reverse',
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(0),
  },
  header: {width: '80%'},
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
});

export const DistanceStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {textAlign: 'center'},
  buttonsWrapper: {
    flexDirection: 'column-reverse',
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(0),
  },
  select: {
    position: 'absolute',
    right: Constants.BaseStyle.scale(5),
  },
});

export const ForgotPassStyles = StyleSheet.create({
  buttonText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    marginHorizontal: Constants.BaseStyle.scale(40),
    marginVertical: Constants.BaseStyle.scale(8),
    textAlign: 'center',
  },
  buttonsWrapper: {
    flex: 0.65,
    flexDirection: 'column-reverse',
  },
  wrapper: {
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'space-evenly',
    marginTop: Constants.BaseStyle.scale(20),
  },
  wrapper2: {
    flex: 0.3,
    width: '100%',

    marginTop: Constants.BaseStyle.scale(0),
  },
});

export const WelcomeStyles = StyleSheet.create({
  buttons: {
    alignItems: 'flex-end',
    flex: 0.1,
    paddingBottom: 10,
  },
  description: {
    ...Constants.Fonts.ExtraLarge,
    fontSize: 18,
    marginHorizontal: Constants.BaseStyle.scale(30),
    textAlign: 'center',
  },
  headerText: {
    ...Constants.Fonts.ExtraLargeBold,
    fontSize: 42,
    paddingTop: Constants.BaseStyle.scale(0),
  },
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Constants.BaseStyle.scale(30),
  },
  leftImage: {
    alignSelf: 'flex-start',
    height: Constants.BaseStyle.scale(60),
  },
  rightImage: {
    alignSelf: 'flex-end',
    height: Constants.BaseStyle.scale(60),
  },
  subHeaderText: {
    ...Constants.Fonts.ExtraLargeBold,
    fontSize: 28,
    paddingTop: Constants.BaseStyle.scale(0),
  },
  wrapper: {
    alignItems: 'center',
    flex: 0.9,
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(0),
  },
});

export const OTPStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    margin: Constants.BaseStyle.scale(10),
  },
  buttonsWrapper: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
  header: {
    marginHorizontal: Constants.BaseStyle.scale(40),
    textAlign: 'center',
  },
  input: {
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(5),
    borderWidth: 0,
    ...Constants.Fonts.Regular,
  },
  inputHighlight: {
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(16),
  },
  inputView: {
    alignSelf: 'center',
    height: Constants.BaseStyle.scale(60),
    marginTop: Constants.BaseStyle.scale(20),
    width: '60%',
  },
});

export const LoginStyles = StyleSheet.create({
  account: {
    color: Constants.Colors.TEXT_COLOR,
    ...Constants.Fonts.Regular,
  },
  accountWrapper: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderTopLeftRadius: Constants.BaseStyle.scale(20),
    borderTopRightRadius: Constants.BaseStyle.scale(20),
    bottom: 0,
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(80),
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  createAccount: {
    color: Constants.Colors.RED,
    marginHorizontal: Constants.BaseStyle.scale(2),
    ...Constants.Fonts.Regular,
  },
  forgotPasswordText: {
    color: Constants.Colors.WHITE,
    ...Constants.Fonts.Regular,
  },
  login: {
    color: Constants.Colors.WHITE,
    marginBottom: Constants.BaseStyle.scale(30),
    marginHorizontal: Constants.BaseStyle.scale(10),
    ...Constants.Fonts.Regular,
  },
  loginBtn: {
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    marginTop: Constants.BaseStyle.scale(0),
  },
  loginText: {
    color: Constants.Colors.WHITE,
    marginHorizontal: Constants.BaseStyle.scale(10),
    ...Constants.Fonts.Regular,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: Constants.BaseStyle.scale(40),
    width: '80%',
  },
  orContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Constants.BaseStyle.scale(50),
  },
  password: {
    ...Constants.Fonts.Regular,
    alignSelf: 'center',
    color: Constants.Colors.TEXT_COLOR,
    height: Constants.BaseStyle.scale(40),
    marginLeft: Constants.BaseStyle.scale(10),
    marginTop: Constants.BaseStyle.scale(5),
    width: '85%',
  },
  passwordInput: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(45),
    width: '90%',
  },
  remember: {
    flexDirection: 'row',
    height: Constants.BaseStyle.scale(70),
    justifyContent: 'space-between',
    marginHorizontal: Constants.BaseStyle.scale(20),
    marginTop: Constants.BaseStyle.scale(30),
  },
  rememberIcon: {
    height: Constants.BaseStyle.scale(18),
    width: Constants.BaseStyle.scale(20),
  },
  rememberText: {
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    paddingHorizontal: Constants.BaseStyle.scale(6),
    ...Constants.Fonts.Regular,
  },
  row: {flexDirection: 'row'},
  scollWrapper: {flex: 0.6},
  socialIcon: {
    height: Constants.BaseStyle.scale(40),
    width: Constants.BaseStyle.scale(40),
  },

  socialIconsWrapper: {
    
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: Constants.BaseStyle.scale(30),
    marginVertical: Constants.BaseStyle.scale(30),
  },
  wrapper: {
    flex: 0.9,
    paddingTop: Constants.BaseStyle.scale(60),
  },
});

export const LocationStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginTop: Constants.BaseStyle.scale(20),
  },
  buttonsWrapper: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(0),
  },
  container: {
    marginBottom: 0,
    marginTop: Constants.BaseStyle.scale(20),
  },
  currentLocationText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    marginLeft: Constants.BaseStyle.scale(10),
  },
  inputWrapper: {marginTop: Constants.BaseStyle.scale(40)},
  location: {justifyContent: 'flex-start'},
  locationIcon: {
    height: 25,
    width: 26,
  },
  locationText: {alignSelf: 'center'},
  logo: {
    alignSelf: 'center',
    marginBottom: Constants.BaseStyle.scale(40),
    width: '50%',
  },
  margin: {marginVertical: Constants.BaseStyle.scale(10)},
  orText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.PRIVCYTEXT,
    marginBottom: Constants.BaseStyle.scale(10),
  },
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
});

export const GenderStyles = StyleSheet.create({
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
});

export const MottoStyles = StyleSheet.create({
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
});

export const ContactUSStyles = StyleSheet.create({
  saveBtn: {marginTop: Constants.BaseStyle.scale(300)},
});

export const LanguageStyles = StyleSheet.create({
  button: {
    alignItems: 'flex-end',
    flex: 0.1,
    paddingBottom: 10,
  },
  centerItems: {
    alignItems: 'center',
    flex: 0.9,
    marginTop: Constants.BaseStyle.scale(100),
  },
  saveBtn: {marginTop: Constants.BaseStyle.scale(450)},
});

export const ChangePassStyles = StyleSheet.create({
  saveBtn: {
    marginBottom: Constants.BaseStyle.scale(15),
    marginTop: Constants.BaseStyle.scale(10),
  },
});

export default AuthStyle;
