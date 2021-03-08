import React from 'react'
import {View, FlatList, TouchableOpacity, Text} from 'react-native'
import {bool, func, shape} from 'prop-types'
import {HomeStyles} from '../../styles'
import {ChatGroup} from '../../components'
import Constants from '../../constants'
import Axios from 'axios'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import Colors from '../../constants/colors'
import {ActivityIndicator} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'

export const GROUP_TYPES = {
    MY_GROUPS: 'MY_GROUPS',
    ALL_GROUPS: 'ALL_GROUPS',
    REQUESTED: 'REQUESTED',
}
class ChatsGroup extends React.Component {
    constructor() {
        super()
        this.state = {
            activeTab: '0',
            myGroups: [],
            allGroups: [],
            requestedGroups: {},
            threeRequest: {resecived: [], request: []},
            viewAll: {resceived: false, request: false},
            loader: {
                myGroups: {isLoading: true},
                allGroups: {isLoading: true},
                requestedGroups: {isLoading: true},
            },
        }
    }

    getMyGroups = async () => {
        this.setState({
            loader: {
                ...this.state.loader,
                myGroups: {...this.state.loader.myGroups, isLoading: true},
            },
        })
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            params: {
                type: 'my_group',
            },
        }
        Axios.get(API.GROUP_LISTING, config)
            .then((res) => {
                console.log('GROUP LISTING', res)
                this.setState({
                    myGroups: res?.data?.data?.result,
                    loader: {
                        ...this.state.loader,
                        myGroups: {
                            ...this.state.loader.myGroups,
                            isLoading: false,
                        },
                    },
                })
            })
            .catch((e) => {
                console.log('ERROR GROUP LISTING', e)
                this.setState({
                    loader: {
                        ...this.state.loader,
                        myGroups: {
                            ...this.state.loader.myGroups,
                            isLoading: false,
                        },
                    },
                })
            })
    }

    getAllGroups = async () => {
        this.setState({
            loader: {
                ...this.state.loader,
                allGroups: {...this.state.loader.allGroups, isLoading: true},
            },
        })
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            params: {
                type: 'active',
            },
        }
        Axios.get(API.GROUP_LISTING, config)
            .then((res) => {
                console.log('ALL GROUP LISTING', res)
                this.setState({
                    allGroups: res?.data?.data?.result,
                    loader: {
                        ...this.state.loader,
                        allGroups: {
                            ...this.state.loader.allGroups,
                            isLoading: false,
                        },
                    },
                })
            })
            .catch((e) => {
                console.log('ERROR ALL GROUP LISTING', e)
                this.setState({
                    loader: {
                        ...this.state.loader,
                        allGroups: {
                            ...this.state.loader.allGroups,
                            isLoading: false,
                        },
                    },
                })
            })
    }

    getThreeRequest = (requests) => {
        const {resceived, request} = requests
        let threeRecevied = resceived.slice(
            0,
            resceived?.length > 3 ? 3 : resceived?.length
        )
        let threeRequest = request.slice(
            0,
            request?.length > 3 ? 3 : request?.length
        )
        this.setState({
            threeRequest: {
                ...this.state.threeRequest,
                resceived: threeRecevied,
                request: threeRequest,
            },
        })
    }

    getReqGroups = async () => {
        this.setState({
            loader: {
                ...this.state.loader,
                requestedGroups: {
                    ...this.state.loader.requestedGroups,
                    isLoading: true,
                },
            },
        })
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        Axios.get(API.REQ_GROUP_LISTING, config)
            .then((res) => {
                console.log('REQ GROUP LISTING', res)
                this.setState(
                    {
                        requestedGroups: res?.data?.data,
                        
                        loader: {
                            ...this.state.loader,
                            requestedGroups: {
                                ...this.state.loader.requestedGroups,
                                isLoading: false,
                            },
                        },
                    },
                    () => {
                        this.getThreeRequest(res?.data?.data)
                    }
                )
            }
            )
            .catch((e) => {
                console.log('ERROR AREQLL GROUP LISTING', e)
                this.setState({
                    loader: {
                        ...this.state.loader,
                        requestedGroups: {
                            ...this.state.loader.requestedGroups,
                            isLoading: false,
                        },
                    },
                })
            })
    }

    getApiToExecu = (type) => {
        switch (type) {
            case '0':
                this.getMyGroups()
                break
            case '1':
                this.getAllGroups()
                break
            case '2':
                this.getReqGroups()
                break
            default:
                this.getMyGroups()
                break
        }
    }

    componentDidMount() {
        this.unSubscribe = this.props.navigation.addListener('focus', () => {
            this.getApiToExecu(this.state.activeTab)
        })
    }
    componentWillUnmount() {
        this.unSubscribe()
    }

    renderItem = ({item, requestType = false}) => {
        const {
            route: {params},
            navigation: {navigate},
        } = this.props
        const {activeTab} = this.state

        if (activeTab === '0') {
            return (
                <ChatGroup
                    hasCheckBox={params?.hasCheckBox}
                    hasTick={params?.hasTick}
                    navigation={navigate}
                    type={GROUP_TYPES.MY_GROUPS}
                    group={item}
                />
            )
        }
        if (activeTab === '1') {
            return this.state.loader.allGroups.isLoading ? (
                <View
                    style={{
                        flex: 1,
                        marginVertical: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size="small" color={Colors.WHITE} />
                </View>
            ) : (
                <ChatGroup
                    hasCheckBox={params?.hasCheckBox}
                    hasTick={params?.hasTick}
                    navigation={navigate}
                    type={GROUP_TYPES.ALL_GROUPS}
                    group={item}
                />
            )
        }

        return this.state.loader.requestedGroups.isLoading ? (
            <View
                style={{
                    flex: 1,
                    marginVertical: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size="small" color={Colors.WHITE} />
            </View>
        ) : (
            <ChatGroup
                hasCheckBox={params?.hasCheckBox}
                hasTick={params?.hasTick}
                navigation={navigate}
                type={GROUP_TYPES.REQUESTED}
                group={item}
                requestType={requestType}
            />
        )
    }

    onTabPress = (val) => {
        this.setState({activeTab: val})
        this.getApiToExecu(val)
    }

    getDataByGroupType = (type) => {
        const {myGroups, allGroups, requestedGroups} = this.state
        switch (type) {
            case '0':
                return myGroups
                break
            case '1':
                return allGroups
                break
            case '2':
                return requestedGroups
                break
            default:
                return myGroups
                break
        }
    }

    renderHeader = () => {
        const {activeTab} = this.state

        return (
            <View style={HomeStyles.chatHeaderContainer}>
                <View
                    style={[
                        HomeStyles.chatHeader,
                        {
                            borderBottomColor:
                                activeTab === '0'
                                    ? Constants.Colors.TEXT_COLOR_WHITE
                                    : Constants.Colors.TEXT_COLOR2,
                        },
                    ]}>
                    <TouchableOpacity onPress={() => this.onTabPress('0')}>
                        <Text
                            style={[
                                HomeStyles.chatText,
                                {
                                    color:
                                        activeTab === '0'
                                            ? Constants.Colors.TEXT_COLOR_WHITE
                                            : Constants.Colors.TEXT_COLOR2,
                                },
                            ]}>
                            {'My Groups'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        HomeStyles.chatHeader,
                        {
                            borderBottomColor:
                                activeTab === '1'
                                    ? Constants.Colors.TEXT_COLOR_WHITE
                                    : Constants.Colors.TEXT_COLOR2,
                        },
                    ]}>
                    <TouchableOpacity onPress={() => this.onTabPress('1')}>
                        <Text
                            style={[
                                HomeStyles.chatText,
                                {
                                    color:
                                        activeTab === '1'
                                            ? Constants.Colors.TEXT_COLOR_WHITE
                                            : Constants.Colors.TEXT_COLOR2,
                                },
                            ]}>
                            {'All Groups'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={[
                        HomeStyles.chatHeader,
                        {
                            borderBottomColor:
                                activeTab === '2'
                                    ? Constants.Colors.TEXT_COLOR_WHITE
                                    : Constants.Colors.TEXT_COLOR2,
                        },
                    ]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.onTabPress('2')}>
                        <Text
                            style={[
                                HomeStyles.chatText,
                                {
                                    color:
                                        activeTab === '2'
                                            ? Constants.Colors.TEXT_COLOR_WHITE
                                            : Constants.Colors.TEXT_COLOR2,
                                },
                            ]}>
                            {'Requested'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    ListEmptyComponent = () => {
        return (
            <View style={{flex: 1, alignItems: 'center', marginVertical: 10}}>
                <Text style={{color: Colors.TEXT_COLOR_WHITE}}>
                    No groups found
                </Text>
            </View>
        )
    }

    render() {
        const {
            navigation: {navigate},
        } = this.props
        const {
            viewAll,
            threeRequest,
            requestedGroups: {resceived, request},
        } = this.state

        return (
            <View style={HomeStyles.container}>
                {this.renderHeader({
                    navigate,
                    route: 'Events',
                    title: 'Events',
                })}
                {(this.state.loader.myGroups.isLoading &&
                    this.state.activeTab === '0') ||
                (this.state.loader.allGroups.isLoading &&
                    this.state.activeTab === '1') ||
                (this.state.loader.requestedGroups.isLoading &&
                    this.state.activeTab === '2') ? (
                    <View
                        style={{
                            flex: 1,
                            marginVertical: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size="small" color={Colors.WHITE} />
                    </View>
                ) : this.state.activeTab === '2' ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={1}>
                        <FlatList
                            data={
                                viewAll?.request
                                    ? this.getDataByGroupType(
                                          this.state.activeTab
                                      )?.request
                                    : threeRequest?.request
                            }
                            renderItem={({item}) => (
                                <this.renderItem
                                    item={item}
                                    requestType="send"
                                />
                            )}
                            keyExtractor={(item, index) => `${index}`}
                            ListEmptyComponent={this.ListEmptyComponent}
                            ListHeaderComponent={() => {
                                return (
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            margin: 10,
                                            flexDirection: 'row',
                                        }}>
                                        <Text style={{color: Colors.WHITE}}>
                                            Requested By Me
                                        </Text>
                                        {request?.length > 3 ? (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.setState({
                                                        viewAll: {
                                                            ...viewAll,
                                                            request: !viewAll.request,
                                                        },
                                                    })
                                                }>
                                                <Text
                                                    style={{
                                                        color:
                                                            Constants.Colors
                                                                .LIGHT_BLUE,
                                                    }}>
                                                    {viewAll?.request
                                                        ? 'View Some'
                                                        : 'View All'}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                )
                            }}
                        />
                        <FlatList
                            data={
                                viewAll?.resceived
                                    ? this.getDataByGroupType(
                                          this.state.activeTab
                                      )?.resceived
                                    : threeRequest?.resceived
                            }
                            renderItem={({item}) => (
                                <this.renderItem
                                    item={item}
                                    requestType="get"
                                />
                            )}
                            keyExtractor={(item, index) => `${index}`}
                            ListEmptyComponent={this.ListEmptyComponent}
                            ListHeaderComponent={() => {
                                return (
                                    <View
                                        style={{
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            margin: 10,
                                        }}>
                                        <Text style={{color: Colors.WHITE}}>
                                            Recevied By Me
                                        </Text>
                                        {resceived?.length > 3 ? (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.setState({
                                                        viewAll: {
                                                            ...viewAll,
                                                            resceived: !viewAll.resceived,
                                                        },
                                                    })
                                                }>
                                                <Text
                                                    style={{
                                                        color:
                                                            Constants.Colors
                                                                .LIGHT_BLUE,
                                                    }}>
                                                    {viewAll?.resceived
                                                        ? 'View Some'
                                                        : 'View All'}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                )
                            }}
                        />
                    </ScrollView>
                ) : (
                    <FlatList
                        data={this.getDataByGroupType(this.state.activeTab)}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => `${index}`}
                        ListEmptyComponent={this.ListEmptyComponent}
                    />
                )}
            </View>
        )
    }
}

ChatsGroup.propTypes = {
    navigation: shape({
        navigate: func,
        setParams: func,
    }).isRequired,
    route: shape({params: shape({isMapView: bool})}).isRequired,
}

export default ChatsGroup
