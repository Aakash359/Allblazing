import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    ScrollView,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native'
import {func, shape} from 'prop-types'
import {connect, useDispatch} from 'react-redux'
import {withTranslation} from 'react-i18next'
import {InputField} from '../../components'
import {AuthStyle, CommonStyles, LoginStyles} from '../../styles'
import Constants from '../../constants'
import * as actions from '../../actions/user-action-types'
import {setLoginDetails} from '../../reducers/baseServices/auth'
import axios from 'axios'
import API from '../../constants/baseApi'
import {setAuthToken, setLoginUserId, getAuthToken} from '../../helpers/auth'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation'
import {PermissionsAndroid} from 'react-native'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin'
import {email} from '../../constants/images'
import InstagramLogin from 'react-native-instagram-login'
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk'

Geolocation?.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
})

const socialIcons = [
    {
        icon: Constants.Images.email,
        name: 'google',
    },
    {
        icon: Constants.Images.fb,
        name: 'facebook',
    },
    {
        icon: Constants.Images.insta,
        name: 'insta',
    },
    {
        icon: Constants.Images.twitter,
        name: 'twitter',
    },
]

class Login extends Component {
    timer = null
    constructor() {
        super()
        this.state = {
            emailId: '', //soni@yopmail.com' ,      //'abcd@yopmail.com' //soni@yopmail.com
            isRemember: true,
            isShow: false,
            password: '', //'12345678',         //'tarun123', 12345678
            isLoading: false,
            user: [],
            email: '',
            password: '',
            social_id: '',
            user_name: '',
            token: '',
            profile_pic: '',
        }
    }

