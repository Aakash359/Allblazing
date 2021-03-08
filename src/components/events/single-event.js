import {func} from 'prop-types'
import React from 'react'
import {TouchableOpacity, Text, View, Image} from 'react-native'
import constants, {Colors} from '../../constants'
import {HomeStyles} from '../../styles'
import UserImages from '../user-images'
import moment from 'moment'

export const SingleEvent = ({onPress, event}) => {
    let mdate = new Date()

    if (isNaN(new Date(parseInt(event?.date, 10)))) {
        mdate = new Date()
    } else {
        mdate = new Date(parseInt(event?.date, 10))
    }
    const date = moment(mdate).format('D')
    const month = moment(mdate).format('MMM')
    const colors = [
        Colors.LIGHT_BLUE,
        Colors.LIGHT_RED,
        Colors.LIGHT_GREEN,
        Colors.LIGHT_YELLOW,
    ]

    const color = Math.floor(Math.random() * colors.length)

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={HomeStyles.item}
            onPress={onPress}>
            <View style={HomeStyles.row}>
                <View
                    style={[
                        HomeStyles.dateView,
                        // {backgroundColor: colors[color]},
                    ]}>
                    <Text style={HomeStyles.title}>{date}</Text>
                    <Text style={HomeStyles.title}>{month}</Text>
                </View>
                <View style={HomeStyles.wrapper}>
                    <Text style={HomeStyles.header}>{event?.event_name}</Text>
                    <Text style={HomeStyles.location}>
                        {event?.event_address_one}
                        {event?.event_address_two &&
                            `, ${event?.event_address_two}`}
                    </Text>
                </View>
            </View>
            <Text style={HomeStyles.description}>
                {event?.event_description}
            </Text>
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
