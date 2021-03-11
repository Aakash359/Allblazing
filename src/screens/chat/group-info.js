import React from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
} from 'react-native'
import {bool, func, shape} from 'prop-types'
import {ScrollView} from 'react-native-gesture-handler'
import {HomeStyles, ChatStyles} from '../../styles'
import {GroupsInfo, RemoveMemberPopup} from '../../components'
import Constants, {Colors} from '../../constants'
import API from '../../constants/baseApi'
import Axios from 'axios'
import {getAuthToken} from '../../helpers/auth'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-crop-picker'
import {Alert} from 'react-native'
import {Platform} from 'react-native'
import {ActivityIndicator} from 'react-native'

class GroupInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            removeMemberPopup: false,
            groupDetails: {},
            IsLoadingImage: false,
            imageUrl: '',
            memberLoading: true,
            members: [],
            removeLoader: 0,
        }
    }

    getGroupDetails = async () => {
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type: 'active',
            },
        }
        const {groupId} = this.props.route.params
        const url = `${API.GROUP_DETAILS}/${groupId}`

        try {
            const res = await Axios.get(url, config)
            console.log('GROUP DETAILS', res?.data?.data)
            this.setState({groupDetails: res?.data?.data}, () => {
                this.groupMembers()
            })
        } catch (error) {
            console.log('ERROR GROUP DETAILS', error)
        }
    }

    groupMembers = async () => {
        // this.setState({memberLoading: true})
        const {
            groupDetails: {group_id},
        } = this.state
        const url = API.GROUP_MEMBERS
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const data = {
            group_id,
        }

        try {
            const res = await Axios.post(url, data, config)
            console.log('GROUP MEMBERS: ', res)
            if (res?.data?.status) {
                let allMembers = res?.data?.data?.result
                let members = allMembers.reduce((member, instance) => {
                    if (instance?.group_member) {
                        member.push(instance)
                    }
                    return member
                }, [])

                let nonMembers = allMembers.reduce((member, instance) => {
                    if (!instance?.group_member) {
                        member.push(instance)
                    }
                    return member
                }, [])

                this.setState({
                    members: [members, nonMembers],
                    memberLoading: false,
                })
            } else this.setState({memberLoading: false})
        } catch (error) {
            console.log('ERROR GROUP MEMBERS: ', error)
            this.setState({memberLoading: false})
        }
    }

    componentDidMount() {
        this.unSubscribe = this.props.navigation.addListener('focus', () => {
            this.getGroupDetails()
        })
    }

    componentWillUnmount() {
        this.unSubscribe()
    }

    onPressOk = () => {
        this.setState({removeMemberPopup: true})
    }

    renderItem = ({item}) => {
        const {
            route: {params},
            navigation: {navigate},
        } = this.props

        return (
            <GroupsInfo
                hasCheckBox={params?.hasCheckBox}
                hasTick={params?.hasTick}
                navigation={navigate}
                onPressButton={() => this.removeMember(item?.user_id)}
                group={item}
                isLoading={this.state.removeLoader === item?.user_id}
            />
        )
    }

    removeMember = async (user_id) => {
        this.setState({removeLoader: user_id})
        const {
            groupDetails: {group_id},
        } = this.state
        const url = `${API.GROUP_UPDATE}/${group_id}`
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        let payload = new FormData()
        payload.append('remove_member[1]', user_id)

        try {
            const res = await Axios.post(url, payload, config)
            console.log('REMOVE MEMBER: ', res)
            if (res?.data?.status) {
                this.setState({removeLoader: 0})
                this.groupMembers()
            } else {
                this.setState({removeLoader: 0})
                Alert.alert('Remove Member', res?.data?.message)
            }
        } catch (error) {
            this.setState({removeLoader: 0})
            Alert.alert('Remove Member', 'Unable to remove member.')
        }
    }

    chooseImage = async (imageIndex) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true,
        }).then((image) => {
            ImageResizer.createResizedImage(
                Platform.OS === 'android'
                    ? image.path
                    : image.path.replace('file://', ''),
                image.width / 3,
                image.height / 3,
                'JPEG',
                85
            )
                .then(async ({uri}) => {
                    console.log('URI', uri)
                    const token = await getAuthToken()
                    const config = {
                        headers: {Authorization: `Bearer ${token}`},
                    }
                    this.setState({
                        IsLoadingImage: true,
                    })
                    const formdata = new FormData()
                    let data = {}
                    formdata.append('image', {
                        uri: uri,
                        name: 'test.jpg',
                        type: 'image/jpg',
                    })
                    const {groupId} = this.props.route.params

                    const url = `${API.GROUP_UPDATE}/${groupId}`
                    console.log(url, config)
                    console.log(formdata)

                    Axios.post(url, formdata, config)
                        .then((response) => {
                            console.log('GROUP IMAGE UPDATE', response)
                            if (response?.data?.code === 200) {
                                this.setState({imageUrl: uri})

                                Alert.alert('', response?.data?.message ?? '')
                            } else {
                                Alert.alert('', response?.data?.message ?? '')
                            }
                        })
                        .catch((error) => {
                            console.log('ERROR', error)
                            Alert.alert('', error?.response?.data ?? '')
                        })
                        .finally(() => {
                            this.setState({
                                IsLoadingImage: false,
                            })
                        })

                    console.log('compressed Image true', image.height)
                })
                .catch((err) => {
                    console.log('compressed Image false== ', err)
                })

            console.log('aaaaa', image.path, imageIndex)
        })
    }

    render() {
        const {
            navigation: {navigate},
        } = this.props
        const {removeMemberPopup, groupDetails} = this.state
        const {group} = this.props.route.params
        const group_image = this.state.imageUrl
            ? {uri: this.state.imageUrl}
            : groupDetails === 'N/A'
            ? Constants.Images.groupDetails
            : {uri: groupDetails?.group_image}

        return (
            <View style={HomeStyles.container}>
                <ScrollView>
                    <View>
                        <ImageBackground
                            source={group_image}
                            imageStyle={ChatStyles.borderRadius}
                            style={ChatStyles.profileIcon}>
                            {this.state.IsLoadingImage && (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.WHITE}
                                />
                            )}

                            <View style={ChatStyles.overlappingStyle}>
                                <View>
                                    <Text style={ChatStyles.heading}>
                                        {groupDetails?.group_name}
                                    </Text>
                                    <Text style={ChatStyles.subHeading}>
                                        {group?.userInfo?.userData?.length || 0}
                                        {group?.userInfo?.userData?.length > 1
                                            ? ' Members'
                                            : ' Member'}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={this.chooseImage}>
                                    <Image
                                        source={Constants.Images.edit}
                                        resizeMode="contain"
                                        style={ChatStyles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={ChatStyles.groupNameContainer}>
                        <View>
                            <Text style={ChatStyles.groupNameHeading}>
                                {groupDetails?.group_name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                navigate('EditGroupName', {
                                    groupName: groupDetails?.group_name,
                                    groupId: group?.group_id,
                                })
                            }}>
                            <Image
                                source={Constants.Images.edit}
                                resizeMode="contain"
                                style={ChatStyles.iconGroupName}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={ChatStyles.groupDiscContainer}>
                        <View style={ChatStyles.groupDiscInnerContainer}>
                            <Text style={ChatStyles.groupDiscHeading}>
                                {'Description'}
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    navigate('EditGroupDisc', {
                                        groupDescription:
                                            groupDetails?.group_description,
                                        groupId: group?.group_id,
                                    })
                                }}>
                                <Image
                                    source={Constants.Images.edit}
                                    resizeMode="contain"
                                    style={ChatStyles.iconGroupName}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={ChatStyles.discText}>
                            {groupDetails?.group_description}
                        </Text>
                    </View>
                    <View>
                        <Text style={ChatStyles.groupMemberHeading}>
                            {'Members'}
                        </Text>
                    </View>
                    {this.state.memberLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={Constants.Colors.WHITE}
                        />
                    ) : (
                        <FlatList
                            data={this.state.members[0]}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => `${index}`}
                        />
                    )}
                </ScrollView>
                {removeMemberPopup && (
                    <RemoveMemberPopup
                        onLogout={this.removeMemberPopup}
                        onCancel={() =>
                            this.setState({removeMemberPopup: false})
                        }
                    />
                )}
            </View>
        )
    }
}

GroupInfo.propTypes = {
    navigation: shape({
        navigate: func,
        setParams: func,
    }).isRequired,
    route: shape({params: shape({isMapView: bool})}).isRequired,
}

export default GroupInfo
