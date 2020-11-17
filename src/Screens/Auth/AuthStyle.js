// Libraries
import React from 'react';
import {StyleSheet, I18nManager} from 'react-native';

// Assets
// assets
import {
  screenWidth,
  screenHeight,
  ImagesPath,
  Colors,
  Fonts,
  Scale,
} from '../../Config';

export const AuthStyle = StyleSheet.create({
  imageBg: {
    height: '100%',
    width: screenWidth,
  },
  checkImg: {
    width: Scale(20),
    height: Scale(20),
  marginRight:Scale(20)
  
  },
  
  languageCont: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  languateHeaderText: {
    fontSize: Scale(26),
    color: Colors.WHITE,
    fontFamily: Fonts.Bold,
    color: Colors.BUTTON_COLOR,
  },
  languageTouchable: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: Scale(20),
    paddingRight: Scale(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Scale(50),
    marginTop: Scale(25),
  },
  languageText: {
    fontSize: Scale(16),
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
    marginLeft: Scale(5),
  },
  selectText: {
    fontSize: Scale(22),
    color: Colors.TEXT_COLOR_WHITE,
    fontFamily: Fonts.Bold,
    fontWeight:'bold',
    marginLeft: Scale(5),
  },
  
  buttonText: {
    fontSize: Scale(14),
    color: Colors.TEXT_COLOR_WHITE,
    fontFamily: Fonts.Medium,
  },
  loginTouchable: {
  
    borderRadius: Scale(10),
    width: '90%',
    alignSelf: 'center',
   justifyContent:'center',
    alignItems: 'center',
    height: Scale(45),
    backgroundColor: Colors.BUTTON_COLOR,
    marginTop: Scale(20),
  },
  signupTouchable: {
    borderRadius: Scale(20),
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: Scale(45),
    borderWidth:1
,
borderColor:  Colors.THEME_COLOR2,
  
    marginTop: Scale(10),
  },
  keyboardAware: {
    flex: 1,
    backgroundColor: Colors.THEME_COLOR,
  },
  loginBg: {
    width: screenWidth,
    height: screenHeight,
  },
  loginInputCont: {
    top: -20,
    paddingVertical: Scale(10),
    borderTopLeftRadius: Scale(25),
    borderTopRightRadius: Scale(25),
    backgroundColor: Colors.THEME_COLOR,
    opacity: 0.98,
    borderBottomColor: Colors.THEME_COLOR,
  },
  mobileNumberText: {
    color: Colors.TEXT_COLOR,
    textAlign: 'left',
    width: '90%',
    alignSelf: 'center',
    fontSize: Scale(13),
    fontFamily: Fonts.Medium,
  },
  loginTextInput: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: Colors.TEXT_COLOR2,
    height: Scale(35),
    borderBottomWidth: 1,
    borderBottomColor: Colors.TEXT_COLOR,
    width: '70%',

    fontSize: Scale(14),
    marginTop: Scale(5),
    fontFamily: Fonts.Regular,
  },
  signUpText: {
    alignSelf: 'center',
    fontSize: Scale(14),
    fontFamily: Fonts.Medium,
    marginTop: Scale(30),
    textAlign: 'center',
  },
  resendOTP: {
    alignSelf: 'center',
    fontSize: Scale(16),
    fontFamily: Fonts.Medium,
    marginTop: Scale(15),
    textAlign: 'center',
    width: '80%',
    color: Colors.BUTTON_COLOR,
  },
  OTPDesc: {
    color: Colors.BUTTON_COLOR,
    width: '80%',
    alignSelf: 'center',
    fontSize: Scale(14),
    fontFamily: Fonts.Medium,
    lineHeight: 28,
  },
  backArrowCont: {
    height: '20%',
    alignItems: 'center',
    paddingHorizontal: Scale(20),
    flexDirection: 'row',
  },
  signUpHeaderText: {
    color: Colors.WHITE,
    marginLeft: Scale(15),
    fontSize: Scale(16),
    fontFamily: Fonts.Medium,
  },
  uploadDocText: {
    marginTop: Scale(20),
    textAlign: 'left',
    fontSize: Scale(16),
    color: Colors.WHITE,
    fontFamily: Fonts.Medium,
  },
  imageText: {
    fontFamily: Fonts.Medium,
    color: Colors.WHITE,
    fontSize: Scale(14),
  },
  uploadButtonText: {
    fontSize: Scale(14),
    color: Colors.LIGHT_GRAY,
    fontFamily: Fonts.Medium,
  },
  uploadTouchable: {
    paddingHorizontal: Scale(15),
    paddingVertical: Scale(8),
    backgroundColor: 'rgb(57,57,57)',
    borderRadius: Scale(5),
  },
  docSelectText: {
    marginLeft: Scale(20),
    fontSize: Scale(16),
    fontFamily: Fonts.Medium,
  },
  modalDocTouchable: {
    flexDirection: 'row',
    height: Scale(45),
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingLeft: Scale(10),
    borderRadius: Scale(10),
  },
  modalBg: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  modalCont: {
    height: '100%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Scale(20),
    borderTopRightRadius: Scale(20),
  },
  modalDynami: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Scale(20),
    borderTopRightRadius: Scale(20),
    minHeight: '40%',
    justifyContent: 'center',
  },
  modalItemCont: {
    backgroundColor: 'rgba(200,200,200,0.4)',
    width: '95%',
    alignSelf: 'center',
    borderRadius: Scale(20),
    alignItems: 'center',
    // borderColor: Color.ThemeColor
  },
  modalText: {
    paddingVertical: Scale(10),
    // color: Color.placeHolderColor,
    fontFamily: Fonts.Regular,
    fontSize: Scale(15),
  },
});
