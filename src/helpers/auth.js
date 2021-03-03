import AsyncStorage from '@react-native-community/async-storage'
import {logError} from './logging'
const TOKEN_KEY = '@auth_token'
const USER_NAME_KEY = '@username_key'
const USER_AGE_KEY = '@userage_key'
const USER_LOCATION_KEY = '@userlocation_key'
const USER_ADDRESS_KEY = '@useraddress_key'
const USER_CONNECT_TYPE_KEY = '@userconnecttype_key'
const USER_DISTANCE_KEY = '@userdistance_key'
const USER_RECENT_TIME_KEY = '@userrecenttime_key'
const OTP_TOKEN_KEY = '@otptoken_key'
const USER_ID = '@userid_key'
const FORGOTUSER_ID = '@forgotuserid_key'
const LOGINUSER_ID = '@loginuserid_key'
const FORGOTTOKEN = '@forgottoken_key'
const GROUP_NAME = '@groupname_key'
const GROUP_IMAGE = '@groupimage_key'
const STRAVA_ACCESS_CODE = '@strava_access_code'

export const setStravaAccessCode = async (value = '') => {
    try {
        await AsyncStorage.setItem(STRAVA_ACCESS_CODE, value)
    } catch (error) {
        logError(error, '[setStravaAccessCode] AsyncStorage Erro')
    }
}

export const getStravaAccessCode = async () => {
    try {
        return await AsyncStorage.getItem(STRAVA_ACCESS_CODE)
    } catch (error) {
        logError(error, '[getStravaAccessCode] AsyncStorage Error')
    }
}

export const setAuthToken = async (value = '') => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, value)
    } catch (err) {
        logError(err, '[setAuthToken] AsyncStorage Error')
    }
}
export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY)
    } catch (err) {
        logError(err, '[getAuthToken] AsyncStorage Error')
        return null
    }
}
export const setLoginUserId = async (value = '') => {
    try {
        await AsyncStorage.setItem(LOGINUSER_ID, value)
    } catch (err) {
        logError(err, '[setUser_Id] AsyncStorage Error')
    }
}
export const getLoginUserId = async () => {
    try {
        return await AsyncStorage.getItem(LOGINUSER_ID)
    } catch (err) {
        logError(err, '[getUser_Id] AsyncStorage Error')
        return null
    }
}
export const setUserName = async (value = '') => {
    try {
        await AsyncStorage.setItem(USER_NAME_KEY, value)
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserName] AsyncStorage Error')
    }
}
export const getUserName = async () => {
    try {
        return await AsyncStorage.getItem(USER_NAME_KEY)
    } catch (err) {
        logError(err, '[getUserName] AsyncStorage Error')
        return null
    }
}

export const setUserAge = async (value = '') => {
    try {
        await AsyncStorage.setItem(USER_AGE_KEY, value)
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserAge] AsyncStorage Error')
    }
}
export const getUserAge = async () => {
    try {
        return await AsyncStorage.getItem(USER_AGE_KEY)
    } catch (err) {
        logError(err, '[getUserAge] AsyncStorage Error')
        return null
    }
}

export const setUserLocation = async (location) => {
    try {
        await AsyncStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location))
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserLocation] AsyncStorage Error')
    }
}
export const getUserLocation = async () => {
    try {
        return JSON.parse(
            (await AsyncStorage.getItem(USER_LOCATION_KEY)) || '{}'
        )
    } catch (err) {
        logError(err, '[getUserLocation] AsyncStorage Error')
        return null
    }
}

export const setUserAddress = async (address) => {
    console.log('ADDRESS', address)
    try {
        await AsyncStorage.setItem(USER_ADDRESS_KEY, address)
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserAddress] AsyncStorage Error', address)
    }
}
export const getUserAddress = async () => {
    try {
        return await AsyncStorage.getItem(USER_ADDRESS_KEY)
    } catch (err) {
        logError(err, '[getUserAddress] AsyncStorage Error')
        return null
    }
}

