import React from 'react'
import {View, FlatList, Text} from 'react-native'
import {bool, func, shape} from 'prop-types'
import {HomeStyles, EventMapStyles, MapViewStyles} from '../../styles'
import {SingleEvent} from '../../components'
import Map from './map-view'
import API from '../../constants/baseApi'
import Geolocation from '@react-native-community/geolocation'
import {PermissionsAndroid} from 'react-native'
import Permissions, {PERMISSIONS, request} from 'react-native-permissions'
import {getAuthToken} from '../../helpers/auth'
import Axios from 'axios'
import {ActivityIndicator} from 'react-native'
import {Colors} from '../../constants'
import _ from 'lodash'
import {RefreshControl} from 'react-native'

class Events extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            location: {},
            events: [],
            filterEvents: [],
            isLoading: true,
            error: false,
            msg: '',
            refreshing: false,
        }
    }

    onEventPress = (eventId) => {
        const {
            navigation: {navigate},
        } = this.props

        navigate('SingleEventDetail', {eventId})
    }

    renderItem = ({item}) => (
        <SingleEvent
            onPress={() => this.onEventPress(item?.event_id)}
            event={item}
        />
    )

    onMarkerPress = () => {
        this.setState({visible: true})
    }

    renderEventPopup = () => (
        <View style={EventMapStyles.popover}>
            <SingleEvent onPress={this.onEventPress} />
        </View>
    )

    getGeoLocation = async (submit = false) => {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({location: position.coords}, () => {
                    this.getEvents()
                })
            },
            (e) => {
                console.log('POSITION ERROR', e.message)
            }
        )
    }

    getLocation = async (submit = false) => {
        if (Platform.OS === 'ios') {
            const permissionStatus = await Permissions.check(
                PERMISSIONS.IOS.LOCATION_ALWAYS
            )
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res) => {})
            Geolocation.requestAuthorization()
            this.getGeoLocation(submit)
        } else {
            let granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'AllBlazing',
                    message: 'AllBlazing access to your location ',
                }
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getGeoLocation(submit)
            } else {
                Alert.alert(
                    'AllBalzing',
                    'Please allow location to go ahead',
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                Linking.canOpenURL('app-settings:').then(
                                    (s) => {
                                        if (s) {
                                            return Linking.openURL(
                                                'app-settings:'
                                            )
                                        } else {
                                            Alert.alert(
                                                'AllBlazing',
                                                'Please open settings manually.'
                                            )
                                        }
                                    }
                                )
                            },
                        },
                    ],
                    {cancelable: false}
                )
            }
        }
    }

    getEvents = async () => {
        const token = await getAuthToken()
        const {
            location: {latitude, longitude},
        } = this.state
        const url = API.EVENT
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                latitude,
                longitude,
                radius: '20',
            }),
        }

        try {
            const res = await Axios.get(url, config)
            if (res?.data?.code == 200) {
                if (res?.data?.status) {
                    if (res?.data?.data?.result?.length) {
                        this.setState({
                            events: _.reverse(res?.data?.data?.result),
                            isLoading: false,
                            error: false,
                            refreshing: false,
                        })
                    }
                } else {
                    this.setState({
                        isLoading: false,
                        error: true,
                        msg: res?.data?.message,
                        refreshing: false,
                    })
                }
            }
        } catch (error) {
            this.setState({
                isLoading: false,
                error: true,
                msg: error?.message,
                refreshing: false,
            })
            console.log('ERROR EVENTS: ', error)
        }
    }

    componentDidMount() {
        const {filter} = this.props
        if (filter?.data) {
            this.getFilterEvents(filter?.eventsFilters)
            this.getLocation()
        } else {
            this.getLocation()
        }

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            if (this.props.filter?.data) {
                this.getFilterEvents(filter?.eventsFilters)
                this.getLocation()
            } else {
                this.getLocation()
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
    shouldComponentUpdate(newProps) {
        return true
    }

    onRefresh = () => {
        this.setState({refreshing: true})
        this.getLocation()
    }

    getFilterEvents = async ({
        connect,
        gender,
        selectedLevel,
        distance,
        location: {latitude, longitude},
        isEnabled,
    }) => {
        this.setState({isLoading: true})
        const url = API.FILTER_EVENTS
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                ContentType: 'application/json',
            },
            params: {
                token,
            },
            data: JSON.stringify({
                runners_type: connect,
                gender,
                level: selectedLevel,
                distance,
                latitude,
                longitude,
                radius: isEnabled ? '200' : '500',
            }),
        }
        try {
            const res = await Axios.get(url, config)
            if (res?.data?.status) {
                this.setState({
                    filterEvents: res?.data?.data?.result || [],
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

    render() {
        const {params, filter} = this.props
        const {visible, isLoading, events, error, msg, refreshing} = this.state
        // const {filter} = this?.props?.route?.params || {}
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
                                <Text style={{color: Colors.WHITE}}>{msg}</Text>
                            </View>
                        ) : (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        tintColor={Colors.WHITE}
                                        refreshing={refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                                data={
                                    filter?.eventsFilters && filter?.data
                                        ? this.state.filterEvents
                                        : this.state.events
                                }
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => `${index}`}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={{color: Colors.WHITE}}>
                                                Don't have any events near you
                                            </Text>
                                        </View>
                                    )
                                }}
                            />
                        )}
                        <View style={HomeStyles.spacing} />
                    </>
                )}
                {params?.isMapView && visible && this.renderEventPopup()}
            </View>
        )
    }
}

Events.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    route: shape({params: shape({isMapView: bool})}).isRequired,
}

export default Events
