import {
    SET_ACCESS_TOKEN,
    SET_CODE,
    SET_REFRESH_TOKEN,
    REMOVE_ALL,
} from '../../actions/strava-action-types'

const initalStrava = {
    code: '',
    access_token: '',
    refresh_token: '',
}

export default function strava(state = initalStrava, action) {
    switch (action.type) {
        case SET_CODE:
            return {...state, code: action.payload}
        case SET_ACCESS_TOKEN:
            return {...state, access_token: action.payload}
        case SET_REFRESH_TOKEN:
            return {...state, refresh_token: action.payload}
        case REMOVE_ALL:
            return initalStrava
        default:
            return state
    }
}

export function setCode(payload) {
    return {type: SET_CODE, payload}
}

export function setAccessToken(payload) {
    return {type: SET_ACCESS_TOKEN, payload}
}

export function setRefreshToken(payload) {
    return {type: SET_REFRESH_TOKEN, payload}
}

export function removeAllStravaToken() {
    return {type: REMOVE_ALL}
}
