import React, {Component} from 'react'
import {
    Text,
    View,
    ScrollView,
    TextInput,
    Image,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import Constants from '../../constants'
import {FollowingStyles} from '../../styles'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import Axios from 'axios'

export class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            isLoading: false,
            friends: [],
        }
    }

    ListEmptyComponent = () => {
        ;<View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text style={{color: Constants.Colors.WHITE}}>
                No friends found.
            </Text>
        </View>
    }

    filterUsers = (users) => {
        let a = users.reduce((a, b) => {
            if (!a.find((i) => i.friend_id === b.friend_id)) {
                a.push(b)
            }
            return a
        }, [])

        this.setState({
            friends: a,
            isLoading: false,
        })
    }

    renderItem = ({item}) => {
        return (
            <TouchableOpacity
                style={FollowingStyles.sectionView}
                activeOpacity={0.7}
                onPress={() =>
                    item?.friend_id === this.props.user_id
                        ? this.props.navigation.navigate('Me')
                        : this.props.navigation.navigate('UserProfile', {
                              iseventPage: false,
                              id: item?.friend_id,
                              follow_id: item?.friend_id,
                          })
                }>
                <View
                    style={[
                        FollowingStyles.listView,
                        {
                            backgroundColor: Constants.Colors.LIGHT_RED,
                            overflow: 'hidden',
                            height: '100%',
                        },
                    ]}>
                    <Image
                        source={{uri: item?.image}}
                        style={{width: 120, height: 60, borderRadius: 12}}
                    />
                </View>

                <View style={{width: '60%'}}>
                    <Text style={FollowingStyles.nameText}>
                        {item?.full_name}
                    </Text>
                    <Text
                        style={FollowingStyles.locationText}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item?.address}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    getFriends = async () => {
        this.setState({isLoading: true})
        const url = API.GET_FRIEND_LIST
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log('FRIEND LIST', res)
            if (res?.data?.status) {
                this.filterUsers(res?.data?.data?.result || [])
            } else {
                this.setState({isLoading: false})
            }
        } catch (error) {
            console.log('ERROR FRIEND LIST', error)
            this.setState({isLoading: false})
        }
    }

    componentDidMount() {
        this.getFriends()
    }

    render() {
        const {isLoading, friends} = this.state

        return (
            <>
                <ScrollView style={FollowingStyles.container}>
                    <View style={FollowingStyles.searchView}>
                        <Image
                            source={Constants.Images.search}
                            style={FollowingStyles.searchIcon}
                        />

                        <TextInput
                            placeholder={`Search Friend`}
                            placeholderTextColor="#898989"
                            value={this.state.search}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{color: 'white', width: '90%'}}
                            onChangeText={(text) => {
                                this.setState({search: text})
                            }}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    {isLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={Constants.Colors.WHITE}
                        />
                    ) : (
                        <FlatList
                            scrollEnabled={false}
                            contentContainerStyle={FollowingStyles.flatList}
                            data={friends}
                            renderItem={({item, index, navigate}) => (
                                <this.renderItem item={item} index={index} />
                            )}
                            ListEmptyComponent={this.ListEmptyComponent()}
                        />
                    )}
                </ScrollView>
            </>
        )
    }
}

export default Friends
