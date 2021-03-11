import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    RefreshControl,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {FollowersStyles, FeedStyles} from '../../styles'
import Constants from '../../constants'
import {func, shape} from 'prop-types'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import {setFeedDetails} from '../../reducers/baseServices/Feed'
import Axios from 'axios'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import moment from 'moment'
import {ActivityIndicator} from 'react-native'
import Colors from '../../constants/colors'
import {withNavigationFocus} from '@react-navigation/compat'
import _ from 'lodash'

class FeedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isLoadingUserPost: false,
            like: false,
            list: [],
            userPostList: [],
            refreshing: false,
        }
        const {
            navigation: {goBack, navigate, getParam, isLoading},
            route: {params},
            t: translate,
        } = this.props
    }

    componentDidMount() {
        // this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.FeedList()
        this.UserPostList()
        // })
    }
    // componentWillUnmount() {
    //     this.unsubscribe()
    // }

    UserPostList = async () => {
        const {addFeedDetails, user_id} = this.props
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            params: {id: user_id},
        }
        this.setState({
            isLoadingUserPost: true,
        })
        Axios.post(API.USER_POST_FEED, {}, config)
            .then((response) => {
                console.log('USERRRFEDDDD', JSON.stringify(response.data))
                if (response?.data?.data?.result) {
                    this.setState({
                        userPostList: response?.data?.data?.result || [],
                    })
                }
            })
            .finally(() => {
                this.setState({
                    isLoadingUserPost: false,
                    // refreshing: false,
                })
            })
    }

    FeedList = async () => {
        const {addFeedDetails, user_id} = this.props
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
            params: {id: user_id},
        }
        this.setState({
            isLoading: true,
        })
        Axios.get(API.POST_LIST, config)
            .then((response) => {
                if (response.data.data.result) {
                    this.setState({
                        list: _.reverse(response?.data?.data?.result),
                    })
                    addFeedDetails(response?.data?.data?.result)
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                    refreshing: false,
                })
            })
    }
    _Like = async (item) => {
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        let newList = this.state.list.map((el) =>
            el.id === item.id
                ? {
                      ...el,
                      likeStatus: item.likeStatus > 0 ? 0 : 1,
                      likeCount:
                          item.likeStatus > 0
                              ? item.likeCount - 1
                              : item.likeCount + 1,
                  }
                : el
        )
        this.setState({list: newList})
        Axios.post(
            API.LIKE,
            {
                post_id: item.id,
                type: item.likeStatus > 0 ? 'unliked' : 'liked',
            },
            config
        )
            .then((response) => {})
            .finally(() => {})
    }

    renderItem = ({item}) => {
        const {} = this.state
        const {
            navigation: {navigate},
            likeCount,
        } = this.props
        return (
            <View>
                <TouchableOpacity
                    onPress={() => {
                        // console.log("USER SCREEN PRESSED")
                        this.props.navigation.navigate('UserProfile', {
                            id: item.user_id,
                            data: item,
                        })
                    }}>
                    <View
                        activeOpacity={0.7}
                        style={[FollowersStyles.sectionView]}>
                        <View style={[FeedStyles.listView]}>
                            <View style={[FeedStyles.innerView]}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: Colors.BORDER_GREY,
                                        borderRadius: 23,
                                        marginRight: 10,
                                    }}>
                                    <Image
                                        source={{uri: item.post}}
                                        style={[
                                            FeedStyles.userImage,
                                            {marginRight: 0},
                                        ]}
                                    />
                                </View>
                                <View style={FeedStyles.nameView}>
                                    <Text style={FollowersStyles.nameText}>
                                        {item.autherName}
                                    </Text>
                                    <Text style={FollowersStyles.locationText}>
                                        {moment(item.created_at).format('LT')}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[FeedStyles.heartView]}
                                onPress={() => this._Like(item)}>
                                <Image
                                    source={
                                        item.likeStatus > 0
                                            ? Constants.Images.selectedHeart
                                            : Constants.Images.heart
                                    }
                                    style={FeedStyles.heartIcon}
                                />
                                <Text style={FollowersStyles.nameText}>
                                    {item.likeCount}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        this.props.navigation.navigate('FeedDetailScreen', {
                            data: item,
                        })
                    }}
                    style={[FeedStyles.feedImgWrapper]}>
                    <Image
                        source={{uri: item.post}}
                        style={[
                            FeedStyles.feedImg,
                            {marginVertical: 0, margin: 0},
                        ]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        )
    }

    filterData = ({item}) => {
        const pic =
            item?.autherImage === 'N/A'
                ? Constants.Images.tabBarProfile
                : {uri: item?.autherImage}
        const colors = [
            Colors.LIGHT_RED,
            Colors.LIGHT_YELLOW,
            Colors.LIGHT_GREEN,
            Colors.LIGHT_BLUE,
        ]
        const color = colors[Math.floor(Math.random() * colors.length)]
        const images = Constants.Images.feedUser
        let selectedIcon = item?.live
            ? 'live'
            : item?.runners_type === 'runner'
            ? 'rocket'
            : 'bicep'
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    FeedStyles.optionalSectionView,
                    {
                        borderWidth: 2,
                        borderColor: color,
                        borderRadius: 24,
                        marginRight: 10,
                    },
                ]}
                onPress={() => {
                    this.props.navigation.navigate('Stream', {
                        channelName: item?.channel_id,
                        id: item.user_id,
                    })
                }}>
                <Image
                    source={pic}
                    style={[FeedStyles.userImage, {marginRight: 0}]}
                    resizeMode="cover"
                />
                <Image
                    source={images[selectedIcon]}
                    style={{
                        width: 25,
                        height: 15,
                        position: 'absolute',
                        bottom: -2,
                        right:
                            selectedIcon === 'rocket'
                                ? -5
                                : selectedIcon === 'live'
                                ? -10
                                : -2,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        )
    }

    ListEmptyComponent = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>
                    Don't have any feeds to show
                </Text>
            </View>
        )
    }
    onRefresh = async () => {
        this.setState({refreshing: true})
        this.FeedList()
        this.UserPostList()
    }

    render() {
        const {isLoading, refreshing} = this.state

        const {
            navigation: {goBack, navigate, getParam},
            route: {params},
            t: translate,
        } = this.props
        return (
            <>
                <View style={FollowersStyles.container}>
                    {isLoading ? (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                            }}>
                            <ActivityIndicator color="white" size={25} />
                        </View>
                    ) : (
                        <View>
                            <ScrollView
                                scrollEnabled={false}
                                style={{
                                    height: 120,
                                    marginBottom: 0,
                                    marginTop: -30,
                                    padding: 0,
                                }}>
                                <FlatList
                                    data={this.state.userPostList}
                                    contentContainerStyle={
                                        FeedStyles.sectionMainView
                                    }
                                    renderItem={this.filterData}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => `1-${index}`}
                                    ListEmptyComponent={() => {
                                        return (
                                            <Text style={{color: Colors.WHITE}}>
                                                No active feeds.
                                            </Text>
                                        )
                                    }}
                                />
                            </ScrollView>

                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        tintColor={Constants.Colors.WHITE}
                                        refreshing={refreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                                // scrollEnabled={false}
                                contentContainerStyle={FollowersStyles.flatList}
                                data={this.state.list}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => `2-${index}`}
                                ListEmptyComponent={this.ListEmptyComponent}
                                initialNumToRender={1}
                            />
                        </View>
                    )}
                </View>
            </>
        )
    }
}

// export default FeedScreen;
FeedScreen.propTypes = {
    // loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({
    Feed: likeStatus,
    likeCount,
    profile: {user_id},
}) => ({
    likeStatus,
    likeCount,
    user_id,
})

const mapDispatchToProps = {
    addFeedDetails: (params) => setFeedDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(FeedScreen))
