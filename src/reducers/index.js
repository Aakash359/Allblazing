import AsyncStorage from '@react-native-community/async-storage'
import {persistCombineReducers} from 'redux-persist'
import {reducer as network} from 'react-native-offline'
import app from './app'
import user from './user'
import auth from './baseServices/auth'
import signUp from './baseServices/signUp'
import profile from './baseServices/profile'
import strava from './baseServices/strava'

const config = {
    // blacklist: ['auth', 'user', 'profile'],
    key: 'root',
    storage: AsyncStorage,
}

const reducers = persistCombineReducers(config, {
    app,
    network,
    user,
    signUp,
    auth: auth,
    profile: profile,
    strava,
})

export default reducers
