/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable newline-after-var */
/* eslint-disable max-len */
import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import axios from 'axios'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import {func, shape} from 'prop-types'
import API from '../../constants/baseApi'
import {FollowingStyles} from '../../styles'
import Constants from '../../constants'
import {setFollowUserId} from '../../reducers/baseServices/profile'
import {getAuthToken} from '../../helpers/auth'
import {useNavigation, useRoute} from '@react-navigation/native'
import {Alert} from 'react-native'
import Axios from 'axios'

class FollowersList extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            Loading: false,
            list: [],
            requestes: [],
            request3: [],
            viewAllRequests: false,
            search: '',
        }
    }

    // const navigation = useNavigation();
    // const dispatch = useDispatch();

    componentDidMount() {
        // eslint-disable-next-line no-underscore-dangle
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this._fetchFollowers()
            this.getRequests()
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    _fetchFollowers = async () => {
        // eslint-disable-next-line react/prop-types
        const {addFollowUserId} = this.props

        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
        console.log('Token====>', this.props.token)
        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`},
            params: {
                id: this.props?.route?.params?.user_id,
            },
        }
        // console.log('===>responseFOLLOWERS');
        this.setState({
            Loading: true,
        })
        axios
            .get(API.FOLLOWERS, config)
            .then((response) => {
                console.log('===>responseFOLLOWERS', response)
                if (response.data.data.result) {
                    this.setState({list: response?.data?.data?.result})
                    // addFollowUserId(response?.data?.data?.result?.id);
                    // console.log('====?id', response?.data?.data?.result?.id);
                }
            })
            .finally(() => {
                this.setState({
                    Loading: false,
                })
            })
    }

    getThreeRequests = (requests) => {
        let threeReq = requests.slice(
            0,
            requests.length > 3 ? 3 : requests.length
        )
        this.setState({request3: threeReq})
    }

    getRequests = async () => {
        const url = API.GET_FRIEND_REQUEST
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            if (res?.data?.status) {
                this.setState({requests: res?.data?.data?.result || []}, () => {
                    this.getThreeRequests(res?.data?.data?.result || [])
                })
            }
            console.log('FRIEND REQUEST', res)
        } catch (error) {
            console.log('ERROR FRIEND REQUEST', error)
        }
    }

    acceptRequest = async (requestId) => {
        const url = `${API.ACCEPT_REJECT_FRIEND_REQUEST}/${requestId}`
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const res = await Axios.post(url, {}, config)
            console.log('ACCEPT FRIEND REQUEST', res)
            this.getRequests()
        } catch (error) {
            console.log('ERROR ACCEPT FRIEND REQUEST', error)
        }
    }

    rejectRequest = async (requestId) => {
        const url = `${API.ACCEPT_REJECT_FRIEND_REQUEST}/${requestId}`
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        try {
            const res = await Axios.delete(url, config)
            console.log('REJECT FRIEND REQUEST', res)
            this.getRequests()
        } catch (error) {
            console.log('ERROR REJECT FRIEND REQUEST', error)
        }
    }

    renderItem = ({item, request}) => {
        return (
            <TouchableOpacity
                style={FollowingStyles.sectionView}
                activeOpacity={0.7}
                onPress={() =>
                    item?.folowing_id === this.props.user_id
                        ? this.props.navigation.navigate('Me')
                        : this.props.navigation.navigate('UserProfile', {
                              iseventPage: false,
                              id: request ? item?.friend_id : item.folowing_id,
                              follow_id: request
                                  ? item?.friend_id
                                  : item.folowing_id,
                          })
                }>
                <View
                    style={[
                        FollowingStyles.listView,
                        {
                            backgroundColor: Constants.Colors.LIGHT_RED,
                            overflow: 'hidden',
                        },
                    ]}>
                    <Image
                        source={{
                            uri: request ? item?.image : item?.followingImage,
                        }}
                        style={{width: 60, height: 60, borderRadius: 12}}
                    />
                </View>

                <View style={{width: '60%'}}>
                    <Text style={FollowingStyles.nameText}>
                        {request ? item?.full_name : item.followingName}
                    </Text>
                    <Text
                        style={FollowingStyles.locationText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {request ? item?.address : item?.followingAddress}
                    </Text>
                </View>
                {request && (
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.rejectRequest(item?.request_id)
                            }>
                            <Image
                                source={Constants.Images.cancel}
                                style={{width: 25, height: 25}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.acceptRequest(item?.request_id)}
                            style={{marginLeft: 20}}>
                            <Image
                                source={Constants.Images.accept}
                                style={{width: 25, height: 25}}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        )
    }

    ListEmptyComponent = (request = false) => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>
                    You don't have any {request ? 'requests' : 'followers'}.
                </Text>
            </View>
        )
    }

    render() {
        const {
            navigation: {navigate},
        } = this.props
        const {my} = this.props.route.params
        return (
            <>
                <ScrollView style={FollowingStyles.container}>
                    <View style={FollowingStyles.searchView}>
                        <Image
                            source={Constants.Images.search}
                            style={FollowingStyles.searchIcon}
                        />

                        <TextInput
                            placeholder={`Search Followers (${this.props.route.params.followerCount})`}
                            placeholderTextColor="#898989"
                            value={this.state.search}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{color: 'white', paddingVertical: 10}}
                            onChangeText={(text) => {
                                this.setState({search: text})
                            }}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    {this.state.Loading ? (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}>
                            <ActivityIndicator color="white" size={25} />
                        </View>
                    ) : (
                        <>
                            {my && (
                                <FlatList
                                    ListHeaderComponent={() => (
                                        <View
                                            style={{
                                                padding: 10,
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                            }}>
                                            <Text
                                                style={{
                                                    color:
                                                        Constants.Colors.WHITE,
                                                }}>
                                                Friend Requests
                                            </Text>
                                            {this.state.requests?.length > 3 ? (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.setState({
                                                            viewAllRequests: !this
                                                                .state
                                                                .viewAllRequests,
                                                        })
                                                    }>
                                                    <Text
                                                        style={{
                                                            color:
                                                                Constants.Colors
                                                                    .LIGHT_BLUE,
                                                        }}>
                                                        {this.state
                                                            .viewAllRequests
                                                            ? 'View Some'
                                                            : 'View All'}
                                                    </Text>
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                    )}
                                    scrollEnabled={false}
                                    contentContainerStyle={
                                        FollowingStyles.flatList
                                    }
                                    data={
                                        this.state.viewAllRequests
                                            ? this.state.requests
                                            : this.state.request3
                                    }
                                    renderItem={({item, index, navigate}) => (
                                        <this.renderItem
                                            item={item}
                                            index={index}
                                            request
                                        />
                                    )}
                                    ListEmptyComponent={() =>
                                        this.ListEmptyComponent(true)
                                    }
                                />
                            )}
                            <FlatList
                                scrollEnabled={false}
                                contentContainerStyle={FollowingStyles.flatList}
                                data={this.state.list}
                                renderItem={({item, index, navigate}) => (
                                    <this.renderItem
                                        item={item}
                                        index={index}
                                    />
                                )}
                                ListHeaderComponent={
                                    my
                                        ? () => (
                                              <View style={{padding: 10}}>
                                                  <Text
                                                      style={{
                                                          color:
                                                              Constants.Colors
                                                                  .WHITE,
                                                      }}>
                                                      Followers
                                                  </Text>
                                              </View>
                                          )
                                        : null
                                }
                                ListEmptyComponent={() =>
                                    this.ListEmptyComponent(false)
                                }
                            />
                        </>
                    )}
                </ScrollView>
            </>
        )
    }
}
FollowersList.propTypes = {
    // loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}
const mapStateToProps = ({profile: {id, user_id}, auth: {token}}) => ({
    id,
    token,
    user_id,
})

const mapDispatchToProps = {
    addFollowUserId: (params) => setFollowUserId(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(FollowersList))
