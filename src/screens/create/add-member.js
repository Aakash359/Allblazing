import React, {Component} from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    FlatList,
    Alert,
    Platform,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Constants, {Colors} from '../../constants'
import {AddMemberStyles, HeaderStyles} from '../../styles'
import API from '../../constants/baseApi'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'

import {func, shape} from 'prop-types'
import {
    getAuthToken,
    getGroupImage,
    getGroupName,
    getUserId,
} from '../../helpers/auth'
import axios from 'axios'
import {ActivityIndicator} from 'react-native'
import Axios from 'axios'
import Geolocation from '@react-native-community/geolocation'
import {PermissionsAndroid} from 'react-native'
import Permissions, {PERMISSIONS, request} from 'react-native-permissions'

class AddMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ischecked: false,
            UserListLoading: false,
            isLoading: false,
            list: [],
            groupList: [],
            arrSelectedUsers: [],
            location: {},
        }
    }
    // const [checked, setCheck] = useState(false);
    // const navigation = useNavigation();
    // const [isLoading,setIsLoding]=useState(false);

    selectAll = () => {
        const {list, groupList, arrSelectedUsers} = this.state
        const {iseventPage, eventType} = this.props.route.params
        let pick = iseventPage && eventType === 'Group' ? 'group_id' : 'user_id'
        let selectedList = []
        if (iseventPage && eventType === 'Group') {
            selectedList = groupList.reduce((data, instance) => {
                data.push(instance[pick])
                return data
            }, [])
        } else {
            selectedList = list.reduce((data, instance) => {
                data.push(instance[pick])
                return data
            }, [])
            // console.log("ALL SELECTED LIST", selectedList);
        }
        this.setState({arrSelectedUsers: selectedList})
    }

    setHeaderRight = () => {
        const {iseventPage, eventType} = this.props.route.params

        this.props.navigation.setOptions({
            headerRight: () => {
                console.log(eventType)
                if (iseventPage && eventType === 'Individual') return null
                else {
                    return (
                        <TouchableOpacity
                            style={HeaderStyles.row}
                            onPress={this.selectAll}>
                            <Text style={HeaderStyles.headerRightTextStyle}>
                                Select All
                            </Text>
                        </TouchableOpacity>
                    )
                }
            },
            headerTitle:
                iseventPage && eventType === 'Group'
                    ? 'Add Group'
                    : 'Add Members',
        })
    }

    componentDidMount() {
        const {iseventPage, eventType} = this.props.route.params
        if (iseventPage && eventType === 'Group') {
            this.GroupList()
        } else {
            this.UserList()
        }
        this.setHeaderRight()
    }

    UserList = async () => {
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        // console.log('token===>', config);
        this.setState({
            UserListLoading: true,
        })
        axios
            .get(API.USER_LIST, config)
            .then((response) => {
                console.log('response ====', response.data.data)
                if (response?.data?.data?.result) {
                    // console.log('===>response', response.data.data.result);
                    this.setState({list: response?.data?.data?.result})
                }
            })
            .finally(() => {
                this.setState({
                    UserListLoading: false,
                })
            })
    }

    GroupList = async () => {
        this.setState({
            UserListLoading: true,
        })
        const token = await getAuthToken()
        const url = API.GROUP_LISTING
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type: 'active',
            },
        }
        try {
            const res = await Axios.get(url, config)
            console.log('GROUP LISTING', res?.data?.data)
            if (res?.data?.status) {
                this.setState({
                    groupList: res?.data?.data?.result,
                    UserListLoading: false,
                })
            }
        } catch (error) {
            console.log('ALL GROUPS ERROR', error)
        }
    }

    CreateGroup = async () => {
        const {addCreateGroupDetail} = this.props
        const {
            navigation: {goBack, navigate},
            route: {params},
            t: translate,
        } = this.props
        const {arrSelectedUsers} = this.state
        if (arrSelectedUsers.length < 1) {
            Alert.alert('', 'Please select member!')
            return
        }
        const name = this.props.route.params.name
        const photo = this.props.route.params.photo
        const description = this.props.route.params.description
        const Type = this.props.route.params.GroupType
        const imageDetails = this.props.route.params.imageDetails
        const user_id = await getUserId()
        console.log('===>id', Type)
        this.setState({
            isLoading: true,
        })
        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        console.log('token===>', config)

        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('image', {
            uri:
                Platform.OS === 'android'
                    ? photo
                    : photo.replace('file://', ''),
            name: 'test.jpg',
            type: 'image/jpg',
        })
        // formdata.append('image', photo);
        formdata.append('type', Type)
        formdata.append('member[1]', this.props.user_id)
        for (let index = 0; index < arrSelectedUsers.length; index++) {
            const element = arrSelectedUsers[index]

            formdata.append(`member[${index + 2}]`, element)
        }

        formdata.append('description', description)

        console.log('===>FormData', formdata)
        this.setState({
            isLoading: true,
        })
        axios
            .post(API.CREATE_GROUP, formdata, config)
            .then((response) => {
                console.log('response ======>', response.data)
                if (response?.data?.code === 401) {
                    Alert.alert('', response?.data?.message ?? '')
                }
                if (response?.data?.code === 200) {
                    Alert.alert(
                        '',
                        response?.data?.message ?? '',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'Cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => navigate('Home'),
                            },
                        ],
                        {Cancelable: false}
                    )
                    // addCreateGroupDetail(response?.data?.data);
                    // console.log('====>Response', response?.data?.data);
                    // navigate('Home');
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    getGeoLocation = async (submit = false) => {
        console.log('GETTING LOCATION')

        Geolocation.getCurrentPosition(
            (position) => {
                console.log('POSTION', position)
                this.setState({location: position.coords}, () => {
                    console.log('Location', this.state.location)
                    this.OnEvent()
                })
            },
            (e) => {
                console.log('POSITION ERROR', e.message)
            }
        )
    }

    getLocation = async (submit = false) => {
        if (Platform.OS === 'ios') {
            const permissionStatus = await Permissions.check(
                PERMISSIONS.IOS.LOCATION_ALWAYS
            )
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((res) => {
                console.log('PERMISSIN ASK IOS', res)
            })
            Geolocation.requestAuthorization()
            this.getGeoLocation(submit)
        } else {
            let granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'AllBlazing',
                    message: 'AllBlazing access to your location ',
                }
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.getGeoLocation(submit)
            } else {
                Alert.alert(
                    'AllBalzing',
                    'Please allow location to go ahead',
                    [
                        {
                            text: 'Ok',
                            onPress: () => {
                                Linking.canOpenURL('app-settings:').then(
                                    (s) => {
                                        if (s) {
                                            return Linking.openURL(
                                                'app-settings:'
                                            )
                                        } else {
                                            Alert.alert(
                                                'AllBlazing',
                                                'Please open settings manually.'
                                            )
                                        }
                                    }
                                )
                            },
                        },
                    ],
                    {cancelable: false}
                )
            }
        }
    }

    OnEvent = async () => {
        this.setState({isLoading: true})
        const {
            navigation: {goBack, navigate},
            route: {params},
            t: translate,
        } = this.props
        const {arrSelectedUsers} = this.state
        if (arrSelectedUsers.length < 1) {
            Alert.alert('', 'Please select member!')
            this.setState({isLoading: false})
            return
        }
        const name = this.props.route.params.name
        const address1 = this.props.route.params.address1
        const address2 = this.props.route.params.address2
        const photo = this.props.route.params.photo
        const date = this.props.route.params.date
        const eventType = this.props.route.params.eventType
        const Category = this.props.route.params.Category
        const time = this.props.route.params.time
        const tempDate = this.props.route.params.tempDate
        const isEnabled = this.props.route.params.isEnabled
        const description = this.props.route.params.description
        const imageDetials = this.props.route.params.imageDetails
        const user_id = await getUserId()

        const {
            location: {latitude, longitude},
        } = this.state

        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        const formdata = new FormData()
        formdata.append('name', name)
        formdata.append('image', {
            uri:
                Platform.OS === 'android'
                    ? photo
                    : photo.replace('file://', ''),
            name: imageDetials?.filename || 'image.jpg',
            type: imageDetials.mime,
        })
        let pick = eventType === 'Group' ? 'group' : 'member'
        formdata.append('event_type', eventType)
        formdata.append('description', description)
        formdata.append('time', new Date(tempDate).getTime())
        formdata.append('date', new Date(date).getTime())
        formdata.append('category_id', Category)
        formdata.append('status', isEnabled ? '1' : '0')
        formdata.append('address_first', address1)
        formdata.append('latitude', latitude)
        formdata.append('longitude', longitude)
        formdata.append('latitude_first', latitude)
        formdata.append('longitude_first', longitude)
        formdata.append('address_second', address2)
        if (eventType === 'Group') {
            for (let index = 0; index < arrSelectedUsers.length; index++) {
                const element = arrSelectedUsers[index]
                formdata.append(`${pick}[${index + 1}]`, element)
            }
        } else {
            formdata.append(`member_id`, arrSelectedUsers[0])
            // for (let index = 0; index < arrSelectedUsers.length; index++) {
            //     const element = arrSelectedUsers[index]
            //     formdata.append(`${pick}[${index + 2}]`, element)
            // }
        }

        console.log(formdata)

        axios
            .post(API.EVENT, formdata, config)
            .then((response) => {
                console.log('EVENT CREATE response ======>', response)
                if (response?.data?.code === 401) {
                    Alert.alert('', response?.data?.message ?? '')
                }
                if (response?.data?.code === 200) {
                    Alert.alert(
                        '',
                        response?.data?.message ?? '',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel pressed'),
                                style: 'Cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => navigate('Home'),
                            },
                        ],
                        {Cancelable: false}
                    )
                    // addCreateGroupDetail(response?.data?.data);
                    // console.log('====>Response', response?.data?.data);
                    navigate('Home')
                }
            })
            .catch((e) => {
                Alert.alert(
                    '',
                    e?.message ?? '',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'Cancel',
                        },
                        {
                            text: 'OK',
                            onPress: () => console.log('Ok pressed'),
                        },
                    ],
                    {Cancelable: false}
                )
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    OnPress = (item) => {
        const {iseventPage, eventType} = this.props.route.params
        let pick = iseventPage && eventType === 'Group' ? 'group_id' : 'user_id'
        console.log('item.user_id ', item[pick])
        // let oldUserList = this.state.
        if (iseventPage && eventType === 'Individual') {
            this.setState({arrSelectedUsers: [item[pick]]})
        } else {
            if (this.state.arrSelectedUsers.includes(item[pick])) {
                this.removePeople(item[pick])
            } else {
                this.setState({
                    arrSelectedUsers: [
                        ...this.state.arrSelectedUsers,
                        item[pick],
                    ],
                })
            }
        }

        console.log('Selected Members', this.state.arrSelectedUsers)
    }

    removePeople(e) {
        var array = [...this.state.arrSelectedUsers] // make a separate copy of the array
        var index = array.indexOf(e)
        if (index !== -1) {
            array.splice(index, 1)
            this.setState({arrSelectedUsers: array})
        }
    }

    getMembers = (members) => {
        // let members = group?.userInfo?.userData || []
        let nameMembers = members.filter((i) => i?.full_name)
        let getThreeMembers = nameMembers
            .slice(0, nameMembers.length > 3 ? 3 : nameMembers.length)
            .map((mem) => mem?.full_name)
        let res = ''
        getThreeMembers.map((name) => (res += `${name.split(' ')[0]}, `))
        res = res.slice(0, -2) + ' '
        if (nameMembers.length) {
            if (members.length > 3) {
                return (res += `and ${
                    members.length - getThreeMembers.length
                } others`)
            } else return `${res}`
        } else {
            return members.length + ' others'
        }
    }

    renderItem = ({item}) => {
        const image = item?.image
            ? item?.image === 'N/A'
                ? Constants.Images.tabBarProfile
                : {uri: item?.image}
            : Constants.Images.tabBarProfile
        const {iseventPage, eventType} = this.props.route.params
        let pick = iseventPage && eventType === 'Group' ? 'group_id' : 'user_id'

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                // onPress={() => this.setState({ischecked: !this.state.ischecked})}
                onPress={() => this.OnPress(item)}
                style={AddMemberStyles.container}>
                <View style={[AddMemberStyles.userWrapper, {maxWidth: '60%'}]}>
                    <View
                        style={{
                            backgroundColor: Colors.LIGHT_RED,
                            borderRadius: 10,
                        }}>
                        <Image
                            source={image}
                            style={AddMemberStyles.userImage}
                            resizeMode="cover"
                        />
                    </View>
                    <View>
                        <Text style={AddMemberStyles.username}>
                            {iseventPage && eventType === 'Group'
                                ? item?.name
                                : item.full_name}
                        </Text>
                        <View>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={AddMemberStyles.location}>
                                {iseventPage && eventType === 'Group'
                                    ? this.getMembers(item?.userInfo?.userData)
                                    : item?.address}
                            </Text>
                        </View>
                    </View>
                </View>
                <Image
                    source={
                        this.state.arrSelectedUsers.includes(item[pick])
                            ? Constants.Images.checkbox
                            : Constants.Images.checkoff
                    }
                    resizeMode="contain"
                    style={AddMemberStyles.icon}
                />
            </TouchableOpacity>
        )
    }

    render() {
        // const {nam} = this.state;

        const {
            navigation: {goBack, navigate, getParam},
            route: {params},
            t: translate,
        } = this.props
        const {iseventPage, eventType} = params

        return (
            <View style={{flex: 1}}>
                {this.state.UserListLoading ? (
                    <View
                        style={{
                            height: '90%',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <ActivityIndicator color="white" size={25} />
                    </View>
                ) : (
                    <FlatList
                        data={
                            iseventPage && eventType === 'Group'
                                ? this.state.groupList
                                : this.state.list
                        }
                        renderItem={this.renderItem}
                        keyExtractor={(item, i) => i}
                        ListEmptyComponent={() => {
                            return (
                                // <View style={{justifyContent: 'center', alignItems="center"}}>
                                <Text style={{color: Constants.Colors.WHITE}}>
                                    No Data Found
                                </Text>
                                // </View>
                            )
                        }}
                    />
                )}

                <TouchableOpacity
                    activeOpacity={0.7}
                    // onPress={() => navigation.navigate('AddMember')}
                    // onPress={this.CreateGroup}
                    // onPress={this.OnEvent}
                    onPress={() =>
                        !this.state.isLoading
                            ? this.props.route.params.iseventPage
                                ? this.getLocation()
                                : this.CreateGroup()
                            : null
                    }
                    style={AddMemberStyles.nextView}>
                    {this.state.isLoading ? (
                        <ActivityIndicator color="white" size={25} />
                    ) : (
                        <View>
                            {this.props.route.params.iseventPage ? (
                                <Text style={AddMemberStyles.nextText}>
                                    Create Event
                                </Text>
                            ) : (
                                <Text style={AddMemberStyles.nextText}>
                                    Create Group
                                </Text>
                            )}
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        )
    }
}

// export default AddMember;
AddMember.propTypes = {
    loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({profile: {user_id}}) => {
    return {
        user_id,
    }
}

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
    addCreateGroupDetail: (params) => setCreateGroupDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(AddMember))