    getLastUserCred = async () => {
        try {
            const userCred = JSON.parse(
                (await AsyncStorage.getItem('userCred')) || '{}'
            )
            this.setState({
                emailId: userCred?.email,
                password: userCred?.password,
            })
        } catch (error) {
            console.log('Unable to get User Last Cred')
        }
    }
    getLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'AllBlazing',
                    message: 'AllBlazing access to your location ',
                    buttonPositive: 'OK',
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the location')
                // alert("You can use the location");
            } else {
                console.log('location permission denied')
                // alert("Location permission denied");
            }
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.getLastUserCred()
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization()
        } else {
            this.getLocation()
        }
    }

    _signIn = async () => {
        const {
            navigation: {navigate},
        } = this.props

        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()

            this._hit_Gmail_Api(userInfo.user.email, userInfo.user.id)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    _hit_Gmail_Api = async (email, social_id) => {
        const {
            navigation: {navigate},
        } = this.props

        this.setState({
            isLoading: true,
        })
        axios
            .post(API.GMAIL_SIGN, {
                email: email,
                social_id: social_id,
            })
            .then(async (response) => {
                if (response?.data?.code === 200) {
                    console.log('Gamil-Response', response)
                    console.log('User-Id', response?.data?.data?.user_id)
                    await AsyncStorage.setItem(
                        'socail_id',
                        response?.data?.data?.user_id.toString()
                    )
                    setAuthToken(response?.data?.data?.token)
                    this.props.addLoginDetail(response?.data?.data)
                    setLoginUserId(JSON.stringify(response?.data?.data))
                    navigate('Username', {data: response?.data?.data?.user_id})
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    componentDidUpdate(prevProps, nextProps) {}

    onLogin = async () => {
        const {emailId, password} = this.state
        if (emailId.length < 1) {
            Alert.alert(
                '',
                'Please enter your email Id',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {Cancelable: false}
            )
            return
        } else if (password.length < 1) {
            Alert.alert('', 'Please enter your password')
            return
        }

        let data = {
            email: emailId,
            password: password,
        }
        this.props.login(data)
    }

    Facebook_Sign_In = () => {
        const {
            navigation: {navigate},
        } = this.props

        LoginManager.logInWithPermissions([
            'public_profile',
            'email',
            'user_friends',
        ]).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Login cancelled')
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        let accessToken = data.accessToken

                        const responseInfoCallback = (error, result) => {
                            if (error) {
                                console.log(error)
                                alert(
                                    'Error fetching data: ' + error.toString()
                                )
                            } else {
                                axios
                                    .post(API.GMAIL_SIGN, {
                                        social_id: result.id,
                                        email: result.email,
                                    })
                                    .then(async (response) => {
                                        if (response?.data?.code === 200) {
                                            console.log(
                                                'Response',
                                                response.data
                                            )
                                            await AsyncStorage.setItem(
                                                'socail_id',
                                                response?.data?.data?.user_id.toString()
                                            )
                                            setAuthToken(
                                                response?.data?.data?.token
                                            )
                                            this.props.addLoginDetail(
                                                response?.data?.data
                                            )
                                            setLoginUserId(
                                                JSON.stringify(
                                                    response?.data?.data
                                                )
                                            )
                                            navigate('Username', {
                                                data:
                                                    response?.data?.data
                                                        ?.user_id,
                                            })
                                        }
                                    })
                                    .finally(() => {
                                        this.setState({
                                            isLoading: false,
                                        })
                                    })
                            }
                        }

                        const infoRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: accessToken,
                                parameters: {
                                    fields: {
                                        string:
                                            'email,name,first_name,middle_name,last_name',
                                    },
                                },
                            },
                            responseInfoCallback
                        )

                        new GraphRequestManager()
                            .addRequest(infoRequest)
                            .start()
                    })
                    console.log(
                        'Login success with permissions: ' +
                            result.grantedPermissions.toString()
                    )
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error)
            }
        )
    }

    instagramLogin = async (data) => {
        const {
            navigation: {navigate},
        } = this.props

        this.setState({
            isLoading: true,
        })
        axios
            .post(API.GMAIL_SIGN, {
                social_id: data.user_id,
                email: 'maxhuston140@gmail.com',
            })
            .then(async (response) => {
                console.log('Response', response)
                console.log('User-Id', response?.data?.data?.user_id)
                if (response?.data?.code === 200) {
                    await AsyncStorage.setItem(
                        'socail_id',
                        response?.data?.data?.user_id.toString()
                    )
                    setAuthToken(response?.data?.data?.token)
                    this.props.addLoginDetail(response?.data?.data)
                    setLoginUserId(JSON.stringify(response?.data?.data))
                    navigate('Username', {data: response?.data?.data?.user_id})
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    get_Response_Info = (error, result) => {
        if (error) {
            //Alert for the Error
            Alert.alert('Error fetching data: ' + error.toString())
        } else {
            //response alert
            alert(JSON.stringify(result))
            this.setState({user_name: 'Welcome' + ' ' + result.name})
            this.setState({token: 'User Token: ' + ' ' + result.id})
            this.setState({profile_pic: result.picture.data.url})
        }
    }

    setIgToken = (data) => {
        this.setState({token: data.access_token, user_id: data.user_id})
    }

    Twitter_Sign_In = () => {
        return null
    }
    Socail_Api_Hit(item) {
        switch (item) {
            case 'google':
                this._signIn()
                break
            case 'facebook':
                this.Facebook_Sign_In()
                break
            case 'insta':
                this.instagramLogin.show()
                break
            case 'twitter':
                this.Twitter_Sign_In()
        }
    }
    render() {
        const {emailId, password, isShow, isRemember, isLoading} = this.state
        const {
            navigation: {navigate},
            t: translate,
            email,
            loginStatus,
        } = this.props

        return (
            <View style={CommonStyles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={
                        Platform.OS === 'ios' ? 'on-drag' : 'none'
                    }
                    keyboardShouldPersistTaps="always">
                    <View style={LoginStyles.wrapper}>
                        <Image
                            source={Constants.Images.slectLangLogo2x}
                            resizeMode="contain"
                            style={LoginStyles.logo}
                        />
                        <View>
                            <InputField
                                value={emailId}
                                placeholder={translate('Email')}
                                onChangeText={(text) =>
                                    this.setState({emailId: text})
                                }
                                autoCapitalize={'none'}
                                autoCorrect={false}
                            />
                            <View style={LoginStyles.passwordInput}>
                                <TextInput
                                    style={LoginStyles.password}
                                    placeholder={translate('Password')}
                                    secureTextEntry={!isShow}
                                    value={password}
                                    onChangeText={(text) =>
                                        this.setState({password: text})
                                    }
                                    placeholderTextColor={
                                        Constants.Colors.TEXT_COLOR
                                    }
                                    underlineColorAndroid={
                                        Constants.Colors.TRANSPARENT
                                    }
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                />
                                {isShow ? (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            this.setState({isShow: !isShow})
                                        }>
                                        <Image
                                            source={Constants.Images.eyeon}
                                            resizeMode="contain"
                                            style={AuthStyle.checkImg}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            this.setState({isShow: !isShow})
                                        }>
                                        <Image
                                            source={Constants.Images.eyeoff}
                                            resizeMode="contain"
                                            style={AuthStyle.checkImg}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={LoginStyles.remember}>
                                <View style={LoginStyles.row}>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={() =>
                                            this.setState({
                                                isRemember: !isRemember,
                                            })
                                        }>
                                        <Image
                                            source={
                                                isRemember
                                                    ? Constants.Images.checkbox
                                                    : Constants.Images.checkoff
                                            }
                                            resizeMode="contain"
                                            style={LoginStyles.rememberIcon}
                                        />
                                    </TouchableOpacity>
                                    <Text style={LoginStyles.rememberText}>
                                        {translate('Remember me')}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => navigate('ForgotPassword')}>
                                    <Text
                                        style={[
                                            AuthStyle.buttonText,
                                            LoginStyles.forgotPasswordText,
                                        ]}>
                                        {`${translate('Forgot password')}?`}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                disabled={loginStatus === 'requesting'}
                                style={[
                                    AuthStyle.loginTouchable,
                                    LoginStyles.loginBtn,
                                ]}
                                activeOpacity={0.7}
                                onPress={this.onLogin}>
                                {loginStatus === 'requesting' ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            AuthStyle.buttonText,
                                            {color: Constants.Colors.WHITE},
                                        ]}>
                                        {translate('Login')}
                                    </Text>
                                )}
                            </TouchableOpacity>
                            <View style={LoginStyles.orContainer}>
                                <Image
                                    source={Constants.Images.line}
                                    resizeMode="contain"
                                    style={{
                                        width: Constants.BaseStyle.scale(80),
                                    }}
                                />
                                <Text style={LoginStyles.loginText}>
                                    {translate('or login using')}
                                </Text>
                                <Image
                                    source={Constants.Images.line}
                                    resizeMode="contain"
                                    style={{
                                        width: Constants.BaseStyle.scale(80),
                                    }}
                                />
                            </View>
                            <View style={{alignSelf: 'center'}}></View>

                            <InstagramLogin
                                ref={(ref) => (this.instagramLogin = ref)}
                                appId="253283979675368"
                                appSecret="5351441242872675a8ddeb8f8d8b60bb"
                                redirectUrl="https://www.google.com/"
                                scopes={['user_profile', 'user_media']}
                                onLoginSuccess={this.instagramLogin}
                                onLoginFailure={(data) => console.log(data)}
                            />

                            <View style={LoginStyles.socialIconsWrapper}>
                                {socialIcons.map((social) => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={social.name}
                                        onPress={() =>
                                            this.Socail_Api_Hit(social.name)
                                        }>
                                        <Image
                                            source={social.icon}
                                            resizeMode="contain"
                                            style={LoginStyles.socialIcon}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={LoginStyles.accountWrapper}>
                    <Text style={LoginStyles.account}>
                        {translate('Do not have account?')}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigate('Register')}>
                        <Text style={LoginStyles.createAccount}>
                            {translate('Create account')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

Login.propTypes = {
    loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({
    auth: {email, status, data, code},
    user: {loginStatus},
}) => ({
    email,
    status,
    data,
    code,
    loginStatus,
})

const mapDispatchToProps = {
    addLoginDetail: (params) => setLoginDetails(params),
    loginSuccess: actions.loginSuccess,
    login: actions.login,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(Login))
