import {bool, node} from 'prop-types'
import React, {useState} from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import Constants from '../constants'
import {InviteFriendsStyles} from '../styles'

export const InviteFriend = ({hasCheckBox, hasTick, image, user, checked}) => {
    // const [checked, setCheck] = useState(false)

    return (
        <View
            style={InviteFriendsStyles.container}
            // activeOpacity={0.9}
            // onPress={() => setCheck(!checked)}
        >
            <View style={[InviteFriendsStyles.userWrapper, {maxWidth: '60%'}]}>
                <Image
                    source={{uri: user?.image}}
                    style={InviteFriendsStyles.userImage}
                />
                <View>
                    <Text style={InviteFriendsStyles.username}>
                        {user?.full_name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={InviteFriendsStyles.location}>
                        {user?.address}
                    </Text>
                </View>
            </View>
            <View>
                {hasCheckBox && (
                    <Image
                        source={
                            checked
                                ? Constants.Images.checkbox
                                : Constants.Images.checkoff
                        }
                        resizeMode="contain"
                        style={InviteFriendsStyles.icon}
                    />
                )}
                {hasTick && checked && (
                    <Image
                        source={Constants.Images.check}
                        resizeMode="contain"
                        style={InviteFriendsStyles.icon}
                    />
                )}
            </View>
        </View>
    )
}

InviteFriend.propTypes = {
    hasCheckBox: bool,
    hasTick: bool,
    image: node.isRequired,
}

InviteFriend.defaultProps = {
    hasCheckBox: false,
    hasTick: false,
}

export default InviteFriend
