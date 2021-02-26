import {func} from 'prop-types'
import React from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import constants from '../../constants'
import {HomeStyles} from '../../styles'
import UserImages from '../user-images'
import moment from 'moment'

export const SingleEvent = ({onPress, event}) => {
    // console.log('Event Details', event)
    const date = moment(event?.data).format('D')
    const month = moment(event?.data).format('MMM')

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={HomeStyles.item}
            onPress={onPress}>
            <View style={HomeStyles.row}>
                <View style={HomeStyles.dateView}>
                    <Text style={HomeStyles.title}>{date}</Text>
                    <Text style={HomeStyles.title}>{month}</Text>
                </View>
                <View style={HomeStyles.wrapper}>
                    <Text style={HomeStyles.header}>{event?.group_name}</Text>
                    <Text style={HomeStyles.location}>
                        {event?.event_address_one}
                        {event?.event_address_two &&
                            `, ${event?.event_address_two}`}
                    </Text>
                </View>
            </View>
            <Text style={HomeStyles.description}>{event?.description}</Text>
            <View style={[HomeStyles.row, HomeStyles.usersRow]}>
                <View style={HomeStyles.icons}>
                    <View
                        style={[
                            HomeStyles.iconWrapper,
                            {backgroundColor: 'transparent'},
                        ]}>
                        <Image
                            source={constants.Images.tabBarProfile}
                            style={HomeStyles.icon}
                        />
                    </View>
                    <Text style={HomeStyles.iconText}>
                        {event?.category_name}
                    </Text>
                </View>
                {/* <UserImages users={[1, 2, 3, 4, 5]} /> */}
            </View>
        </TouchableOpacity>
    )
}

SingleEvent.propTypes = {onPress: func.isRequired}

export default SingleEvent
