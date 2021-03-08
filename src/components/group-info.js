import React from 'react'
import {bool, func} from 'prop-types'
import {TouchableOpacity, Text, View, Image} from 'react-native'

import {InviteFriendsStyles, ChatStyles} from '../styles'
import {ActivityIndicator} from 'react-native'
import constants from '../constants'

export const GroupsInfo = ({hasAdmin, group, onPressButton, isLoading}) => (
    <TouchableOpacity activeOpacity={0.7} style={InviteFriendsStyles.container}>
        <View style={InviteFriendsStyles.userWrapper}>
            <Image
                source={{
                    uri:
                        group?.image ||
                        'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg',
                }}
                style={InviteFriendsStyles.userImage}
            />
            <View>
                <Text style={InviteFriendsStyles.username}>
                    {group?.full_name}
                </Text>
            </View>
        </View>
        {!hasAdmin && (
            <TouchableOpacity
                disabled={isLoading}
                activeOpacity={0.7}
                style={[ChatStyles.button, ChatStyles.acceptRejectBtn]}
                onPress={onPressButton}>
                {isLoading ? (
                    <ActivityIndicator
                        size="small"
                        color={constants.Colors.WHITE}
                    />
                ) : (
                    <Text style={ChatStyles.buttonText}>Remove</Text>
                )}
            </TouchableOpacity>
        )}
    </TouchableOpacity>
)

GroupsInfo.propTypes = {
    hasAdmin: bool,

    onPressButton: func,
}

GroupsInfo.defaultProps = {
    hasAdmin: false,
    onPressButton: func,
}

export default GroupsInfo
