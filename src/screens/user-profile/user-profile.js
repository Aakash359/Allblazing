import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    Alert,
} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {ProfileStyles} from '../../styles'
import UserGoalScreen from './user-goals'
import Constants from '../../constants'
import {MoreOptionsPopup} from '../../components'
import profileStyles from '../../styles/profile-styles'
import {connect, useSelector} from 'react-redux'
import axios from 'axios'
import API from '../../constants/baseApi'
import {func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import {getAuthToken} from '../../helpers/auth'
import {ActivityIndicator} from 'react-native'
import Axios from 'axios'
import firestore from '@react-native-firebase/firestore'

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            Loading: false,
            FollowLoading: false,
            followStatus: false,
            option: 'Goals',
            optionList: ['Goals', "PB's", 'Likes'],
            list: [],
            requestLoading: false,
        }
    }
    componentDidMount() {
        this.UserProfileDetails()
    }

    UserProfileDetails = async () => {
        this.setState({Loading: true})
        const id =
            this.props.route.params.follow_id || this.props.route.params.id
        console.log('userid==>', id)
        const token = await getAuthToken()
        console.log('====>', token)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        axios
            .post(
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
                    this.setState({list: response?.data?.data?.result})
                }
            })
            .catch((err) => {
                console.log('err==>', err)
            })
            .finally(() => {
                this.setState({
                    Loading: false,
                    isLoading: false,
                })
            })
    }

    displayOptions = () => <UserGoalScreen />

    renderItem = ({item}) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                ProfileStyles.optionalSectionView,
                {
                    backgroundColor:
                        item === this.option
                            ? Constants.Colors.GRAY
                            : Constants.Colors.PRIMARY,
                },
            ]}
            onPress={() => {
                setOption(item)
            }}>
            <Text style={ProfileStyles.optionalSection1}>{item}</Text>
        </TouchableOpacity>
    )

    OnUnfollow = async () => {
        const {
            navigation: {goBack, navigate},
        } = this.props
        const followId =
            this.props.route.params.follow_id || this.props.route.params.id
        console.log('followId', followId)
        const token = await getAuthToken()
        console.log('====>', token)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        console.log('config=>', config)
        axios.delete(API.UNFOLLOW + followId, config).then((response) => {
            console.log('response==>', response.data)
            if (response.data.code == 200) {
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
    }
    handleUserFollow = async () => {
        const token = await getAuthToken()
        const {followStatus} = this.state
        console.log(
            'ID====>',
            this.props.route.params.follow_id || this.props.route.params.id
        )
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            FollowLoading: true,
        })
        axios
            .post(
                API.FOLLOW,
                {
                    follow_id:
                        this.props.route.params.follow_id ||
                        this.props.route.params.id,
                },
                config
            )
            .then((response) => {
                if (response.data.code == 200) {
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
                                onPress: () => console.log('ok Pressed'),
                            },
                        ],
                        {Cancelable: false}
                    )
                    this.setState({followStatus: !followStatus})
                }
            })
            .finally(() => {
                this.UserProfileDetails()

                this.setState({
                    FollowLoading: false,
                })
            })
    }
    startChat = () => {
        const {
            navigation: {goBack, navigate},
        } = this.props
        const user = []
        const chatID = []
        const details = []
        const data = this.props.route.params.data
        const data2 = this.props.user_id
        const user1 = {
            id: data.user_id,
            pic: data.autherImage,
            name: data.autherName,
            address: 'dummmy',
        }

        details.push(user1)
        const user2 = {
            id: data2.user_id,
            pic: data2.image,
            name: data2.full_name,
            address: 'dummy',
        }

        user.push(user1, user2)

        chatID.push(data.user_id.toString())
        chatID.push(data2.user_id.toString())
        console.log('IDDSSSS', chatID, user)
        firestore()
            .collection('chatroom')
            .add({
                ID: chatID,
                users: user,
            })
            .then((data2) => {
                console.log('dataaaaaaFIREBASE CREEATED', data2)
                navigate('ChatOneToOne', {id: data.user_id, userData: details})
            })
    }
    chatID = (id1, id2) => {
        const chatterID = id1
        const chateeID = id2
        const chatIDpre = []
        chatIDpre.push(chatterID)
        chatIDpre.push(chateeID)
        chatIDpre.sort()
        return chatIDpre.join('_')
    }
    sendFriendRequest = async () => {
        this.setState({requestLoading: true})
        const url = API.SEND_FRIEND_REQUEST
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const id =
            this.props.route.params.follow_id || this.props.route.params.id
        const payload = {
            friend_id: id,
        }

        try {
            const res = await Axios.post(url, payload, config)
            console.log('FRIEND REQUEST', res)
            if (res?.status) {
                Alert.alert('Friend Request', res?.data?.message)
            } else {
                Alert.alert('Friend Request', res?.data?.message)
            }
            this.setState({requestLoading: false})
        } catch (error) {
            console.log('FRIEND REQUEST ERROR', error)
            Alert.alert('Friend Request', error?.message)
            this.setState({requestLoading: false})
        }
    }

    render() {
        // const {nam} = this.state;
        const {
            navigation: {goBack, navigate, setParams, isLoading},
            route: {params},
            t: translate,
        } = this.props
        const id =
            this.props.route.params.follow_id || this.props.route.params.id
        // console.log('id===>',id);
        return (
            <View style={ProfileStyles.container}>
                {this.state.Loading ? (
                    <View
                        style={{
                            height: '100%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator color="white" size={25} />
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity activeOpacity={0.7}>
                            <View>
                                <ImageBackground
                                    source={
                                        this.state.list.image == 'N/A'
                                            ? Constants.Images.profilePic
                                            : {uri: this.state.list.image}
                                    }
                                    // source={{uri: this.state.list.image}}
                                    imageStyle={ProfileStyles.borderRadius}
                                    style={ProfileStyles.profileIcon}>
                                    <View style={ProfileStyles.levelStyle}>
                                        <Text style={ProfileStyles.levelText}>
                                            Level {this.state.list.level}
                                        </Text>
                                    </View>
                                    <View
                                        style={profileStyles.overlappingStyle}>
                                        <View>
                                            <Text style={ProfileStyles.heading}>
                                                {this.state.list.full_name}
                                            </Text>
                                            <Text
                                                style={
                                                    ProfileStyles.subHeading
                                                }>
                                                {
                                                    this.state.list
                                                        .motto_description
                                                }
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.startChat()}>
                                            <Image
                                                source={Constants.Images.chat}
                                                resizeMode="contain"
                                                style={ProfileStyles.icon}
                                            />
                                        </TouchableOpacity>
                                        {this.props.route?.params
                                            ?.iseventPage ? null : this.state
                                              .FollowLoading ? (
                                            <ActivityIndicator
                                                color="white"
                                                size={25}
                                            />
                                        ) : !this.state.list?.friend ? (
                                            this.state.requestLoading ? (
                                                <ActivityIndicator
                                                    size="small"
                                                    color={
                                                        Constants.Colors.WHITE
                                                    }
                                                />
                                            ) : (
                                                <TouchableOpacity
                                                    activeOpacity={0.7}
                                                    onPress={() =>
                                                        this.sendFriendRequest()
                                                    }>
                                                    <Image
                                                        source={
                                                            Constants.Images.add
                                                        }
                                                        resizeMode="contain"
                                                        style={
                                                            ProfileStyles.icon
                                                        }
                                                    />
                                                </TouchableOpacity>
                                            )
                                        ) : //   (
                                        //     <TouchableOpacity
                                        //   activeOpacity={0.7}
                                        //   // onPress={() => setFollowStatus(!followStatus)}
                                        //   onPress={() => this.handleUserFollow()}>
                                        //     <Image
                                        //       source={Constants.Images.add}
                                        //       resizeMode="contain"
                                        //       style={ProfileStyles.icon}
                                        //     />
                                        // </TouchableOpacity>
                                        //   )
                                        null}
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <View style={ProfileStyles.sectionMainView}>
                            <View style={ProfileStyles.sectionView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            'FollowersList',
                                            {
                                                followerCount: this.state.list
                                                    .followerCount,
                                                user_id:
                                                    this.props.route.params
                                                        .follow_id ||
                                                    this.props.route.params.id,
                                                my: false,
                                            }
                                        )
                                    }}>
                                    <Text style={ProfileStyles.section2}>
                                        {this.state.list.followerCount}
                                    </Text>
                                    <Text style={ProfileStyles.section1}>
                                        {'Followers'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.sectionView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            'FollowingList',
                                            {
                                                followingCount: this.state.list
                                                    .followingCount,
                                                user_id:
                                                    this.props.route.params
                                                        .follow_id ||
                                                    this.props.route.params.id,
                                            }
                                        )
                                    }}>
                                    <Text style={ProfileStyles.section2}>
                                        {this.state.list.followingCount}
                                    </Text>
                                    <Text style={ProfileStyles.section1}>
                                        {'Following'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.sectionView}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'PostLikeListing',
                                            {
                                                postCount: this.state.list
                                                    .postCount,
                                                userId: this.state.list.user_id,
                                            }
                                        )
                                    }>
                                    <Text style={ProfileStyles.section2}>
                                        {this.state.list.postCount}
                                    </Text>
                                    <Text style={ProfileStyles.section1}>
                                        {'Posts'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.sectionViewEnd}>
                                <TouchableOpacity
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'ChatsGroup'
                                        )
                                    }>
                                    <Text style={ProfileStyles.section2}>
                                        {this.state.list.groupCount}
                                    </Text>
                                    <Text style={ProfileStyles.section1}>
                                        {'Groups'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {!this.state.list.private_status ||
                        this.state.list.follow ? (
                            <View>
                                <FlatList
                                    scrollEnabled={false}
                                    contentContainerStyle={
                                        ProfileStyles.sectionMainView
                                    }
                                    data={this.optionList}
                                    renderItem={this.renderItem}
                                    keyExtractor={(id, index) =>
                                        index.toString()
                                    }
                                />
                                {this.displayOptions(this.option)}
                            </View>
                        ) : (
                            <View style={ProfileStyles.iconView}>
                                <Image
                                    source={Constants.Images.lockProfile}
                                    resizeMode="contain"
                                    style={ProfileStyles.lockedIcon}
                                />
                                <Text style={ProfileStyles.bottomHeader}>
                                    {'Private Account'}
                                </Text>
                                <Text style={ProfileStyles.bottomHeader2}>
                                    {
                                        'Follow this account to see photos and videos.'
                                    }
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {this.props.route?.params?.visible && (
                    <MoreOptionsPopup
                        hasFollowBtn={!this.state.list.follow}
                        hasUnFollowBtn={
                            this.state.list.follow
                                ? true
                                : this.props.route?.params?.iseventPage
                                ? true
                                : false
                        }
                        onfollow={this.handleUserFollow}
                        onUnfollow={() => this.OnUnfollow()}
                        visible={this.props.route?.params?.visible}
                        onBlock={() => {
                            this.props.navigation.setParams({visible: false})
                            this.props.navigation.navigate('BlockReportUser', {
                                isBlockPage: true,
                                id: id,
                            })
                        }}
                        onReport={() => {
                            this.props.navigation.setParams({visible: false})
                            this.props.navigation.navigate('BlockReportUser', {
                                isBlockPage: false,
                                id: id,
                            })
                        }}
                        onClose={() =>
                            this.props.navigation.setParams({visible: false})
                        }
                    />
                )}
            </View>
        )
    }
}

// export default UserProfile;

UserProfile.propTypes = {
    loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({profile: follow_id, auth: user_id}) => ({
    follow_id,
    user_id,
})

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
    // addCreateGroupDetail: (params) => setCreateGroupDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(UserProfile))
