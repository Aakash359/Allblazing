import Axios from 'axios'
import React, {Component} from 'react'
import {Alert} from 'react-native'
import {
    ActivityIndicator,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'
import constants from '../../constants'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import {BlockUserStyles, FollowingStyles} from '../../styles'

export class BlockedUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            blockedUsers: [],
            blockLoading: {id: 0, isLoading: true},
        }
    }

    BlockedUserList = async () => {
        this.setState({isLoading: true})
        const url = API.BLOCKED_USERS
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log('BLOCKED USERS: ', res)
            if (res?.data?.status) {
                this.setState({
                    blockedUsers: res?.data?.data?.result,
                    isLoading: false,
                })
            } else {
                this.setState({isLoading: false})
            }
        } catch (error) {
            console.log('BLOCKED USERS ERROR: ', error)
            this.setState({isLoading: false})
        }
    }

    unblockUser = async (id) => {
        this.setState({blockLoading: {id}})
        const url = API.USER_BLOCK
        const token = await getAuthToken()
        const data = {
            user_id: id,
            type: 'unblock',
            block_type: 'unblock',
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.post(url, data, config)
            console.log('BLOCK USER: ', res)
            if (res?.data?.status) {
                this.setState({blockLoading: {id: 0}})
                this.BlockedUserList()
            } else {
                this.setState({blockLoading: {id: 0}})
                Alert.alert('Unblock User', res?.data?.message)
            }
        } catch (error) {
            console.log('BLOCK USER ERROR: ', error)
            this.setState({blockLoading: {id: 0}})
            Alert.alert('Unblock User', 'Unable to unblock user.')
        }
    }

    renderUsers = ({item}) => {
        return (
            <TouchableOpacity
                style={FollowingStyles.sectionView}
                activeOpacity={0.7}
                onPress={() =>
                    this.props.navigation.navigate('UserProfile', {
                        iseventPage: false,
                        id: item?.user_id,
                        follow_id: item?.user_id,
                    })
                }>
                <View
                    style={[
                        FollowingStyles.listView,
                        {
                            backgroundColor: constants.Colors.LIGHT_RED,
                            overflow: 'hidden',
                        },
                    ]}>
                    <Image
                        source={{
                            uri: item?.image,
                        }}
                        style={{width: 60, height: 60, borderRadius: 12}}
                    />
                </View>
                <View>
                    <Text style={FollowingStyles.nameText}>{item?.name}</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        paddingVertical: 6,
                    }}>
                    <TouchableOpacity
                        style={BlockUserStyles.unblockBtn}
                        onPress={() => this.unblockUser(item?.user_id)}
                        disabled={this.state.blockLoading.id === item?.user_id}>
                        {this.state.blockLoading.id === item?.user_id ? (
                            <ActivityIndicator
                                size="small"
                                color={constants.Colors.WHITE}
                            />
                        ) : (
                            <Text style={{color: constants.Colors.WHITE}}>
                                Unblock
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    emptyListComp = () => {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{color: constants.Colors.WHITE}}>
                    No user found.
                </Text>
            </View>
        )
    }

    componentDidMount() {
        this.BlockedUserList()
    }

    render() {
        const {isLoading, blockedUsers} = this.state
        return isLoading ? (
            <ActivityIndicator size="small" color={constants.Colors.WHITE} />
        ) : (
            <FlatList
                data={blockedUsers}
                keyExtractor={(item, i) => i.toString()}
                renderItem={this.renderUsers}
                ListEmptyComponent={this.emptyListComp}
            />
        )
    }
}

export default BlockedUsers
