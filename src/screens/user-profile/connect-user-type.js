import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native'
import {func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../../constants'
import {AuthStyle, CommonStyles, ConnectUserTypeStyles} from '../../styles'
import {StepBar} from '../../components'
import {setUserConnectType} from '../../helpers/auth'
import API from '../../constants/baseApi'
import Axios from 'axios'
import {getAuthToken} from '../../helpers/auth'

class ConnectUserType extends Component {
    constructor() {
        super()
        this.state = {type: null}
    }

    onTypeChange = (payload) => this.setState({type: payload})
    // eslint-disable-next-line consistent-return
    onPressNext = () => {
        const {
            navigation: {navigate},
        } = this.props
        const {type} = this.state

        if (type === 'race') {
            navigate('Distance')
        } else if (type === 'train') {
            navigate('UserPersonalBest')
        } else {
            return null
        }
    }

    ConnectTypeStore = () => {
        const {
            navigation: {navigate},
        } = this.props
        const {type, Train, Race} = this.state
        if (this.state.type === null) {
            Alert.alert('', 'Please select your connect runner types', '')
        } else {
            setUserConnectType(this.state.type)
            if (type === 'race') {
                this.props.navigation.navigate('Distance')
            } else if (type === 'train') {
                this.props.navigation.navigate('UserPersonalBest')
            } else {
                return null
            }
        }
    }

    render() {
        const {type, isLoading, Train, Race} = this.state
        const {
            navigation: {goBack},
            t: translate,
        } = this.props

        return (
            <View style={CommonStyles.container}>
                <ScrollView>
                    <View style={ConnectUserTypeStyles.wrapper}>
                        <StepBar count={5} selected={[0, 1, 2]} />
                        <View style={ConnectUserTypeStyles.inputWrapper}>
                            <Text style={ConnectUserTypeStyles.input}>
                                {translate('profile.ConnectTitle')}
                            </Text>

                            <TouchableOpacity
                                style={[
                                    AuthStyle.loginTouchable,
                                    AuthStyle.loginTouchableRow,
                                    {
                                        flex: 1,
                                    },
                                ]}
                                activeOpacity={0.7}
                                onPress={() => this.onTypeChange('train')}>
                                <Text style={AuthStyle.buttonText}></Text>
                                <View
                                    style={{
                                        flex: 0.5,
                                        alignItems: 'flex-end',
                                        marginLeft: '10%',
                                    }}>
                                    <Text
                                        style={[
                                            AuthStyle.buttonText,
                                            {
                                                color:
                                                    type === 'train'
                                                        ? Constants.Colors
                                                              .TEXT_COLOR_WHITE
                                                        : Constants.Colors
                                                              .TEXT_COLOR2,
                                            },
                                        ]}>
                                        {translate('Train')}
                                    </Text>
                                </View>
                                <View
                                    style={{flex: 0.5, alignItems: 'flex-end'}}>
                                    {type === 'train' ? (
                                        <Image
                                            source={Constants.Images.check}
                                            resizeMode="contain"
                                            style={AuthStyle.checkImg}
                                        />
                                    ) : (
                                        <Text style={AuthStyle.checkImg}>
                                            {}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    AuthStyle.loginTouchable,
                                    AuthStyle.loginTouchableRow,
                                ]}
                                activeOpacity={0.7}
                                onPress={() => this.onTypeChange('race')}>
                                <Text style={AuthStyle.buttonText}></Text>
                                <View
                                    style={{
                                        flex: 0.5,
                                        alignItems: 'flex-end',
                                        marginLeft: '10%',
                                    }}>
                                    <Text
                                        style={[
                                            AuthStyle.buttonText,
                                            {
                                                color:
                                                    type === 'race'
                                                        ? Constants.Colors
                                                              .TEXT_COLOR_WHITE
                                                        : Constants.Colors
                                                              .TEXT_COLOR2,
                                            },
                                        ]}>
                                        {translate('Race')}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 0.5,
                                        alignItems: 'flex-end',
                                    }}>
                                    {type === 'race' ? (
                                        <Image
                                            source={Constants.Images.check}
                                            resizeMode="contain"
                                            style={AuthStyle.checkImg}
                                        />
                                    ) : (
                                        <Text style={AuthStyle.checkImg}>
                                            {}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={ConnectUserTypeStyles.buttonsWrapper}>
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
                            // onPress={this.onPressNext}
                            onPress={() => this.ConnectTypeStore()}>
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
            </View>
        )
    }
}

ConnectUserType.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

export default withTranslation()(ConnectUserType)
