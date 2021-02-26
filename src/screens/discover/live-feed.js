import React, {useState} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView,
    TextInput,
    SafeAreaView,
} from 'react-native'
import {LiveFeedStyles} from '../../styles'
import Constants from '../../constants'
import {PermisionPopup} from '../../components'
import {connect} from 'react-redux'
import Axios from 'axios'
import {getAuthToken} from '../../helpers/auth'
import API from '../../constants/baseApi'
function LiveFeed(props) {
    const [like, setLike] = useState(false)
    const [showPopup, setShowPopup] = useState(true)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({})

    const comment = [
        {
            image: Constants.Images.user1,
            message: 'Hello!',
            name: 'Cassey -',
        },
        {
            image: Constants.Images.user2,
            message: 'Hello!',
            name: 'Clark -',
        },
        {
            image: Constants.Images.user3,
            message: 'Hello!',
            name: 'Alex -',
        },
        {
            image: Constants.Images.user4,
            message: 'Hello!',
            name: 'Jordan -',
        },
        {
            image: Constants.Images.user5,
            message: 'Hello!',
            name: 'Mike -',
        },
        {
            image: Constants.Images.user6,
            message: 'Hello!',
            name: 'Carey -',
        },
    ]

    const renderItem = ({item}) => (
        <View style={LiveFeedStyles.commentView}>
            <Image source={item.image} style={LiveFeedStyles.commentImage} />
            <View style={LiveFeedStyles.nameView}>
                <Text style={LiveFeedStyles.nameText}>{item.name}</Text>
                <Text style={LiveFeedStyles.commentText}>{item.message}</Text>
            </View>
        </View>
    )

    const UserProfileDetails = async () => {
        const {user_id, addProfileDetail} = props
        console.log('userid==>', user_id)
        const token = await getAuthToken()
        // console.log('====>', token);
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        setIsLoading(true)
        Axios.post(
            API.PROFILE_DETAILS,
            {
                user_id: user_id,
            },
            config
        )
            .then((response) => {
                console.log('RESPONSE', response)
                console.log('===>My Profile', response)
                if (response.data.data.result) {
                    setUser(response?.data?.data?.result)
                    addProfileDetail(response?.data?.data?.result)
                    // setUserId(response?.data?.data?.result?.user_id.toString())
                    console.log(
                        'profile response==>',
                        response?.data?.data?.result
                    )
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    React.useEffect(() => {
        UserProfileDetails()
    }, [])

    return (
        <SafeAreaView style={[LiveFeedStyles.container]}>
            <ScrollView>
                <View>
                    <ImageBackground
                        source={Constants.Images.liveImg}
                        style={LiveFeedStyles.profileIcon}>
                        <Image
                            source={Constants.Images.liveLogo}
                            resizeMode="contain"
                            style={LiveFeedStyles.liveLogo}
                        />
                        <View style={LiveFeedStyles.overlappingStyle}>
                            <View style={LiveFeedStyles.flexRow}>
                                <View style={LiveFeedStyles.levelStyle}>
                                    <Text style={LiveFeedStyles.liveText}>
                                        Live
                                    </Text>
                                </View>
                                <Text style={LiveFeedStyles.followerView}>
                                    {'187 Viewers'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => {}}>
                                <Image
                                    source={Constants.Images.rotatePhone}
                                    resizeMode="contain"
                                    style={LiveFeedStyles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={LiveFeedStyles.sectionMainView}>
                    <View style={LiveFeedStyles.flexRow}>
                        <Image
                            source={Constants.Images.user1}
                            style={LiveFeedStyles.liveUserIcone}
                        />
                        <View style={LiveFeedStyles.sectionView}>
                            <Text style={LiveFeedStyles.heading}>
                                {'Cameron Williamson, 23'}
                            </Text>
                            <Text style={LiveFeedStyles.subHeading}>
                                {'text'}
                            </Text>
                        </View>
                    </View>
                    <View style={LiveFeedStyles.sectionView}>
                        <View style={LiveFeedStyles.heartView}>
                            <TouchableOpacity
                                onPress={() => {
                                    setLike(!like)
                                }}>
                                <Image
                                    source={
                                        like
                                            ? Constants.Images.selectedHeart
                                            : Constants.Images.heart
                                    }
                                    style={LiveFeedStyles.heartIcon}
                                />
                            </TouchableOpacity>
                            <Text style={LiveFeedStyles.followText}>
                                {'500'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={LiveFeedStyles.commentHeader}>
                        {'Comments'}
                    </Text>
                </View>
                <FlatList data={comment} renderItem={renderItem} />
            </ScrollView>
            <View style={LiveFeedStyles.searchView}>
                <TextInput
                    placeholder="Write your message..."
                    placeholderTextColor={Constants.Colors.GREY_BORDER}
                    value={message}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setMessage(text)
                    }}
                    style={LiveFeedStyles.groupName}
                    underlineColorAndroid={Constants.Colors.TRANSPARENT}
                />
                <Image
                    source={Constants.Images.send}
                    style={LiveFeedStyles.messageIcon}
                />
            </View>
            {showPopup && (
                <PermisionPopup
                    onLogout={() => setShowPopup(!showPopup)}
                    onCancel={() => setShowPopup(false)}
                />
            )}
        </SafeAreaView>
    )
}

const mapStateToProps = ({
    profile: {
        image,
        full_name,
        age,
        time,
        gender,
        motto_description,
        followingCount,
        followerCount,
        groupCount,
        postCount,
        level,
        address,
    },
    auth: {user_id},
}) => ({
    image,
    full_name,
    age,
    gender,
    level,
    time,
    motto_description,
    user_id,
    followingCount,
    followerCount,
    groupCount,
    postCount,
    address,
})
const mapDispatchToProps = {
    addProfileDetail: (params) => setProfileDetails(params),
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveFeed)
