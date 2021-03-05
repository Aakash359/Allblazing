import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Colors} from '../../constants'
// import {WebView} from 'react-native-webview'
import {Dimensions} from 'react-native'
import queryString from 'query-string'
import {getStravaAccessCode, setStravaAccessCode} from '../../helpers/auth'
import {config} from './config'
import {connect} from 'react-redux'
import {
    setAccessToken,
    setCode,
    setRefreshToken,
} from '../../reducers/baseServices/strava'
import {API} from './api'
import Axios from 'axios'

const {width, height} = Dimensions.get('window')

const url = `https://www.strava.com/oauth/mobile/authorize?client_id=${config.client_id}&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=auto&scope=activity:write,read_all`

export class strava extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
            code: '',
            accessToken: '',
            refreshToken: '',
            user: {},
            userFriends: [],
            isLoading: false,
            error: false,
            msg: '',
        }
    }

    _onNavigationStateChange(webViewState) {
        let {url} = webViewState
        let param = url.split('?')[1]
        let data = queryString.parse(param)
        let {code} = data
        this.setState({url, code}, async () => {
            if (code) {
                await setStravaAccessCode(code)
                this.props.setCode(code)
                this.getToken(code)
            }
        })
    }

    getStravaCode = async () => {
        const {
            strava: {code, access_token, refresh_token},
        } = this.props
        this.getRefreshToken(refresh_token)
        this.setState({code})
    }

    getToken = async (code) => {
        const {setAccessToken, setRefreshToken} = this.props
        const {client_id, client_secret} = config
        const url = API.authoriztion_code
        const configs = {
            params: {
                client_id,
                client_secret,
                code,
                grant_type: 'authorization_code',
            },
        }
        try {
            const res = await Axios.post(url, {}, configs)
            console.log('AUTH RESPONSE', res)
            const {access_token, refresh_token} = res?.data
            setAccessToken(access_token)
            setRefreshToken(refresh_token)
            this.getAthlete(access_token)
            this.setState({isLoading: false, user: res?.data, error: false})
        } catch (error) {
            this.setState({isLoading: false, error: true, msg: error.message})
        }
    }

    getAthlete = async (access_token) => {
        const url = API.getAthlete
        const conf = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                params: {
                    scope: 'read_all',
                },
            },
        }
        try {
            const res = await Axios.get(url, conf)
            const user = res?.data
            this.setState({user})
            console.log('GET Athelete:  ', res)
        } catch (error) {
            console.log('GET ATHLETE ERROR: ', error)
        }
    }

    getAthleteFriends = async (access_token) => {
        const url = API.getFriends
        const conf = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                params: {
                    scope: '[profile:read_all, activity:read_all,write_all]',
                },
            },
        }
        try {
            const res = await Axios.get(url, conf)
            const userFriends = res?.data
            this.setState({userFriends})
            console.log('GET Athelete  Friends:  ', res)
        } catch (error) {
            console.log('GET ATHLETE FRIENDS ERROR: ', error)
        }
    }

    getRefreshToken = async (refresh_token) => {
        const url = API.refreshToken
        const {client_id, client_secret} = config
        const conf = {
            params: {
                client_id,
                client_secret,
                refresh_token,
                grant_type: 'refresh_token',
            },
        }
        console.log('CONF', conf)
        try {
            const res = await Axios.post(url, {}, conf)
            const {access_token} = res.data
            this.props.setAccessToken(access_token)
            this.getAthlete(access_token)
            this.getAthleteFriends(access_token)

            console.log('REFRESH TOKEN', res)
        } catch (error) {
            console.log('ERROR REFRESH TOKEN', error)
        }
    }

    componentDidMount() {
        this.getStravaCode()
    }

    render() {
        const {code, user} = this.state
        console.log('CODE', this.props)
        console.log('STATE', this.state)
        return (
            <>
                {code ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                        }}>
                        <Text style={{color: Colors.WHITE}}>
                            {user?.firstname} {user.lastname}
                        </Text>
                    </View>
                ) : ( null
                  
                )}
            </>
        )
    }
}

const mapStatesToProps = ({strava}) => {
    return {
        strava,
    }
}

const mapDispatchToProps = {
    setCode: (payload) => setCode(payload),
    setAccessToken: (payload) => setAccessToken(payload),
    setRefreshToken: (payload) => setRefreshToken(payload),
}

export default connect(mapStatesToProps, mapDispatchToProps)(strava)
