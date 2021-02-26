import React from 'react'
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    ScrollView,
    ImageBackground,
    Image,
    ActivityIndicator,
} from 'react-native'
import {func, shape} from 'prop-types'
import Constants from '../../constants'
import {
    ChatStyles,
    HomeStyles,
    GroupDetailStyles,
    MyProfileStyles,
    InviteFriendsStyles,
    CommonStyles,
} from '../../styles'
import {
    SingleEvent,
    MoreOptionsPopup,
    RemoveMemberPopup,
} from '../../components'
import axios from 'axios'
import API, {BASE_URL} from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import Axios from 'axios'
import {GROUP_TYPES} from './chat-group'
import {connect} from 'react-redux'
import {Alert} from 'react-native'

class GroupDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            optionList: ['Active', 'Created', 'Requested', 'Archived'],
            options: 'Active',
            removeMemberPopup: false,
            visible: false,
            isLoading: false,
            groupDetails: {},
            visible: false,
            leaveGroupIsLoading: false,
        }
    }

    getGroupDetails = async () => {
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type: 'active',
            },
        }
        const {groupId} = this.props.route.params
        const url = `${API.GROUP_DETAILS}/${groupId}`

        try {
            const res = await Axios.get(url, config)
            console.log('GROUP DETAILS', res)
            this.setState({groupDetails: res?.data?.data}, () => {
                this.setHederOptions()
            })
        } catch (error) {
            console.log('ERROR GROUP DETAILS', error)
        }
    }

    setHederOptions = () => {
        const {group, type} = this.props.route.params
        const {groupDetails} = this.state
        const {user_id} = this.props
        this.props.navigation.setOptions({
            headerRight: () => {
                let show =
                    type === GROUP_TYPES.MY_GROUPS &&
                    user_id !== groupDetails?.group_user_id
                return (
                    show && (
                        <TouchableOpacity
                            onPress={() => this.setState({visible: true})}>
                            <Image
                                source={Constants.Images.threeDots}
                                style={{width: 20, height: 5, marginRight: 15}}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    )
                )
            },
        })
    }

    componentDidMount() {
        this.unSubscribe = this.props.navigation.addListener('focus', () => {
            this.getGroupDetails()
        })
    }

    renderItem = () => {
        const {
            navigation: {navigate},
        } = this.props
        return (
            <SingleEvent
                onPress={() => navigate('SingleEventDetail')}
                screen="groupDetails"
            />
        )
    }

    displayOptions = (data) => {
        if (data === 'Active') {
            return true
        }
        if (data === 'Created') {
            // return <PBScreen />;
        }
        if (data === 'Requested') {
            // return <LikeScreen />;
        }
        if (data === 'Archived') {
            // return <LikeScreen />;
        }

        return true
    }

    renderItem2 = ({item}) => {
        const {options} = this.state

        return (
            <TouchableOpacity
                style={[
                    ChatStyles.optionalSectionView,
                    {
                        backgroundColor:
                            item === options
                                ? Constants.Colors.GRAY
                                : Constants.Colors.TRANSPARENT,
                    },
                ]}
                onPress={() => {
                    this.setState({options: item})
                }}>
                <Text
                    style={[
                        ChatStyles.optionalSection1,
                        {
                            color:
                                item === options
                                    ? Constants.Colors.WHITE
                                    : Constants.Colors.GRAY,
                        },
                    ]}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }

    OnJoin = async () => {
        const {
            navigation: {navigate},
        } = this.props
        const {
            group: {group_id},
        } = this.props.route.params

        this.setState({
            isLoading: true,
        })
        // markwinz06@gmail.com/mark@1234
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        const url = `${API.JOIN_GROUP}${group_id}`
        axios
            .post(url, {}, config)
            .then((response) => {
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
                                onPress: () => this.props.navigation.goBack(),
                            },
                        ],
                        {Cancelable: false}
                    )

                    // navigate('Settings');
                }
            })
            .catch((e) => {
                Alert.alert('', e?.message || 'Some Went Wrong')
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    onLeave = async () => {
        const {
            navigation: {navigate},
        } = this.props
        const {
            group: {group_id},
        } = this.props.route.params

        this.setState({
            isLoading: true,
        })
        // markwinz06@gmail.com/mark@1234
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        const url = `${API.GROUP_LEAVE}/${group_id}`
        axios
            .post(url, {}, config)
            .then((response) => {
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
                                onPress: () => this.props.navigation.goBack(),
                            },
                        ],
                        {Cancelable: false}
                    )

                    // navigate('Settings');
                } else {
                    Alert.alert(
                        '',
                        response?.data?.message || 'Some Went Wrong'
                    )
                }
            })
            .catch((e) => {
                Alert.alert('', e?.message || 'Some Went Wrong')
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    onAcceptRequest = async () => {
        const {
            group: {id},
        } = this.props.route.params
        const url = `${API.ACCEPT_GROUP_REQUEST}/${id}`
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log('ACCEPT REQUEST', res)

            if (res?.data?.status) {
                Alert.alert('Accept Request', res?.data?.message, [
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.props.navigation.goBack()
                        },
                    },
                ])
            } else {
                Alert.alert('Accept Request', res?.data?.message)
            }
        } catch (error) {
            console.log('ERROR ACCEPT REJECT', error)
            Alert.alert('Accept Request', error?.message)
        }
    }
    onRejectRequest = async (withdraw = false) => {
        const {
            group: {id},
        } = this.props.route.params
        const url = `${API.REJECT_GROUP_REQUEST}/${id}`
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log('REJECT REQUEST', res)
            if (res?.data?.status) {
                Alert.alert(
                    withdraw ? 'Withdraw Request' : 'Reject Request',
                    withdraw
                        ? 'Request withdraw successfully.'
                        : res?.data?.message,
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                this.props.navigation.goBack()
                            },
                        },
                    ]
                )
            } else {
                Alert.alert('Reject Request', res?.data?.message)
            }
        } catch (error) {
            console.log('ERROR REJECT REJECT', error)
            Alert.alert('Reject Request', error?.message)
        }
    }

    render() {
        const {
            navigation: {navigate, goBack},
            user_id,
        } = this.props
        const {groupId, group, type, requestType} = this.props.route.params

        const {
            optionList,
            visible,
            removeMemberPopup,
            groupDetails,
        } = this.state
        const group_image =
            this.state.groupDetails === 'N/A'
                ? Constants.Images.groupDetails
                : {uri: this.state.groupDetails?.group_image}

        return (
            <>
                <View style={HomeStyles.GroupDetailStyles}>
                    {/* {this.renderHeader({ goBack })} */}
                    <ScrollView>
                        <ImageBackground
                            source={group_image}
                            imageStyle={MyProfileStyles.borderRadius}
                            style={MyProfileStyles.profileIcon}>
                            <View style={ChatStyles.overlappingStyle}>
                                <View>
                                    <Text style={ChatStyles.heading}>
                                        {groupDetails?.group_name || ''}
                                    </Text>
                                    <Text style={ChatStyles.subHeading}>
                                        {group?.userInfo?.userData?.length || 0}
                                        {group?.userInfo?.userData?.length > 1
                                            ? ' Members'
                                            : ' Member'}
                                    </Text>
                                </View>
                                {type === GROUP_TYPES?.MY_GROUPS &&
                                user_id ===
                                    this.state.groupDetails?.group_user_id ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigate('GroupInfo', {
                                                group,
                                                groupDetails: this.state
                                                    .groupDetails,
                                                groupId: group?.group_id,
                                            })
                                        }>
                                        <Image
                                            source={Constants.Images.edit}
                                            resizeMode="contain"
                                            style={ChatStyles.icon}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </ImageBackground>
                        <View>
                            <FlatList
                                // style={MyProfileStyles.sectionMainView}
                                scrollEnabled={false}
                                contentContainerStyle={
                                    ChatStyles.sectionMainView
                                }
                                data={optionList}
                                renderItem={this.renderItem2}
                                keyExtractor={(id, index) => index.toString()}
                            />
                            <FlatList
                                scrollEnabled={false}
                                data={[1, 2, 3]}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => `${index}`}
                            />
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {type === GROUP_TYPES?.ALL_GROUPS ? (
                                <TouchableOpacity
                                    onPress={() => this.OnJoin()}
                                    activeOpacity={0.7}
                                    style={GroupDetailStyles.nextView}>
                                    {this.state.isLoading ? (
                                        <ActivityIndicator
                                            color="white"
                                            size={25}
                                        />
                                    ) : (
                                        <Text
                                            style={GroupDetailStyles.nextText}>
                                            Join
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ) : type === GROUP_TYPES?.REQUESTED ? (
                                requestType === 'send' ? (
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.onRejectRequest(true)
                                        }
                                        activeOpacity={0.7}
                                        style={GroupDetailStyles.nextView}>
                                        {this.state.isLoading ? (
                                            <ActivityIndicator
                                                color="white"
                                                size={25}
                                            />
                                        ) : (
                                            <Text
                                                style={
                                                    GroupDetailStyles.nextText
                                                }>
                                                Withdraw Request
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                ) : requestType === 'get' ? (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            marginHorizontal: 20,
                                        }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.onRejectRequest()
                                            }
                                            activeOpacity={0.7}
                                            style={[
                                                GroupDetailStyles.nextView,
                                                {flex: 1},
                                            ]}>
                                            {this.state.isLoading ? (
                                                <ActivityIndicator
                                                    color="white"
                                                    size={25}
                                                />
                                            ) : (
                                                <Text
                                                    style={
                                                        GroupDetailStyles.nextText
                                                    }>
                                                    Reject
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.onAcceptRequest()
                                            }
                                            activeOpacity={0.7}
                                            style={[
                                                GroupDetailStyles.nextView,
                                                {flex: 1},
                                            ]}>
                                            {this.state.isLoading ? (
                                                <ActivityIndicator
                                                    color="white"
                                                    size={25}
                                                />
                                            ) : (
                                                <Text
                                                    style={
                                                        GroupDetailStyles.nextText
                                                    }>
                                                    Accept
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            ) : null}
                        </View>
                    </ScrollView>
                    <MoreOptionsPopup
                        hasBlockBtn={false}
                        hasUnFollowBtn={false}
                        leaveGroup
                        visible={this.state.visible}
                        reportBtnTitle="Report Group"
                        onReport={() => {
                            const {groupId} = this.props.route.params
                            this.setState({visible: false})
                            this.props.navigation.navigate('BlockReportUser', {
                                isBlockPage: false,
                                id: groupId,
                                isGroup: true,
                            })
                        }}
                        onBlock={this.onLeave}
                        onClose={() => this.setState({visible: false})}
                    />
                </View>
            </>
        )
    }
}

GroupDetail.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
}

const mapStateToProps = ({profile: {user_id}}) => {
    return {
        user_id,
    }
}

export default connect(mapStateToProps, null)(GroupDetail)
