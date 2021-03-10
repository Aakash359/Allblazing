import React, {Component} from 'react'
import {
    Image,
    Platform,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Alert,
    ActivityIndicator,
} from 'react-native'
import {func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../../constants'
import {
    AuthStyle,
    DistanceStyles,
    CommonStyles,
    ConnectUserTypeStyles,
    Repeat5KStyles,
} from '../../styles'
import {StepBar, TimePicker} from '../../components'
import {distanceList} from '../../data'
import {setUserDistance} from '../../helpers/auth'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import axios from 'axios'

class Distance extends Component {
    constructor() {
        super()
        this.state = {
            hour: 1,
            minute: 1,
            second: 1,
            time: null,
            visible: false,
            Race: [],
            isLoading: true,
        }
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
                this.setState({Race, isLoading: false})
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

    DistanceStore = () => {
        if (this.state.time === null) {
            Alert.alert('', 'Please select distance to race', '')
        } else {
            setUserDistance(this.state.time.toString())
            this.props.navigation.navigate('Location')
        }
    }

    onTypeChange = (payload) => {
        this.setState({
            time: payload,
            visible: true,
        })
    }

    onValueChange = (value, type) => {
        this.setState({[type]: value})
    }

    onClose = () => {
        this.setState({
            hour: 1,
            minute: 1,
            second: 1,
            time: null,
            visible: false,
        })
    }

    onSelect = () => {
        this.setState({
            hour: 1,
            minute: 1,
            second: 1,
            visible: false,
        })
    }

    render() {
        const {
            hour,
            minute,
            second,
            time,
            visible,
            Race,
            isLoading,
        } = this.state
        const {
            navigation: {goBack, navigate},
            t: translate,
        } = this.props

        return (
            <View style={CommonStyles.container}>
                <ScrollView
                    ref={this.scrollViewRef}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={
                        Platform.OS === 'ios' ? 'on-drag' : 'none'
                    }
                    keyboardShouldPersistTaps="always">
                    <View style={ConnectUserTypeStyles.wrapper}>
                        <StepBar count={5} selected={[0, 1, 2, 3]} />
                        <View style={ConnectUserTypeStyles.inputWrapper}>
                            <Text style={ConnectUserTypeStyles.input}>
                                {translate('distance.title')}
                            </Text>
                            {isLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Constants.Colors.WHITE}
                                    style={{marginVertical: 30}}
                                />
                            ) : (
                                Race.map((t) => (
                                    <TouchableOpacity
                                        key={t.id}
                                        style={[
                                            ConnectUserTypeStyles.button,
                                            DistanceStyles.button,
                                        ]}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            this.onTypeChange(
                                                `${t.distance}${t.distance_type}`
                                            )
                                        }>
                                        <Text
                                            style={[
                                                ConnectUserTypeStyles.buttonText,
                                                DistanceStyles.buttonText,
                                                {
                                                    color:
                                                        time === t.value
                                                            ? Constants.Colors
                                                                  .TEXT_COLOR_WHITE
                                                            : Constants.Colors
                                                                  .TEXT_COLOR2,
                                                },
                                            ]}>
                                            {/* {translate(t.label)} */}
                                            {t.distance}
                                            {t.distance_type}
                                        </Text>
                                        {time ===
                                            `${t.distance}${t.distance_type}` && (
                                            <Image
                                                source={Constants.Images.check}
                                                resizeMode="contain"
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
                <View
                    style={[
                        Repeat5KStyles.buttonsWrapper,
                        DistanceStyles.buttonsWrapper,
                    ]}>
                    <View style={ConnectUserTypeStyles.buttons}>
                        <TouchableOpacity
                            style={[
                                AuthStyle.introButton,
                                {backgroundColor: Constants.Colors.TRANSPARENT},
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
                            onPress={() => this.DistanceStore()}
                            // onPress={() => navigate('Location')}
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
                {visible && (
                    <TimePicker
                        visible
                        value={this.state.time}
                        hour={hour}
                        minute={minute}
                        second={second}
                        onValueChange={this.onValueChange}
                        onPress={this.onSelect}
                        onClose={this.onClose}
                    />
                )}
            </View>
        )
    }
}

Distance.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

export default withTranslation()(Distance)
