import React, {useState} from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import {func} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../../constants'
import {InviteFriendsStyles} from '../../styles'
import {inviteStatus} from '../../screens/events/detail'

export const InvitedUser = ({
    t: translate,
    invite_status,
    eventDetails: {InvitedUserImage, InvitedUserName},
}) => {
    const [checked, setCheck] = useState(false)

    return (
        <View
            activeOpacity={0.7}
            onPress={() => setCheck(!checked)}
            style={[InviteFriendsStyles.invitedUserContainer]}>
            <View
                style={[
                    InviteFriendsStyles.userWrapper,
                    InviteFriendsStyles.invitedUserWrapper,
                ]}>
                <Image
                    source={{uri: InvitedUserImage}}
                    style={[
                        InviteFriendsStyles.userImage,
                        InviteFriendsStyles.invitedUserImage,
                    ]}
                />
                <View style={InviteFriendsStyles.userDetailView}>
                    <View style={InviteFriendsStyles.userInformation}>
                        <Text
                            style={[
                                InviteFriendsStyles.username,
                                InviteFriendsStyles.namePadding,
                            ]}>
                            {InvitedUserName}
                        </Text>
                        <Text
                            style={[
                                InviteFriendsStyles.invitedUserDescription,
                                InviteFriendsStyles.namePadding,
                            ]}>
                            {translate('events.invited')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        source={Constants.Images.check}
                        resizeMode="contain"
                        style={[
                            InviteFriendsStyles[
                                invite_status === inviteStatus?.pending
                                    ? 'pendingBtn'
                                    : 'acceptBtn'
                            ],
                        ]}>
                        <Text
                            style={
                                InviteFriendsStyles[
                                    invite_status === inviteStatus?.pending
                                        ? 'pending'
                                        : 'accept'
                                ]
                            }>
                            {translate(
                                `events.${
                                    invite_status === inviteStatus?.pending
                                        ? 'Pending'
                                        : 'Accept'
                                }`
                            )}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

InvitedUser.propTypes = {t: func.isRequired}

export default withTranslation()(InvitedUser)
