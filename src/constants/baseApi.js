
export const BASE_URL = 'https://quytech.net/runfast-sftp/RunFast/public/api';

const API = {
 
  /** AUTH **/
  LOG_IN: BASE_URL + '/login',
  SIGN_UP: BASE_URL + '/signup',
  FORGOT_PASSWORD: BASE_URL + '/forgot_password',
  VERIFY_OTP: BASE_URL + '/verify_otp',
  RESEND_OTP: BASE_URL + '/resend_otp',
  CHANGE_LANGUAGE: BASE_URL + '/changeLanguage',
  CHANGE_PASSWORD:BASE_URL + '/changePassword',
  COMPLETE_PROFILE:BASE_URL + '/completeProfile' ,
  ALL_POST:BASE_URL + '/post?type=all',
  RESET_PASSWORD:BASE_URL + '/resetPassword',
  POST: BASE_URL + '/post',
  FOLLOWERS: BASE_URL + '/follow?type=Follow',
  FOLLOWING: BASE_URL + '/follow?type=Following',
  POSTS:BASE_URL + '/post?type=my_post',
  POST_LIST :BASE_URL + '/post?type=all',
  LIKE: BASE_URL + '/post/like',
  UPDATE_PROFILE:BASE_URL + '/updateProfile' ,
  PROFILE_DETAILS: BASE_URL + '/profileDetails',
  FOLLOW: BASE_URL + '/follow',
  UNFOLLOW:BASE_URL + '/follow/' ,
  USER_BLOCK : BASE_URL + '/block',
  USER_REPORT : BASE_URL + '/report',
  CREATE_GROUP : BASE_URL + '/group',
  CONTACT_US : BASE_URL + '/contact_us',
  USER_LIST : BASE_URL + '/user_list',
  GROUP_TYPE : BASE_URL + '/groupType',
  EVENT : BASE_URL + '/event',
  // USERLIST : BASE_URL + 
  

  
};

export default API;