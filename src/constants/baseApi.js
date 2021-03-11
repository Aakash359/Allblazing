export const BASE_URL = 'https://quytech.net/runfast-sftp/RunFast/public/api'

const API = {
    /** AUTH **/

    LOG_IN: BASE_URL + '/login',
    SIGN_UP: BASE_URL + '/signup',
    FORGOT_PASSWORD: BASE_URL + '/forgot_password',
    VERIFY_OTP: BASE_URL + '/verify_otp',
    RESEND_OTP: BASE_URL + '/resend_otp',
    CHANGE_LANGUAGE: BASE_URL + '/changeLanguage',
    CHANGE_PASSWORD: BASE_URL + '/changePassword',
    COMPLETE_PROFILE: BASE_URL + '/completeProfile',
    ALL_POST: BASE_URL + '/post?type=all',
    RESET_PASSWORD: BASE_URL + '/resetPassword',
    POST: BASE_URL + '/post',
    FOLLOWERS: BASE_URL + '/follow?type=Follow',
    FOLLOWING: BASE_URL + '/follow?type=Following',
    POSTS: BASE_URL + '/post?type=my_post',
    POST_LIST: BASE_URL + '/post?type=all',
    LIKE: BASE_URL + '/post/like',
    UPDATE_PROFILE: BASE_URL + '/updateProfile',
    PROFILE_DETAILS: BASE_URL + '/profileDetails',
    FOLLOW: BASE_URL + '/follow',
    UNFOLLOW: BASE_URL + '/follow/',
    USER_BLOCK: BASE_URL + '/block',
    USER_REPORT: BASE_URL + '/report',
    CREATE_GROUP: BASE_URL + '/group',
    CONTACT_US: BASE_URL + '/contact_us',
    USER_LIST: BASE_URL + '/user_list',
    RTC_TOKEN: BASE_URL + '/agoraRtcToken',
    CREATE_CHANNEL: BASE_URL + '/channel',
    RTM: BASE_URL + '/agoraRtmToken',

    GROUP_TYPE: BASE_URL + '/groupType',
    EVENT: BASE_URL + '/event',
    JOIN_GROUP: BASE_URL + '/group/join/',
    GROUP_LISTING: `${BASE_URL}/group`,
    REQ_GROUP_LISTING: `${BASE_URL}/requested`,
    GROUP_DETAILS: `${BASE_URL}/group`,
    GROUP_UPDATE: `${BASE_URL}/group`,
    GROUP_LEAVE: `${BASE_URL}/group/leave`,
    ABOUT_US: `${BASE_URL}/static/about`,
    PRIVACY_POLICY: `${BASE_URL}/static/privacy`,
    TERMS_CONDITIONS: `${BASE_URL}/static/term`,
    FAQ: `${BASE_URL}/faq`,
    USER_POST_FEED: `${BASE_URL}/post/user_list`,
    SEND_FRIEND_REQUEST: `${BASE_URL}/friend`,
    ACCEPT_REJECT_FRIEND_REQUEST: `${BASE_URL}/friend`,
    GET_FRIEND_LIST: `${BASE_URL}/friend?type=Friend`,
    GET_FRIEND_REQUEST: `${BASE_URL}/friend?type=Request`,
    ACCEPT_GROUP_REQUEST: `${BASE_URL}/group/accept`,
    REJECT_GROUP_REQUEST: `${BASE_URL}/group/reject`,
    EVENT_CATEGORY: `${BASE_URL}/event_category`,
    REPORT_GROUP: `${BASE_URL}/group/report`,
    EVENT_INVITE: `${BASE_URL}/event/invite`,
    WITHDRAW_EVENT_INVITE: `${BASE_URL}/event/withdraw`,
    ACCEPT_EVENT_INVITE: `${BASE_URL}/event/accept`,
    REJECT_EVENT_INVITE: `${BASE_URL}/event/decline`,
    FILTER_EVENTS: `${BASE_URL}/event-filters`,
    RUNNERS_NEAR_ME: `${BASE_URL}/runner-near-me-list`,
    FILTER_RUNNERS: `${BASE_URL}/runners-filters`,
    BLOCKED_USERS: `${BASE_URL}/block_list`,
    GROUP_MEMBERS: `${BASE_URL}/member_list`,
    GMAIL_SIGN: `${BASE_URL}/social_signup`,
    DISTANCE_LEVEL: `${BASE_URL}/level`,
    WITHDRAW_FRIEND_REQUEST: `${BASE_URL}/friend`,
    // USERLIST : 'BASE_URL +
}

export default API
