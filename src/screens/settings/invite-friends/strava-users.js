import React from 'react'
import {View, FlatList, TouchableOpacity, Text} from 'react-native'
import {func, shape, string} from 'prop-types'
import {withTranslation} from 'react-i18next'
import {CommonActions} from '@react-navigation/native'
import {AuthStyle, HomeStyles, InviteFriendsStyles} from '../../../styles'
import {InviteFriend, SuccessPopup} from '../../../components'
import Constants from '../../../constants'
import API from '../../../constants/baseApi'
import {getAuthToken} from '../../../helpers/auth'
import Axios from 'axios'
import {ActivityIndicator} from 'react-native'
import _ from 'lodash'
import {Alert} from 'react-native'

class StravaUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            isLoading: false,
            friends: [],
            selectedFriend: [],
        }
    }

    selectUser = (user) => {
        this.setState({selectedFriend: [user?.friend_id]}, () => {
            console.log('SELECTED FRIEND', this.state.selectedFriend)
        })
    }

    renderItem = ({item}) => {
        const {
            route: {params},
        } = this.props
        const {selectedFriend} = this.state

        return (
            <TouchableOpacity onPress={() => this.selectUser(item)}>
                <InviteFriend
                    hasCheckBox={params?.hasCheckBox}
                    hasTick={true || params?.hasTick}
                    image={{uri: item?.image}}
                    user={item}
                    checked={item?.friend_id === selectedFriend[0]}
                />
            </TouchableOpacity>
        )
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

    onSend = async () => {
        const {
            navigation,
            navigation: {goBack, navigate},
            route: {params},
        } = this.props
        const {event_id} = params
        const url = API.EVENT_INVITE
        const {selectedFriend} = this.state

        if (!selectedFriend?.length) {
            return Alert.alert('Invite Friend', 'Please select any friend')
        }
        const payload = {
            event_id,
            invite_friend_id: selectedFriend[0],
        }
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        console.log(payload)
        try {
            const res = await Axios.post(url, payload, config)
            console.log('INVITE FRIEND TO RECORD LIVE STREAM', res)
            if (res?.data?.status) {
                this.setState({visible: false}, () => {
                    goBack()
                })
            }
        } catch (error) {
            console.log('ERROR INVITE FOR EVENT', error)
        }
    }

    componentDidMount() {
        this.getFriends()
    }

    render() {
        const {visible, isLoading, friends} = this.state
        const {t} = this.props

        return (
            <View style={HomeStyles.container}>
                {isLoading ? (
                    <ActivityIndicator
                        size="small"
                        color={Constants.Colors.WHITE}
                    />
                ) : (
                    <FlatList
                        data={friends}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => `${index}`}
                    />
                )}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={InviteFriendsStyles.button}
                    onPress={() => this.setState({visible: true})}>
                    <Text
                        style={[
                            AuthStyle.buttonText,
                            {color: Constants.Colors.WHITE},
                        ]}>
                        {t('Send Invite')}
                    </Text>
                </TouchableOpacity>
                <SuccessPopup
                    hasResendBtn={false}
                    instructions={`${t('settings.Invite send successfully')}`}
                    visible={visible}
                    onClick={this.onSend}
                />
            </View>
        )
    }
}

StravaUsers.propTypes = {
    navigation: shape({
        navigate: func.isRequired,
        setParams: func.isRequired,
    }).isRequired,
    route: shape({params: shape({routeName: string})}).isRequired,
    t: func.isRequired,
}

export default withTranslation()(StravaUsers)
