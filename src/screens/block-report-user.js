import React from 'react'
import {
    Platform,
    TextInput,
    ActivityIndicator,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {bool, func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../constants'
import {
    CommonStyles,
    BlockUserStyles,
    AuthStyle,
    ForgotPassStyles,
} from '../styles'
import {blockReportReasons} from '../data'
import Axios from 'axios'
import API from '../constants/baseApi'
import {Alert} from 'react-native'
import {getAuthToken} from '../helpers/auth'

class BlockUser extends React.Component {
    descriptionRef = React.createRef()
    scrollViewRef = React.createRef()

    constructor(props) {
        super(props)

        this.state = {
            description: '',
            reason: null,
            isLoading: false,
        }
    }
    OnBlock = async () => {
        const {
            navigation: {navigate},
            route: {params},
        } = this.props
        const id = this.props.route.params.id
        console.log('userid===>', id)
        this.setState({
            isLoading: true,
        })

        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        console.log('Token===>', config)
        Axios.post(
            API.USER_BLOCK,
            {
                user_id: id,
                type: 'blocked',
                block_type: 'Testing',
            },
            config
        )
            .then((response) => {
                console.log('token ====', response.data)
                if (response?.data?.code === 401) {
                    Alert.alert('', response?.data?.message ?? '')
                }
                if (response?.data?.code === 200) {
                    Alert.alert(
                        '',
                        response?.data?.message ?? '',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'Cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => navigate('MyProfile'),
                            },
                        ],
                        {Cancelable: false}
                    )

                    // navigate('MyProfile');
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    OnGroupBlock = async () => null

    OnReport = async () => {
        const {
            navigation: {navigate},
            route: {params},
        } = this.props
        const id = this.props.route.params.id
        console.log('====>', id)
        this.setState({
            isLoading: true,
        })

        const reason =
            this.state.reason === 'Other'
                ? this.state.description
                : this.state.reason
        if (!reason) {
            this.setState({
                isLoading: false,
            })
            return Alert.alert('', 'Please tell us the reason.')
        }
        console.log('REPORT REASON', this.state.reason)
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        Axios.post(
            API.USER_REPORT,
            {
                user_id: id,
                type: 'report',
                report_type: reason,
            },
            config
        )
            .then((response) => {
                console.log('response ====', response.data)
                if (!response?.data?.status) {
                    return Alert.alert('', response?.data?.message)
                }
                if (response?.data?.code === 401) {
                    Alert.alert('', response?.data?.message ?? '')
                }
                if (response?.data?.code === 200) {
                    Alert.alert(
                        '',
                        response?.data?.message ?? '',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'Cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => navigate('MyProfile'),
                            },
                        ],
                        {Cancelable: false}
                    )

                    // navigate('MyProfile');
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    OnGroupReport = async () => {
        const {
            navigation: {navigate},
            route: {params},
        } = this.props
        const id = this.props.route.params.id
        console.log('====>', id)
        this.setState({
            isLoading: true,
        })

        const reason =
            this.state.reason === 'Other'
                ? this.state.description
                : this.state.reason
        if (!reason) {
            this.setState({
                isLoading: false,
            })
            return Alert.alert('', 'Please tell us the reason.')
        }
        console.log('REPORT REASON', this.state.reason)
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        const url = `${API.REPORT_GROUP}/${id}`
        console.log(url)
        Axios.post(
            url,
            {
                // user_id: id,
                type: 'report',
                report_type: reason,
            },
            config
        )
            .then((response) => {
                console.log('response ====', response.data)
                if (!response?.data?.status) {
                    return Alert.alert('', response?.data?.message)
                }
                if (response?.data?.code === 401) {
                    Alert.alert('', response?.data?.message ?? '')
                }
                if (response?.data?.code === 200) {
                    Alert.alert(
                        '',
                        response?.data?.message ?? '',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'Cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => navigate('ChatsGroup'),
                            },
                        ],
                        {Cancelable: false}
                    )

                    // navigate('MyProfile');
                }
            })
            .catch((e) => {
                Alert.alert('Report Group', 'Something went wrong')
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    render() {
        const {reason, description} = this.state
        const {
            navigation: {goBack},
            route: {params},
            t: translate,
        } = this.props

        console.log('PARMAS', params)

        return (
            <View style={CommonStyles.container}>
                <KeyboardAwareScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={
                        Platform.OS === 'ios' ? 'on-drag' : 'none'
                    }
                    keyboardShouldPersistTaps="always">
                    <View
                        style={[
                            ForgotPassStyles.wrapper,
                            BlockUserStyles.container,
                        ]}>
                        <Text style={BlockUserStyles.title}>
                            {params?.isGroup
                                ? `${
                                      params?.isBlockPage
                                          ? translate(
                                                'actions.blockGroupBtnTitle'
                                            )
                                          : translate(
                                                'actions.reportGroupBtnTitle'
                                            )
                                  }`
                                : `${
                                      params?.isBlockPage
                                          ? translate('actions.blockBtnTitle')
                                          : translate('actions.reportBtnTitle')
                                  }`}
                        </Text>
                        <Text style={BlockUserStyles.subtitle}>
                            {params?.isGroup
                                ? params?.isBlockPage
                                    ? translate('actions.blockGroupBtnSubtitle')
                                    : translate(
                                          'actions.reportGroupBtnSubtitle'
                                      )
                                : params?.isBlockPage
                                ? translate('actions.blockBtnSubtitle')
                                : translate('actions.reportConfirmation')}
                        </Text>
                    </View>
                    {blockReportReasons.map((singleElement) => (
                        <TouchableOpacity
                            key={singleElement.value}
                            style={[
                                AuthStyle.loginTouchable,
                                AuthStyle.loginTouchableRow,
                                BlockUserStyles.button,
                                singleElement.value === 'Other' &&
                                    reason === 'Other' &&
                                    BlockUserStyles.otherBtn,
                            ]}
                            activeOpacity={0.7}
                            onPress={() =>
                                this.setState({reason: singleElement.value})
                            }>
                            <Text
                                style={[
                                    AuthStyle.buttonLanguageText,
                                    BlockUserStyles.buttonText,
                                    reason === singleElement.value
                                        ? AuthStyle.buttonActiveText
                                        : {},
                                ]}>
                                {translate(singleElement.label)}
                            </Text>
                            {reason === singleElement.value && (
                                <Image
                                    source={Constants.Images.check}
                                    resizeMode="contain"
                                    style={[
                                        AuthStyle.checkImg,
                                        BlockUserStyles.select,
                                    ]}
                                />
                            )}
                        </TouchableOpacity>
                    ))}
                    {reason === 'Other' && (
                        <View
                            style={[
                                CommonStyles.textAreaWrapper,
                                BlockUserStyles.textAreaWrapper,
                            ]}>
                            <TextInput
                                multiline
                                maxLength={450}
                                numberOfLines={20}
                                style={CommonStyles.textArea}
                                placeholder={translate(
                                    'Please describe here...'
                                )}
                                value={description}
                                onChangeText={(text) =>
                                    this.setState({description: text})
                                }
                                placeholderTextColor={
                                    Constants.Colors.TEXT_COLOR
                                }
                                underlineColorAndroid={
                                    Constants.Colors.TRANSPARENT
                                }
                            />
                        </View>
                    )}
                    <View style={BlockUserStyles.space} />
                </KeyboardAwareScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        AuthStyle.saveBtn,
                        reason == null && BlockUserStyles.saveBtnColor,
                        BlockUserStyles.saveBtn,
                    ]}
                    onPress={() => {
                        params?.isGroup
                            ? params?.isBlockPage
                                ? this.OnGroupBlock()
                                : this.OnGroupReport()
                            : params?.isBlockPage
                            ? this.OnBlock()
                            : this.OnReport()
                    }}
                    // onPress={this.OnSubmit}
                >
                    {this.state.isLoading ? (
                        <ActivityIndicator color="white" size={25} />
                    ) : (
                        <Text
                            style={[
                                AuthStyle.buttonLanguageText,
                                reason && AuthStyle.buttonActiveText,
                            ]}>
                            {translate('Submit')}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        )
    }
}

BlockUser.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    route: shape({params: shape({isEditMode: bool})}).isRequired,
    t: func.isRequired,
}

export default withTranslation()(BlockUser)
