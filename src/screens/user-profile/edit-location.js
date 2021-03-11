import React, {Component} from 'react'
import {Platform, View, Image, TouchableOpacity, Text} from 'react-native'
import {func, shape} from 'prop-types'
import {withTranslation} from 'react-i18next'
import {ScrollView} from 'react-native-gesture-handler'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Constants from '../../constants'
import {
    AuthStyle,
    CommonStyles,
    LocationStyles,
    UsernameStyle,
} from '../../styles'
import connect from 'react-redux/lib/connect/connect'
import {setAddress, setLocation} from '../../reducers/baseServices/profile'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import {GOOGLE_API_KEY} from '../../config/config'
import Colors from '../../constants/colors'
import API from '../../constants/baseApi'
import Axios from 'axios'
import {
    getAuthToken,
    getOtpToken,
    getUserAddress,
    getUserAge,
    getUserConnectType,
    getUserDistance,
    getUserLocation,
    getUserName,
    getUserRecentTime,
} from '../../helpers/auth'
import {Alert} from 'react-native'
import {ActivityIndicator} from 'react-native'
import {times, distanceList} from '../../data'
AntIcon.loadFont()

class EditLocation extends Component {
    onChangeText = () => {}

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            isLoading: false,
        }
    }

    onSubmitSignManual = async () => {
        const {addUserProfileDetails} = this.props
        const {
            navigation: {navigate},
        } = this.props

        this.setState({
            isLoading: true,
        })
        // markwinz06@gmail.com/mark@1234
        const name = await getUserName()
        const Age = await getUserAge()
        const Type = await getUserConnectType()
        const Distance = await getUserDistance()
        const Time = await getUserRecentTime()
        const token = (await getOtpToken()) || (await getAuthToken())
        const authToken = await getAuthToken()
        const address = await getUserAddress()
        const {latitude, longitude} = await getUserLocation()
        console.log(
            'USER DETAILS: =====',
            name,
            Age,
            Type,
            Distance,
            Time,
            'Token',
            token,
            address,
            {latitude, longitude}
        )
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        // console.log(name, Age, Type, Distance, Time);
        // console.log(config);

        const payload = {
            full_name: name,
            age: Age,
            type: Type,
            distance: Distance || distanceList[0]?.value,
            time: Time || times[0]?.value,
            latitude: latitude || 74.777899,
            longitude: longitude || 25.345678,
            level: 1,
            address: this.state.address || address || 'Select',
        }

        console.log('PAYLOAD===============>', payload)
        Axios.post(API.COMPLETE_PROFILE, payload, config)
            .then((response) => {
                console.log('response ====', response.data)
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
                                onPress: () =>
                                    authToken
                                        ? navigate('Overview')
                                        : navigate('Login'),
                            },
                        ],
                        {Cancelable: false}
                    )
                    addUserProfileDetails(response?.data)
                    console.log('res===>kkkkk' + JSON.stringify(response.data))
                    // navigate('Login');
                }
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    setAddress = async () => {
        this.setState({isLoading: true})
        console.log()
        const {address} = this.state
        const {addAddress} = this.props
        const {
            navigation: {navigate},
        } = this.props

        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            isLoading: true,
        })
        if (this.state.address === '') {
            Alert.alert('', 'Please select address', '')
        } else {
            Axios.post(
                API.UPDATE_PROFILE,
                {
                    address,
                },
                config
            )
                .then((response) => {
                    console.log('Address UPDATE', response)
                    if (response?.data?.code === 200) {
                        Alert.alert(
                            '',
                            response?.data?.message ?? '',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () =>
                                        console.log('Cancel pressed'),
                                    style: 'Cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => navigate('EditProfile'),
                                },
                            ],
                            {Cancelable: false}
                        )
                        addAddress(address)
                        console.log('ADDRESS:==>', address)
                        // navigate('EditProfile');
                    }
                })
                .catch((e) => {
                    console.log('ADDRESS UPDATE ERROR', e)
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
                                onPress: () => navigate('EditProfile'),
                            },
                        ],
                        {Cancelable: false}
                    )
                })
                .finally(() => {
                    this.setState({
                        Loading: false,
                    })
                })
        }
    }

    render() {
        const {
            navigation: {goBack},
            t: translate,
        } = this.props

        return (
            <View style={CommonStyles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={
                        Platform.OS === 'ios' ? 'on-drag' : 'none'
                    }
                    keyboardShouldPersistTaps="always">
                    <View style={UsernameStyle.wrapper}>
                        <View style={UsernameStyle.inputWrapper}>
                            {/* <View
// activeOpacity={1}
// style={[UsernameStyle.ageButton, LocationStyles.location]}
> */}
                            {/* <Image
source={Constants.Images.myLocation}
style={LocationStyles.locationIcon}
/> */}
                            {/* <Text style={LocationStyles.currentLocationText}>
{'Santee, United States'}
</Text> */}

                            <GooglePlacesAutocomplete
                                styles={{
                                    container: {
                                        flex: 1,
                                        width: '88%',
                                        alignItems: 'center',
                                    },
                                    textInputContainer: {
                                        flexDirection: 'row',
                                        width: '100%',
                                    },
                                    // textInput: {
                                    // color: Colors.WHITE,
                                    // backgroundColor: Colors.LIGHT_BLACK
                                    // },
                                    predefinedPlacesDescription: {
                                        color: '#1faadb',
                                    },
                                }}
                                placeholder="Search"
                                placeholderColor="#fff"
                                onPress={(data, details = null) => {
                                    // 'details' is provided when fetchDetails = true
                                    console.log(data, details)
                                    this.setState({address: data.description})
                                }}
                                query={{
                                    key: GOOGLE_API_KEY,
                                    language: 'en',
                                }}
                            />

                            {/* <Text style={LocationStyles.orText}>{'or'}</Text>
<TouchableOpacity
activeOpacity={1}
style={[UsernameStyle.ageButton, LocationStyles.margin]}>
<Text style={UsernameStyle.age}>{'United State'}</Text>
<AntIcon name="down" size={25} color="#5EC2CA" />
</TouchableOpacity>
<TouchableOpacity
activeOpacity={1}
style={[UsernameStyle.ageButton, LocationStyles.margin]}>
<Text style={UsernameStyle.age}>{'Santee'}</Text>
<AntIcon name="down" size={25} color="#5EC2CA" />
</TouchableOpacity> */}
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[AuthStyle.saveBtn, LocationStyles.saveBtn]}
                    onPress={
                        !this.state.isLoading
                            ? this.props.route?.params?.signUpManual
                                ? this.onSubmitSignManual
                                : this.setAddress
                            : null
                    }>
                    {this.state.isLoading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text
                            style={[
                                AuthStyle.buttonText,
                                {color: Constants.Colors.WHITE},
                            ]}>
                            {translate('Save')}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        )
    }
}

EditLocation.propTypes = {
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

// export default withTranslation()(EditLocation);

const mapStateToProps = ({auth: {email}}) => ({
    email,
})

const mapDispatchToProps = {
    addLocation: (params) => setLocation(params),
    addAddress: (address) => setAddress(address),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(EditLocation))
