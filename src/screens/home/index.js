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

const events = [
    {
        coordinate: {
            latitude: 30.7435,
            longitude: 76.7784,
        },
        title: '',
        type: 'racing',
    },
    {
        coordinate: {
            latitude: 30.721,
            longitude: 76.7784,
        },
        title: '',
        type: 'coaching',
    },
    {
        coordinate: {
            latitude: 30.7585,
            longitude: 76.7895,
        },
        title: '',
        type: 'training',
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
                showEvents: true,
            },
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
        if (data === 'Map') {
            return (
                <View style={{flex: 1}}>
                    <MapView
                        style={[StyleSheet.absoluteFillObject]}
                        provider={PROVIDER_GOOGLE}
                        region={this.state.region}
                        customMapStyle={Constants.MapStyle}>
                        {markers.map((marker, index) => (
                            <Marker
                                key={`marker-${index}`}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                                // onPress={onMarkerPress}
                            >
                                <View style={MapViewStyles.outerCircle}>
                                    <Image
                                        source={{uri: marker.image}}
                                        style={MapViewStyles.image}
                                    />
                                </View>
                            </Marker>
                        ))}
                        {this.state.showEvents &&
                            events.map((marker, index) => (
                                <Marker
                                    key={`custom-marker-${index}`}
                                    coordinate={marker.coordinate}
                                    // onPress={onEventPress}
                                >
                                    {this.renderCustomMarker(marker)}
                                </Marker>
                            ))}
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
            return <Events params={true} navigation={this.props.navigation} />
        }
        if (data === 'Runners') {
            return <Invite navigation={this.props.navigation} />
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
                        onPress={() => navigation.navigate('Filter')}
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

export default Home
