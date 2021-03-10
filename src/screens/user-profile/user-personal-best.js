import React, {Component} from 'react'
import {
    Platform,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Alert,
    ActivityIndicator,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {withTranslation} from 'react-i18next'
import {bool, func, shape} from 'prop-types'
import {
    AuthStyle,
    CommonStyles,
    ConnectUserTypeStyles,
    DistanceStyles,
    Repeat5KStyles,
} from '../../styles'
import {StepBar} from '../../components'
import Constants from '../../constants'
import {times} from '../../data'
import {getAuthToken, setUserRecentTime} from '../../helpers/auth'
import API from '../../constants/baseApi'
import axios from 'axios'
import connect from 'react-redux/lib/connect/connect'
import {setTime} from '../../reducers/baseServices/profile'

class UserPersonalBest extends Component {
    constructor() {
        super()
        this.state = {time: 0, list: [], Loading: false, isLoading: true}
    }

    getDistanceList = async () => {
        const url = API.DISTANCE_LEVEL
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${
                    token ||
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcXV5dGVjaC5uZXRcL3J1bmZhc3Qtc2Z0cFwvUnVuRmFzdFwvcHVibGljXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjE1Mjg1ODE4LCJleHAiOjE2NDY4MjE4MTgsIm5iZiI6MTYxNTI4NTgxOCwianRpIjoib3BOaHR4ejhobWwyb3ltbSIsInN1YiI6MTkyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.I1J7mGytRfclgfwfERM3ViXJjP6DGxfaDNqYkHqfFuc'
                }`,
            },
        }
        try {
            const res = await axios.get(url, config)
            if (res?.data?.status) {
                const {Train, Race} = res?.data?.data
                this.setState({list: Train, isLoading: false})
            } else {
                this.setState({isLoading: false})
            }
        } catch (error) {
            console.log('ERROR DISTANCE LEVEL: ', error)
            this.setState({isLoading: false})
        }
    }

    componentDidMount() {
        this.getDistanceList()
    }

    TimeStore = () => {
        if (this.state.time === 0) {
            Alert.alert('', 'Please select  recent time', '')
        } else {
            setUserRecentTime(this.state.time.toString())
            this.setState({time: 0})
            this.props.navigation.navigate('Location')
        }
    }

    onSave = async () => {
        const {addTime} = this.props
        const {
            navigation: {navigate},
        } = this.props
        const {time, list} = this.state

        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            Loading: true,
        })
        console.log('==>', time)
        if (this.state.time === '') {
            Alert.alert('', 'Please select your age', '')
        } else {
            axios
                .post(
                    API.UPDATE_PROFILE,
                    {
                        time: time,
                    },
                    config
                )
                .then((response) => {
                    if (response?.data?.code === 200) {
                        Alert.alert(
                            '',
                            response?.data?.message ?? '',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () =>
                                        console.log('Cancel pressed'),
                                    style: 'Cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => navigate('EditProfile'),
                                },
                            ],
                            {Cancelable: false}
                        )
                        addTime(time)
                        console.log('time:==>', time)
                        // navigate('EditProfile');
                    }
                })
                .finally(() => {
                    this.setState({
                        Loading: false,
                    })
                })
        }
    }
    onTypeChange = (payload) => this.setState({time: payload})
    // componentDidMount() {
    //     const time = this.props.route?.params?.Train ?? ''
    //     console.log('time==>', time)
    //     this.setState({list: time})
    // }
    render() {
        const {time, list, isLoading} = this.state
        const {
            navigation: {goBack, navigate},
            route: {params},
            t: translate,
        } = this.props

        const Colors = [
            Constants.Colors.LIGHT_GREEN,
            Constants.Colors.LIGHT_ORANGE,
            Constants.Colors.LIGHT_RED,
            Constants.Colors.LIGHT_YELLOW,
            Constants.Colors.LIGHT_GREEN,
            Constants.Colors.LIGHT_ORANGE,
            Constants.Colors.LIGHT_RED,
            Constants.Colors.LIGHT_YELLOW,
            Constants.Colors.LIGHT_GREEN,
            Constants.Colors.LIGHT_ORANGE,
            Constants.Colors.LIGHT_RED,
            Constants.Colors.LIGHT_YELLOW,
        ]

        return (
            <View style={CommonStyles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={
                        Platform.OS === 'ios' ? 'on-drag' : 'none'
                    }
                    keyboardShouldPersistTaps="always">
                    <View style={ConnectUserTypeStyles.wrapper}>
                        {!params?.isEditMode && (
                            <StepBar count={5} selected={[0, 1, 2, 3]} />
                        )}
                        <View style={ConnectUserTypeStyles.inputWrapper}>
                            {!params?.isEditMode && (
                                <Text
                                    style={[
                                        ConnectUserTypeStyles.input,
                                        Repeat5KStyles.header,
                                    ]}>
                                    {translate('profile.PersonalBest')}
                                </Text>
                            )}
                            {isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Constants.Colors.WHITE}
                                />
                            ) : (
                                list.map((t, i) => (
                                    <TouchableOpacity
                                        key={t.id}
                                        style={[
                                            ConnectUserTypeStyles.button,
                                            DistanceStyles.button,
                                            {
                                                backgroundColor: Colors[i],
                                            },
                                        ]}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            this.onTypeChange(
                                                `${t.range} minutes`
                                            )
                                        }>
                                        <Text
                                            style={[
                                                Repeat5KStyles.buttonText,
                                                DistanceStyles.buttonText,
                                                time === t.value &&
                                                    Repeat5KStyles.active,
                                            ]}>
                                            {/* {translate(t.label)} */}
                                            {`${t.range} minutes`}
                                        </Text>
                                        {time === `${t.range} minutes` && (
                                            <Ionicons
                                                name="checkmark-sharp"
                                                size={25}
                                                color={Constants.Colors.BLACK}
                                                style={[
                                                    AuthStyle.checkImg,
                                                    DistanceStyles.select,
                                                ]}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    </View>
                </ScrollView>
                {params?.isEditMode ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[AuthStyle.saveBtn, Repeat5KStyles.saveBtn]}
                        onPress={() => this.onSave()}>
                        {this.state.Loading ? (
                            <ActivityIndicator colo="white" size={25} />
                        ) : (
                            <Text
                                style={[
                                    AuthStyle.buttonText,
                                    {color: Constants.Colors.WHITE},
                                ]}>
                                {translate('Save')}
                            </Text>
                        )}
                    </TouchableOpacity>
                ) : (
                    <View style={Repeat5KStyles.buttonsWrapper}>
                        <View
                            style={[
                                ConnectUserTypeStyles.buttons,
                                Repeat5KStyles.buttons,
                            ]}>
                            <TouchableOpacity
                                style={[
                                    AuthStyle.introButton,
                                    {
                                        backgroundColor:
                                            Constants.Colors.TRANSPARENT,
                                    },
                                ]}
                                activeOpacity={0.7}
                                onPress={() => goBack()}>
                                <Text
                                    style={[
                                        AuthStyle.buttonText,
                                        {color: Constants.Colors.WHITE},
                                    ]}>
                                    {translate('Back')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={AuthStyle.introButton}
                                activeOpacity={0.7}
                                onPress={() => this.TimeStore()}
                                // onPress={() => navigate('Distance')}
                            >
                                <Text
                                    style={[
                                        AuthStyle.buttonText,
                                        {color: Constants.Colors.WHITE},
                                    ]}>
                                    {translate('Next')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

UserPersonalBest.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    route: shape({params: shape({isEditMode: bool})}).isRequired,
    t: func.isRequired,
}

// export default withTranslation()(UserPersonalBest);

const mapStateToProps = ({auth: {email}}) => ({
    email,
})

const mapDispatchToProps = {
    addTime: (params) => setTime(params),
    // loginSuccess: actions.loginSuccess,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(UserPersonalBest))
