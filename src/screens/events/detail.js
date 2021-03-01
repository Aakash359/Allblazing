import React from 'react'
import {
    ScrollView,
    FlatList,
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native'
import {bool, func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import {
    CommonStyles,
    InviteFriendsStyles,
    EventDetailStyles,
} from '../../styles'
import Constants from '../../constants'
import {InvitedUser, UserImages} from '../../components'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import Axios from 'axios'
import {ActivityIndicator} from 'react-native'
import moment from 'moment'
import {connect} from 'react-redux'

class SingleEventDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            eventDetails: {},
            isLoading: false,
            user: {},
            Category: [],
        }
    }

    enviteFriend = () => {
        const {eventDetails: event_id} = this.state

        const payload = {
            event_id,
        }

        navigate('StravaUsers', payload)
    }

    renderItem = () => <InvitedUser onPress={this.onEventPress} />

    getUserDetails = async (id) => {
        console.log('userid==>', id)
        const token = await getAuthToken()
        console.log('====>', token)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        Axios.post(
            API.PROFILE_DETAILS,
            {
                user_id: id,
            },
            config
        )
            .then((response) => {
                console.log('response==>', response)
                if (response.data.data.result) {
                    console.log('===>details', response.data.data.result)
                    this.setState({user: response?.data?.data?.result})
                }
            })
            .catch((err) => {
                console.log('err==>', err)
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    getEventDetails = async () => {
        this.setState({isLoading: true})
        const {eventId} = this.props.route.params
        const url = `${API.EVENT}/${eventId}`
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log('EVENT DETAILS', res)
            if (res?.data?.status) {
                this.setState(
                    {
                        eventDetails: res?.data?.data?.result,
                    },
                    () => {
                        this.getUserDetails(res?.data?.data?.result?.user_id)
                    }
                )
            }
        } catch (error) {
            this.setState({isLoading: false})
            console.log('ERROR EVENT DETAILS', error)
        }
    }

    getEventCategory = async () => {
        const url = API.EVENT_CATEGORY
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            if (res?.data?.status) {
                this.setState({Category: res?.data?.data?.result})
            }
        } catch (error) {
            console.log('ERROR EVENT CATEGORY', error)
        }
    }
    componentDidMount() {
        this.getEventCategory()
        this.subscribe = this.props.navigation.addListener('focus', () => {
            this.getEventDetails()
        })
    }

    render() {
        const {
            route: {params},
            t: translate,
            user_id,
        } = this.props

        const {eventDetails, isLoading, user, Category} = this.state
        const userImage = user?.image
            ? user?.image === 'N/A'
                ? Constants.Images.tabBarProfile
                : {uri: user?.image}
            : Constants.Images.tabBarProfile

        const eventImage = eventDetails?.image
            ? eventDetails?.image === 'N/A'
                ? Constants.Images.tabBarProfile
                : {uri: eventDetails?.image}
            : Constants.Images.tabBarProfile

        const eventCateogry = Category.find(
            (i) => i?.id === eventDetails?.event_category_id
        )?.name

        const eventTime = moment(
            new Date(parseInt(eventDetails?.time, 10))
        ).format('LT')
        const eventDate = moment(
            new Date(parseInt(eventDetails?.date, 10))
        ).format('DD MMM YYYY')

        const isMyEvent = eventDetails?.user_id === user_id

        console.log('IS MY EVENT', isMyEvent)

        return (
            <View style={[CommonStyles.container, EventDetailStyles.container]}>
                {isLoading ? (
                    <ActivityIndicator
                        size="small"
                        color={Constants.Colors.WHITE}
                    />
                ) : (
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>
                        <Image
                            style={EventDetailStyles.headerImage}
                            source={{
                                uri:
                                    'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
                            }}
                        />
                        <View style={EventDetailStyles.userContainer}>
                            <Image
                                resizeMode="cover"
                                source={userImage}
                                style={InviteFriendsStyles.userImage}
                            />
                            <View style={EventDetailStyles.userInformation}>
                                <Text style={EventDetailStyles.username}>
                                    {user?.full_name}
                                </Text>
                                <Text style={EventDetailStyles.subtitle}>
                                    {eventDetails?.event_type === 'Individual'
                                        ? translate('events.IndividualEvent')
                                        : translate('events.GroupEvent')}
                                </Text>
                            </View>
                        </View>
                        <View style={EventDetailStyles.divider} />
                        <View style={EventDetailStyles.row}>
                            <Image
                                resizeMode="contain"
                                source={Constants.Images.live}
                                style={EventDetailStyles.live}
                            />
                            <View style={[EventDetailStyles.row]}>
                                <Text
                                    style={[
                                        EventDetailStyles.eventType,
                                        EventDetailStyles.marginLeft,
                                    ]}>
                                    {translate(`events.${eventCateogry}`)}
                                </Text>
                                <Text
                                    style={[
                                        EventDetailStyles.subtitle,
                                        EventDetailStyles.marginLeft,
                                    ]}>
                                    {''}
                                </Text>
                            </View>
                        </View>
                        <View style={EventDetailStyles.row}>
                            <Text style={EventDetailStyles.eventTitle}>
                                Emily Vs Maaike, 1km Race
                            </Text>
                        </View>
                        <View
                            style={[
                                EventDetailStyles.row,
                                EventDetailStyles.margin,
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={Constants.Images.mapPin}
                                style={EventDetailStyles.calendar}
                            />
                            <Text
                                style={[
                                    EventDetailStyles.subtitle,
                                    EventDetailStyles.marginLeft,
                                ]}>
                                {`${eventDetails?.event_address_one} ${
                                    eventDetails?.event_address_two
                                        ? `, ${eventDetails?.event_address_two}`
                                        : ''
                                }`}
                            </Text>
                        </View>
                        <View
                            style={[
                                EventDetailStyles.row,
                                EventDetailStyles.margin,
                            ]}>
                            <Image
                                resizeMode="contain"
                                source={Constants.Images.calendar}
                                style={EventDetailStyles.calendar}
                            />
                            <Text
                                style={[
                                    EventDetailStyles.subtitle,
                                    EventDetailStyles.marginLeft,
                                ]}>
                                {`${eventTime}, ${eventDate}`}
                            </Text>
                        </View>
                        <View style={EventDetailStyles.divider} />
                        <Text style={EventDetailStyles.header}>
                            {translate('events.Description')}
                        </Text>
                        <Text style={EventDetailStyles.eventDescription}>
                            {eventDetails?.description}
                        </Text>
                        <View style={EventDetailStyles.divider} />
                        {eventDetails?.watchers && (
                            <>
                                <View style={[EventDetailStyles.members]}>
                                    <UserImages
                                        style={EventDetailStyles.memberImages}
                                        users={[1, 2, 3, 4, 5]}
                                    />
                                    <Text style={EventDetailStyles.subtitle}>
                                        {translate(
                                            'events.Members are watching'
                                        )}
                                    </Text>
                                </View>
                                <View style={EventDetailStyles.divider} />
                            </>
                        )}
                        {eventDetails?.requested && (
                            <>
                                <Text style={EventDetailStyles.header}>
                                    {translate('events.invitation')}
                                </Text>
                                <Text
                                    style={EventDetailStyles.eventDescription}>
                                    Kelly Norman sent you an invitation to
                                    record live stream
                                </Text>
                                <View
                                    style={[
                                        EventDetailStyles.row,
                                        EventDetailStyles.buttons,
                                        EventDetailStyles.margin,
                                    ]}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={[
                                            EventDetailStyles.button,
                                            EventDetailStyles.acceptRejectBtn,
                                        ]}>
                                        <Text
                                            style={
                                                EventDetailStyles.buttonText
                                            }>
                                            {translate('events.Reject')}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={[
                                            EventDetailStyles.button,
                                            EventDetailStyles.acceptRejectBtn,
                                        ]}>
                                        <Text
                                            style={
                                                EventDetailStyles.buttonText
                                            }>
                                            {translate('events.Accept')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={EventDetailStyles.divider} />
                            </>
                        )}
                        {!isMyEvent && eventDetails?.join ? (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[
                                    EventDetailStyles.button,
                                    EventDetailStyles.inviteBtn,
                                ]}
                                onPress={this.onPress}>
                                <Text style={EventDetailStyles.buttonText}>
                                    {translate('events.Join')}
                                    {/* {isMyEvent
                                        ? translate('events.invite')
                                        : translate('events.Join')} */}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            isMyEvent && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        EventDetailStyles.button,
                                        EventDetailStyles.inviteBtn,
                                    ]}
                                    onPress={this.onPress}>
                                    <Text style={EventDetailStyles.buttonText}>
                                        {translate('events.invite')}
                                        {/* {isMyEvent
                                            ? translate('events.invite')
                                            : translate('events.Join')} */}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                        {params?.isInviteSent && (
                            <View style={EventDetailStyles.margin}>
                                <FlatList
                                    data={[1]}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => `${index}`}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={[
                                        EventDetailStyles.button,
                                        EventDetailStyles.margin,
                                        EventDetailStyles.inviteBtn,
                                    ]}>
                                    <Text style={EventDetailStyles.buttonText}>
                                        {translate('events.Withdraw Request')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </ScrollView>
                )}
            </View>
        )
    }
}

SingleEventDetail.propTypes = {
    navigation: shape({
        navigate: func,
        setParams: func,
    }).isRequired,
    route: shape({params: shape({isMapView: bool})}).isRequired,
    t: func.isRequired,
}

const mapStatesToProps = ({auth: {user_id}}) => {
    return {
        user_id,
    }
}

export default connect(mapStatesToProps)(withTranslation()(SingleEventDetail))