export const setUserConnectType = async (value = '') => {
    try {
        await AsyncStorage.setItem(USER_CONNECT_TYPE_KEY, value)
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserConnectType] AsyncStorage Error')
    }
}
export const getUserConnectType = async () => {
    try {
        return await AsyncStorage.getItem(USER_CONNECT_TYPE_KEY)
    } catch (err) {
        logError(err, '[getUserConnectType] AsyncStorage Error')
        return null
    }
}
export const setUserDistance = async (value = '') => {
    try {
        await AsyncStorage.setItem(USER_DISTANCE_KEY, value)
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserDistance] AsyncStorage Error')
    }
}
export const getUserDistance = async () => {
    try {
        return await AsyncStorage.getItem(USER_DISTANCE_KEY)
    } catch (err) {
        logError(err, '[getUserDistance] AsyncStorage Error')
        return null
    }
}
export const setUserRecentTime = async (value = '') => {
    try {
        await AsyncStorage.setItem(USER_RECENT_TIME_KEY, value)
        // console.log("=======>>",value);
    } catch (err) {
        logError(err, '[setUserRecentTime] AsyncStorage Error')
    }
}
export const getUserRecentTime = async () => {
    try {
        return await AsyncStorage.getItem(USER_RECENT_TIME_KEY)
    } catch (err) {
        logError(err, '[getUserRecentTime] AsyncStorage Error')
        return null
    }
}
export const setOtpToken = async (value = '') => {
    try {
        await AsyncStorage.setItem(OTP_TOKEN_KEY, value)
        // console.log("ghjfghf",value);
    } catch (err) {
        logError(err, '[setOtpToken] AsyncStorage Error')
    }
}
export const getOtpToken = async () => {
    try {
        return await AsyncStorage.getItem(OTP_TOKEN_KEY)
    } catch (err) {
        logError(err, '[getOtpToken] AsyncStorage Error')
        return null
    }
}
export const setUserId = async (value = '') => {
    try {
        await AsyncStorage.setItem(USER_ID, value)
    } catch (err) {
        logError(err, '[setUserId] AsyncStorage Error')
    }
}
export const getUserId = async () => {
    try {
        return await AsyncStorage.getItem(USER_ID)
    } catch (err) {
        logError(err, '[getUserId] AsyncStorage Error')
        return null
    }
}
export const setUserCred = async (data) => {
    const {email, password, remember} = data
    console.log('ASYNC STORAGE: ', data)
    if (remember) {
        try {
            await AsyncStorage.setItem(
                'userCred',
                JSON.stringify({email, password})
            )
        } catch (error) {
            logError(error, '[setUserCread] AsyncStorge Error')
        }
    } else {
        await AsyncStorage.removeItem('userCred')
    }
}
export const setForgotOtpToken = async (value = '') => {
    try {
        await AsyncStorage.setItem(FORGOTTOKEN, value)
    } catch (err) {
        logError(err, '[setForgotOtpToken] AsyncStorage Error')
    }
}
export const getForgotOtpToken = async () => {
    try {
        return await AsyncStorage.getItem(FORGOTTOKEN)
    } catch (err) {
        logError(err, '[getForgotOtpToken] AsyncStorage Error')
        return null
    }
}
export const setForgotPasswordUserId = async (value = '') => {
    try {
        await AsyncStorage.setItem(FORGOTUSER_ID, value)
    } catch (err) {
        logError(err, '[setForgotUserId] AsyncStorage Error')
    }
}
export const getForgotPasswordUserId = async () => {
    try {
        return await AsyncStorage.getItem(FORGOTUSER_ID)
    } catch (err) {
        logError(err, '[getForgotPasswordUserId] AsyncStorage Error')
        return null
    }
}
export const setGroupName = async (value = '') => {
    try {
        await AsyncStorage.setItem(GROUP_NAME, value)
        console.log('=======>>', value)
    } catch (err) {
        logError(err, '[setGroupName] AsyncStorage Error')
    }
}
export const getGroupName = async () => {
    try {
        return await AsyncStorage.getItem(GROUP_NAME)
    } catch (err) {
        logError(err, '[getGroupName] AsyncStorage Error')
        return null
    }
}
export const setGroupImage = async (value = '') => {
    try {
        await AsyncStorage.setItem(GROUP_IMAGE, value)
        console.log('=======>>', value)
    } catch (err) {
        logError(err, '[setGroupImage] AsyncStorage Error')
    }
}
export const getGroupImage = async () => {
    try {
        return await AsyncStorage.getItem(GROUP_IMAGE)
    } catch (err) {
        logError(err, '[getGroupImage] AsyncStorage Error')
        return null
    }
}

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY)
    } catch (err) {
        logError(err, '[removeAuthToken] AsyncStorage Error')
    }
}

export const clearAsyncStorage = async () => {
    try {
        AsyncStorage.clear()
    } catch (err) {
        logError(err, '[clearStorage] AsyncStorage Error')
    }
}

export const authHeader = async () => {
    const token = await getAuthToken()

    return token ? {Authorization: `Bearer ${token}`} : {}
}
