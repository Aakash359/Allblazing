import React from 'react'
import {View, FlatList} from 'react-native'
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

class Events extends React.Component {
    constructor(props) {
        super(props)

        this.state = {visible: false, location: {}}
    }

    onEventPress = () => {
        const {
            navigation: {navigate},
        } = this.props

        navigate('SingleEventDetail')
    }

    renderItem = () => <SingleEvent onPress={this.onEventPress} />

    onMarkerPress = () => {
        this.setState({visible: true})
    }

    renderEventPopup = () => (
        <View style={EventMapStyles.popover}>
            <SingleEvent onPress={this.onEventPress} />
        </View>
    )

    getGeoLocation = async (submit = false) => {
        console.log('GETTING LOCATION')

        Geolocation.getCurrentPosition(
            (position) => {
                console.log('POSTION', position)
                this.setState({location: position.coords}, () => {
                    console.log('Location', this.state.location)
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
            console.log('ISO LOCATION', permissionStatus)
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res) => {
                console.log('PERMISSIN ASK IOS', res)
            })
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
                console.log('LOCATION ACCESS')
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
                console.log('Location permission not granted!!!!')
            }
        }
    }

    getEvents = async () => {
        const token = await getAuthToken()
        const url = API.EVENT
        const config = {
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cucXV5dGVjaC5uZXRcL3J1bmZhc3Qtc2Z0cFwvUnVuRmFzdFwvcHVibGljXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjEzNDY0NTUwLCJleHAiOjE2NDUwMDA1NTAsIm5iZiI6MTYxMzQ2NDU1MCwianRpIjoiUHhDMUZVY0VuZWpOb2xnRiIsInN1YiI6MTQ3LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.Kgfx3uLYyhNRD4fyQBeMnXk9VzrRoOMTlh6_XdqIxRU`,
            },
            body: JSON.stringify({
                latitude,
                longitude,
                radius: '20',
            }),
        }
        const {
            location: {latitude, longitude},
        } = this.state
        const data = {
            latitude,
            longitude,
            radius: '20',
        }
        console.log('CONFIG EVENTS', config)

        try {
            const res = await Axios.get(url, config)
            console.log('EVENTS', res)
        } catch (error) {
            console.log('EVENTS ERROR', error)
        }
    }

    componentDidMount() {
        this.getLocation()
    }

    render() {
        const {params} = this.props
        const {visible} = this.state

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
                        <FlatList
                            data={[1, 2, 3, 4, 5]}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => `${index}`}
                        />
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
