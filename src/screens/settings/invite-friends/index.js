import React from 'react'
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    Text,
    Linking,
} from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import {func, shape, string} from 'prop-types'
import {withTranslation} from 'react-i18next'
import {
    CommonStyles,
    AuthStyle,
    HomeStyles,
    InviteFriendsStyles,
    AddMemberStyles,
} from '../../../styles'
import {InviteOptionPopup} from '../../../components'
import Constants from '../../../constants'
import {Platform} from 'react-native'
import API from '../../../constants/baseApi'
import Axios from 'axios'
import {getAuthToken} from '../../../helpers/auth'
import {ActivityIndicator} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import Colors from '../../../constants/colors'

class InviteFriends extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            runners: [],
            isLoading: false,
            filterRunners: [],
        }
    }

    getRunners = async () => {
        this.setState({isLoading: true})
        const url = API.RUNNERS_NEAR_ME
        const token = await getAuthToken()
        const config = {
            params: {
                token,
            },
        }
        try {
            const res = await Axios.get(url, config)
            if (res?.data?.status) {
                this.setState({
                    runners: res?.data?.data?.result,
                    isLoading: false,
                })
            } else {
                this.setState({isLoading: false})
            }
        } catch (error) {
            this.setState({isLoading: false})
            console.log('ERROR RUNNERS NEAR ME: ', error)
        }
    }

    getFilterRuners = async ({
        connect,
        gender,
        selectedLevel,
        distance,
        location: {latitude, longitude},
        isEnabled,
    }) => {
        console.log('============================')
        console.log('RUNNER FILTERS')
        console.log('============================')

        this.setState({isLoading: true})
        const url = API.FILTER_RUNNERS
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
            params: {
                token,
            },
            data: {
                runnres_type: connect || 'train',
                gender,
                level: selectedLevel,
                distance,
                latitude,
                longitude,
                radius: isEnabled ? '200' : '500',
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log(res)
            if (res?.data?.status) {
                this.setState({
                    filterRunners: res?.data?.data?.result || [],
                    isLoading: false,
                })
            } else {
                this.setState({isLoading: false})
            }
        } catch (error) {
            console.log('ERROR FILTER EVENTS', error)
            this.setState({isLoading: false})
        }
    }

    onStrava = () => {
        const {
            navigation: {navigate},
            source,
        } = this.props

        this.setState({visible: false}, () => {
            navigate('StravaUsers', {
                hasCheckBox: true,
                routeName: source === 'home' ? 'Dashboard' : null,
                routePayload: source === 'home' ? {showRunners: true} : {},
            })
        })
    }

    componentDidMount() {
        const {filter} = this.props
        if (this.props.filter?.data) {
            this.getFilterRuners(this.props.filter?.runnersFilters)
            this.getRunners()
        } else {
            this.getRunners()
        }

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.filter?.data) {
                this.getFilterRuners(this.props.filter?.runnersFilters)
                this.getRunners()
            } else {
                this.getRunners()
            }
        })
    }

    renderItem = ({item}) => {
        const image = item?.image
            ? item?.image === 'N/A'
                ? Constants.Images.tabBarProfile
                : {uri: item?.image}
            : Constants.Images.tabBarProfile

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    this.props.navigation.navigate('UserProfile', {
                        id: item.user_id,
                        data: item,
                    })
                }}
                style={AddMemberStyles.container}>
                <View style={[AddMemberStyles.userWrapper, {maxWidth: '60%'}]}>
                    <View
                        style={{
                            backgroundColor: Constants.Colors.LIGHT_RED,
                            borderRadius: 10,
                        }}>
                        <Image
                            source={image}
                            style={AddMemberStyles.userImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <Text style={AddMemberStyles.username}>
                            {item.full_name}
                        </Text>
                        <View>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={AddMemberStyles.location}>
                                {item?.address}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    whatsAppShare = async () => {
        const canOpen = await Linking.canOpenURL(`whatsapp://send?text=yo`)
        if (canOpen) {
            await Linking.openURL(`whatsapp://send?text=yo`)
        } else {
            if (Platform.OS === 'ios') {
                await Linking.openURL(
                    'https://apps.apple.com/in/app/whatsapp-messenger/id310633997'
                )
            } else {
                await Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.whatsapp'
                )
            }
        }
    }

    render() {
        const {params, filter} = this.props

        const {visible, isLoading, runners, filterRunners, error} = this.state
        const {source, t: translate} = this.props
        const Component = source === 'home' ? View : ScrollView

        return (
            <View style={HomeStyles.container}>
                {params?.isMapView ? (
                    <Map
                        style={MapViewStyles.map}
                        onMarkerPress={this.onMarkerPress}
                        onEventPress={this.onEventPress}
                    />
                ) : (
                    <>
                        {isLoading ? (
                            <ActivityIndicator
                                size="small"
                                color={Colors.WHITE}
                            />
                        ) : error ? (
                            <View style={{alignItems: 'center'}}>
                                <Text style={{color: Constants.Colors.WHITE}}>
                                    {msg}
                                </Text>
                            </View>
                        ) : runners?.length ? (
                            <FlatList
                                data={
                                    filter?.runnersFilters && filter?.data
                                        ? filterRunners
                                        : runners
                                }
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => `${index}`}
                                ListEmptyComponent={() => {
                                    return (
                                        <>
                                            <View
                                                style={{alignItems: 'center'}}>
                                                <Text
                                                    style={{
                                                        color: Colors.WHITE,
                                                    }}>
                                                    Don't have any runners near
                                                    you
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginBottom:
                                                        Platform.OS === 'ios'
                                                            ? 100
                                                            : 70,
                                                }}>
                                                <Image
                                                    resizeMode="contain"
                                                    style={[
                                                        InviteFriendsStyles.runners,
                                                        source === 'home' &&
                                                            InviteFriendsStyles.homeRunners,
                                                    ]}
                                                    source={
                                                        Constants.Images.runners
                                                    }
                                                />

                                                <Text
                                                    style={
                                                        InviteFriendsStyles.description
                                                    }>
                                                    {translate(
                                                        'settings.InviteFriendsDescription'
                                                    )}
                                                </Text>
                                                <View
                                                    style={
                                                        InviteFriendsStyles.row
                                                    }>
                                                    <Text
                                                        style={
                                                            InviteFriendsStyles.code
                                                        }>
                                                        {'ALLBLAZING123456'}
                                                    </Text>
                                                    <TouchableOpacity
                                                        activeOpacity={0.7}
                                                        onPress={() =>
                                                            Clipboard.setString(
                                                                'ALLBLAZING123456'
                                                            )
                                                        }>
                                                        <Image
                                                            resizeMode="contain"
                                                            style={
                                                                InviteFriendsStyles.copy
                                                            }
                                                            source={
                                                                Constants.Images
                                                                    .copy
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <TouchableOpacity
                                                    activeOpacity={0.7}
                                                    style={[
                                                        InviteFriendsStyles.button,
                                                        InviteFriendsStyles.inviteBtn,
                                                        source === 'home' &&
                                                            InviteFriendsStyles.homeInviteBtn,
                                                    ]}
                                                    onPress={() =>
                                                        this.setState({
                                                            visible: true,
                                                        })
                                                    }>
                                                    <Text
                                                        style={[
                                                            AuthStyle.buttonText,
                                                            {
                                                                color:
                                                                    Constants
                                                                        .Colors
                                                                        .WHITE,
                                                            },
                                                        ]}>
                                                        {translate(
                                                            'settings.Invite Friends'
                                                        )}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )
                                }}
                            />
                        ) : (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom:
                                        Platform.OS === 'ios' ? 100 : 70,
                                }}>
                                <Image
                                    resizeMode="contain"
                                    style={[
                                        InviteFriendsStyles.runners,
                                        source === 'home' &&
                                            InviteFriendsStyles.homeRunners,
                                    ]}
                                    source={Constants.Images.runners}
                                />

                                <Text style={InviteFriendsStyles.description}>
                                    {translate(
                                        'settings.InviteFriendsDescription'
                                    )}
                                </Text>
                                <View style={InviteFriendsStyles.row}>
                                    <Text style={InviteFriendsStyles.code}>
                                        {'ALLBLAZING123456'}
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            Clipboard.setString(
                                                'ALLBLAZING123456'
                                            )
                                        }>
                                        <Image
                                            resizeMode="contain"
                                            style={InviteFriendsStyles.copy}
                                            source={Constants.Images.copy}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        InviteFriendsStyles.button,
                                        InviteFriendsStyles.inviteBtn,
                                        source === 'home' &&
                                            InviteFriendsStyles.homeInviteBtn,
                                    ]}
                                    onPress={() =>
                                        this.setState({visible: true})
                                    }>
                                    <Text
                                        style={[
                                            AuthStyle.buttonText,
                                            {color: Constants.Colors.WHITE},
                                        ]}>
                                        {translate('settings.Invite Friends')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={HomeStyles.spacing} />
                    </>
                )}
                {visible && (
                    <InviteOptionPopup
                        onFacebook={() => this.setState({visible: false})}
                        // onStrava={this.onStrava}
                        onWhatsApp={() => {
                            this.whatsAppShare()
                            this.setState({visible: false})
                        }}
                        onClose={() => this.setState({visible: false})}
                    />
                )}
                {params?.isMapView && visible && this.renderEventPopup()}
            </View>
        )
    }
}

InviteFriends.propTypes = {
    navigation: shape({
        navigate: func.isRequired,
        setParams: func.isRequired,
    }).isRequired,
    source: string,
    t: func.isRequired,
}

InviteFriends.defaultProps = {source: null}

export default withTranslation()(InviteFriends)
