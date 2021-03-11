import React from 'react'
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native'
import {func, shape} from 'prop-types'
import Constants from '../../constants'
import {
    HomeStyles,
    MyProfileStyles,
    MapViewStyles,
    HeaderStyles,
} from '../../styles'
import {HeaderSearchBar, SingleEvent} from '../../components'
import Invite from '../settings/invite-friends'
import Events from '../events'
import Map from '../events/map-view'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
import homeStyles from '../../styles/home-styles'
import Geolocation from '@react-native-community/geolocation'
import {connect} from 'react-redux'
import {getAuthToken} from '../../helpers/auth'
import API from '../../constants/baseApi'
import Axios from 'axios'
import {setProfileDetails} from '../../reducers/baseServices/profile'
import _ from 'lodash'

const optionList = ['Map', 'Events', 'Runners']
const markers = [
    {
        coordinate: {
            latitude: 30.7335,
            longitude: 76.7794,
        },
        image:
            'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
        title: '',
    },
]

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            keyword: '',
            option: 'Events',
            region: {
                latitude: 30.7333,
                latitudeDelta: 0.0922,
                longitude: 76.7794,
                longitudeDelta: 0.0421,
            },
            showEvents: true,
            events: [],
            eventFilters: null,
            runnerFilters: null,
        }
    }

    getPosition = Geolocation.watchPosition((position) => {
        this.setState({region: {...this.state.region, ...position.coords}})
    })

    getEvents = async () => {
        const token = await getAuthToken()
        const {
            region: {latitude, longitude},
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
        }
    }
    UserProfileDetails = async () => {
        const {user_id, addProfileDetail} = this.props
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            Loading: true,
        })
        Axios.post(
            API.PROFILE_DETAILS,
            {
                user_id: user_id,
            },
            config
        )
            .then((response) => {
                if (response.data.data.result) {
                    this.setState({list: response?.data?.data?.result})
                    addProfileDetail(response?.data?.data?.result)
                }
            })
            .finally(() => {
                this.setState({
                    Loading: false,
                })
            })
    }

    componentDidMount() {
        if (this.props.route.params?.type === 'Events') {
            this.setState({eventFilters: this.props.route.params})
        } else {
            this.setState({eventFilters: this.props.route.params})
        }
        this.getEvents()
        this.UserProfileDetails()
    }

    shouldComponentUpdate(newProps) {
        return true
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.getPosition)
    }

    renderCustomMarker = (marker) => {
        let image = Constants.Images.blueLocation

        if (marker.type === 'training') {
            image = Constants.Images.greenLocation
        }

        if (marker.type === 'coaching') {
            image = Constants.Images.yellowLocation
        }

        return (
            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={MapViewStyles.customMarkerContainer}>
                    <Image
                        resizeMode="contain"
                        style={MapViewStyles.cover}
                        source={image}
                    />
                    <View style={MapViewStyles.wrapper}>
                        <View
                            style={[
                                MapViewStyles.racing,
                                MapViewStyles[marker.type],
                            ]}>
                            <Image
                                resizeMode="contain"
                                style={MapViewStyles.icon}
                                source={Constants.Images[marker.type]}
                            />
                        </View>
                        {marker.type === 'training' && (
                            <View style={MapViewStyles.textWrapper}>
                                <Text style={MapViewStyles.text}>
                                    {'TRAINING'}
                                </Text>
                                <Image
                                    resizeMode="contain"
                                    style={MapViewStyles.lock}
                                    source={Constants.Images.lock}
                                />
                            </View>
                        )}
                        {marker.type === 'coaching' && (
                            <View style={MapViewStyles.textWrapper}>
                                <Text style={MapViewStyles.text}>
                                    {'Coaching'}
                                </Text>
                                <Text style={MapViewStyles.km}>{'(1 Km)'}</Text>
                            </View>
                        )}
                        {marker.type === 'racing' && (
                            <>
                                <View style={MapViewStyles.textWrapper}>
                                    <Text style={MapViewStyles.text}>
                                        {'RACING'}
                                    </Text>
                                    <Text style={MapViewStyles.km}>
                                        {'(1 mile)'}
                                    </Text>
                                </View>
                                <Image
                                    resizeMode="contain"
                                    style={MapViewStyles.live}
                                    source={Constants.Images.live}
                                />
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    displayOptions = (data) => {
        const {keyword, option} = this.state
        const {params} = this.props?.route
        if (data === 'Map') {
            return (
                <View style={{flex: 1}}>
                    <MapView
                        style={[StyleSheet.absoluteFillObject]}
                        provider={PROVIDER_GOOGLE}
                        region={this.state.region}
                        customMapStyle={Constants.MapStyle}
                        showsUserLocation>
                        {markers.map((marker, index) => (
                            <Marker
                                key={`marker-${index}`}
                                coordinate={this.state.region}
                                title={marker.title}
                                description={marker.description}
                                // onPress={onMarkerPress}
                            >
                                <View style={MapViewStyles.outerCircle}>
                                    <Image
                                        source={{uri: this.props.image}}
                                        style={MapViewStyles.image}
                                    />
                                </View>
                            </Marker>
                        ))}
                        {this.state.showEvents &&
                            this.state.events.map((marker, index) => {
                                if (marker?.latitude_first) {
                                    return (
                                        <Marker
                                            key={`custom-marker-${index}`}
                                            coordinate={{
                                                latitude:
                                                    marker?.latitude_first,
                                                longitude:
                                                    marker?.longitude_first,
                                            }}
                                            // onPress={onEventPress}
                                        >
                                            {this.renderCustomMarker(marker)}
                                        </Marker>
                                    )
                                }
                            })}
                    </MapView>

                    <View style={{position: 'absolute'}}>
                        <HeaderSearchBar
                            keyword={keyword}
                            onChangeText={(value) =>
                                this.setState({keyword: value})
                            }
                        />

                        <FlatList
                            style={{maxHeight: 50}}
                            scrollEnabled={false}
                            contentContainerStyle={[
                                MyProfileStyles.sectionMainView,
                                {
                                    backgroundColor: 'rgba(100,100,100,0.4)',
                                },
                            ]}
                            data={optionList}
                            renderItem={this.renderItem}
                            keyExtractor={(id, index) => index.toString()}
                        />
                    </View>
                </View>
            )
        }
        if (data === 'Events') {
            return (
                <Events
                    params={true}
                    filter={params}
                    navigation={this.props.navigation}
                />
            )
        }
        if (data === 'Runners') {
            return <Invite navigation={this.props.navigation} filter={params} />
        }
    }
    renderCustomMarker = (marker) => {
        let image = Constants.Images.blueLocation

        if (marker.type === 'training') {
            image = Constants.Images.greenLocation
        }

        if (marker.type === 'coaching') {
            image = Constants.Images.yellowLocation
        }
    }

    renderItem = ({item}) => (
        <View
            style={{
                flexDirection: 'row',
                flex: 1,
                // backgroundColor: 'red',
            }}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    MyProfileStyles.sectionView2,
                    {
                        backgroundColor:
                            item === this.state.option
                                ? this.state.option === 'Map'
                                    ? Constants.Colors.TAB
                                    : Constants.Colors.TAB
                                : this.state.option === 'Map'
                                ? null
                                : Constants.Colors.TAB_BACK,
                        paddingHorizontal: item === 'Map' ? 45 : 35,
                    },
                ]}
                onPress={() => {
                    this.setState({option: item})
                }}>
                <Text
                    style={[
                        MyProfileStyles.section1,
                        {
                            color:
                                item === this.state.option
                                    ? Constants.Colors.WHITE
                                    : this.state.option === 'Map'
                                    ? Constants.Colors.LIGHT_BLACK
                                    : Constants.Colors.PRIVCYTEXT,
                        },
                    ]}>
                    {item}
                </Text>
            </TouchableOpacity>
        </View>
    )
    renderHeader = ({navigate, payload = {}, route, title}) => (
        <View style={HomeStyles.content}>
            <Text style={HomeStyles.heading}>{title}</Text>
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={Constants.BaseStyle.HALF_HIT_SLOP}
                onPress={() => navigate(route, payload)}>
                <Text style={HomeStyles.rightHeading}>{'View All'}</Text>
            </TouchableOpacity>
        </View>
    )

    render() {
        const {
            navigation,
            navigation: {navigate},
        } = this.props
        const {keyword, option} = this.state

        return (
            <View style={HomeStyles.container}>
                {this.state.option !== 'Map' && (
                    <HeaderSearchBar
                        keyword={keyword}
                        onChangeText={(value) =>
                            this.setState({keyword: value})
                        }
                    />
                )}
                {this.state.option !== 'Map' && (
                    <FlatList
                        style={{maxHeight: 50, flex: 1}}
                        scrollEnabled={false}
                        contentContainerStyle={[
                            MyProfileStyles.sectionMainView,
                            {},
                        ]}
                        data={optionList}
                        renderItem={this.renderItem}
                        keyExtractor={(id, index) => index.toString()}
                    />
                )}
                {this.displayOptions(option)}
                {/* <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.renderHeader({
            navigate,
            route: 'Events',
            title: 'Events',
          })}
          <SingleEvent onPress={() => navigate('SingleEventDetail')} />
          {this.renderHeader({
            navigate,
            payload: {hasCheckBox: true},
            route: 'Runners',
            title: 'Runners Near Me',
          })} */}
                {/* <FlatList
            data={[]}
            renderItem={({ item }) => <InviteFriend image={item} />}
            keyExtractor={(item, index) => `${index}`}
          /> */}
                {/* <Invite source="home" navigation={navigation} /> */}
                {/* </ScrollView> */}
                {this.state.option !== 'Map' && (
                    <TouchableOpacity
                        onPress={() => {
                            let params = this.props?.route?.params
                            navigation.navigate('Filter', {
                                type: this.state.option,
                                filter: {
                                    events: this.props?.route?.params
                                        ?.eventsFilters,

                                    runners: this.props?.route?.params
                                        ?.runnersFilters,

                                    data: params?.data,
                                },
                            })
                        }}
                        activeOpacity={0.7}
                        style={homeStyles.wrapperActionButton}>
                        <Image
                            resizeMode="contain"
                            style={HeaderStyles.filterIcon2}
                            source={Constants.Images.filter}
                        />
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

Home.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
}

const mapStateToProps = ({
    profile: {
        image,
        full_name,
        age,
        time,
        gender,
        motto_description,
        followingCount,
        followerCount,
        groupCount,
        postCount,
        level,
        address,
    },
    auth: {user_id},
}) => ({
    image,
    full_name,
    age,
    gender,
    level,
    time,
    motto_description,
    user_id,
    followingCount,
    followerCount,
    groupCount,
    postCount,
    address,
})
const mapDispatchToProps = {
    addProfileDetail: (params) => setProfileDetails(params),
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
