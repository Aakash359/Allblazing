import React, {Component} from 'react'
import {
    Platform,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native'
import {bool, func, shape} from 'prop-types'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Constants from '../../constants'
import {AgePicker, StepBar} from '../../components'
import {AuthStyle, CommonStyles, UsernameStyle} from '../../styles'
import * as actions from '../../actions/user-action-types'
import {getAuthToken, setUserAge} from '../../helpers/auth'
import {setAge} from '../../reducers/baseServices/profile'
import API from '../../constants/baseApi'
import axios from 'axios'
import {ActivityIndicator} from 'react-native'
AntIcon.loadFont()

class Userage extends Component {
    constructor() {
        super()
        this.state = {
            age: 0,
            visible: false,
            Loading: false,
        }
    }
    componentDidMount() {
        const age = this.props.route?.params?.age ?? 0
        console.log('age==>', age)
        this.setState({age: age})
    }
    AgeStore = () => {
        if (this.state.age === 0) {
            Alert.alert(
                '',
                'Please select age',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel pressed'),
                        style: 'Cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('ok Pressed'),
                    },
                ],
                {Cancelable: false}
            )
        } else {
            console.log('===>', this.state.age)
            setUserAge(this.state.age.toString())
            this.props.navigation.navigate('ConnectUserType')
        }
    }
    onSave = async () => {
        const {addAge} = this.props
        const {
            navigation: {navigate},
        } = this.props
        const {age} = this.state

        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            Loading: true,
        })

        if (this.state.age === '') {
            Alert.alert('', 'Please select your age', '')
        } else {
            axios
                .post(
                    API.UPDATE_PROFILE,
                    {
                        age: age,
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
                        addAge(age)
                        console.log('age:==>', age)
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

    onAgeChange = (age) => {
        this.setState({
            age,
            visible: false,
        })
    }

    onVerify = () => {
        const {
            navigation: {goBack},
        } = this.props

        goBack()
    }

    render() {
        const {age, visible} = this.state
        const {
            navigation: {goBack, navigate},
            route: {params},
            t: translate,
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
                    <View style={UsernameStyle.wrapper}>
                        {!params?.isEditMode && (
                            <StepBar count={5} selected={[0, 1]} />
                        )}
                        <View style={UsernameStyle.inputWrapper}>
                            {!params?.isEditMode && (
                                <Text style={UsernameStyle.input}>
                                    {translate('How old are you?')}
                                </Text>
                            )}
                            <TouchableOpacity
                                activeOpacity={1}
                                style={UsernameStyle.ageButton}
                                onPress={() => this.setState({visible: true})}>
                                <Text
                                    style={
                                        age
                                            ? UsernameStyle.age
                                            : UsernameStyle.ageBlur
                                    }>
                                    {age || translate('Age')}
                                </Text>
                                <AntIcon
                                    name="down"
                                    size={25}
                                    color="#5EC2CA"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text>
                            {translate('Name:')}
                            {this.props.navigation.name}
                        </Text>
                    </View>
                </ScrollView>
                {params?.isEditMode ? (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[AuthStyle.saveBtn, UsernameStyle.saveBtn]}
                        onPress={() => this.onSave()}>
                        {this.state.Loading ? (
                            <ActivityIndicator color="white" size={25} />
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
                    <View style={UsernameStyle.buttonsWrapper}>
                        <View style={UsernameStyle.buttons}>
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
                                // onPress={() => navigate('ConnectUserType')}
                                onPress={() => this.AgeStore()}>
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
                {visible && (
                    <AgePicker
                        selectedValue={age}
                        onConfirm={this.onAgeChange}
                        onClose={() => this.setState({visible: false})}
                    />
                )}
            </View>
        )
    }
}

Userage.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({auth: {email}}) => ({
    email,
})

const mapDispatchToProps = {
    addAge: (params) => setAge(params),
    // loginSuccess: actions.loginSuccess,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(Userage))
