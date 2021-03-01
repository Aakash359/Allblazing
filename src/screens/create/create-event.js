import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {CreateEventStyles} from '../../styles'
import Constants from '../../constants'
import {func, shape} from 'prop-types'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import {withTranslation} from 'react-i18next'
import {Alert} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../constants/colors'
import DatePickerAI from '../../components/popups/date-picker'
import {DatePicker} from 'react-native-wheel-picker-android'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import moment from 'moment'
import {Platform} from 'react-native'
import {getAuthToken} from '../../helpers/auth'
import API from '../../constants/baseApi'
import Axios from 'axios'
class CreateEvent extends Component {
    constructor(props) {
        super(props)
        this.actionSheetRef = React.createRef()
        this.state = {
            photo: '',
            name: '',
            address1: '',
            address2: '',
            date: '',
            description: '',
            time: '',
            isLoading: false,
            isEnabled: false,
            EventTypeSelectedId: null,
            EventCategorySelectedId: null,
            eventType: [
                {
                    id: 1,
                    name: 'Individual',
                },
                {
                    id: 2,
                    name: 'Group',
                },
            ],
            Category: [],
            tempDateTime: new Date(),
            showDate: false,
            tempDate: new Date(),
            showTime: false,
        }
    }

    getEventCategory = async () => {
        const url = API.EVENT_CATEGORY
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            if (res?.data?.status) {
                this.setState({Category: res?.data?.data?.result})
            }
        } catch (error) {
            console.log('ERROR EVENT CATEGORY', error)
        }
    }

    NameStore = () => {
        if (this.state.photo === '') {
            Alert.alert('', 'Please select image', '')
        } else if (!this.state.EventTypeSelectedId) {
            Alert.alert('', 'Please select event type', '')
        } else if (!this.state.EventCategorySelectedId) {
            Alert.alert('', 'Please select event category', '')
        } else if (this.state.name === '') {
            Alert.alert('', 'Please enter event name', '')
        } else if (this.state.date === '') {
            Alert.alert('', 'Please enter date', '')
        } else if (this.state.time === '') {
            Alert.alert('', 'Please enter time', '')
        } else if (this.state.address1 === '') {
            Alert.alert('', 'Please enter address line 1', '')
        } else if (this.state.address2 === '') {
            Alert.alert('', 'Please enter address line 2', '')
        } else if (this.state.description === '') {
            Alert.alert('', 'Please enter description', '')
        } else if (this.state.description?.length < 50) {
            Alert.alert('', 'Please enter minimum 50 characters')
        } else {
            this.props.navigation.navigate('AddMember', {
                iseventPage: true,
                name: this.state.name,
                photo: this.state.photo,
                isEnabled: this.state.isEnabled,
                eventType: this.state.eventType?.[
                    this.state.EventTypeSelectedId - 1
                ]?.name,
                Category: this.state.EventCategorySelectedId,

                address1: this.state.address1,
                address2: this.state.address2,
                time: this.state.time,
                date: this.state.tempDateTime,
                tempDate: this.state.tempDate,
                description: this.state.description,
                imageDetails: this.state.imagedetails,
            })
        }
    }
    choosePhotosFromGallery = (index) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true,
        }).then((photo) => {
            // console.log('image details ', photo);
            const {mime, filename, data, path} = photo
            const uri = `data:${mime};base64,${data}`
            this.setState(() => {
                return {photo: photo.path, imagedetails: photo}
            })
            // console.log(photo.path);
        })
    }
    handleBtn = (Btn) => {
        this.setState({EventTypeSelectedId: Btn})
    }

    renderItem = ({item, option}) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                CreateEventStyles.halfView,
                {
                    backgroundColor:
                        this.state.EventTypeSelectedId == item.id
                            ? Colors.LIGHT_BLUE
                            : '#292929',
                },
            ]}
            onPress={() => this.handleBtn(item.id)}>
            <Text style={[CreateEventStyles.groupName]}>{item.name}</Text>
        </TouchableOpacity>
    )
    handleBtns = (Btn) => {
        this.setState({EventCategorySelectedId: Btn})
    }
    renderItems = ({item, option}) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                CreateEventStyles.halfView,
                {
                    backgroundColor:
                        this.state.EventCategorySelectedId == item.id
                            ? Colors.LIGHT_BLUE
                            : '#292929',
                },
            ]}
            onPress={() => this.handleBtns(item.id)}>
            <Text style={[CreateEventStyles.groupName]}>{item.name}</Text>
        </TouchableOpacity>
    )

    onChangeDate = (e, date) => {
        this.setState({
            date: date
                ? `${moment(date).format('dddd, Do MMM, YYYY')}`
                : this.state.date,
            tempDateTime: date || this.state.tempDateTime,
            showDate:
                Platform.OS === 'ios'
                    ? this.state.showDate
                    : !this.state.showDate,
        })
    }
    onChangeTime = (e, time) => {
        this.setState({
            time: time ? `${moment(time).format('LT')}` : this.state.time,
            tempDate: time || this.state.tempDate,
            showTime:
                Platform.OS === 'ios'
                    ? this.state.showTime
                    : !this.state.showTime,
        })
    }

    componentDidMount() {
        this.getEventCategory()
    }

    render() {
        const {
            name,
            photo,
            date,
            time,
            address1,
            address2,
            description,
            isEnabled,
            isLoading,
        } = this.state
        const {
            navigation: {goBack, navigate},
            route: {params},
            t: translate,
        } = this.props

        return (
            <SafeAreaView style={CreateEventStyles.container}>
                <ScrollView style={CreateEventStyles.innerContainer}>
                    <View style={CreateEventStyles.imageView}>
                        <TouchableOpacity
                            onPress={() => this.choosePhotosFromGallery()}>
                            {photo == '' ? (
                                <Image
                                    source={Constants.Images.imageIcon}
                                    style={CreateEventStyles.imageIcon}
                                />
                            ) : (
                                <Image
                                    source={{uri: photo}}
                                    style={{
                                        borderRadius: 16,
                                        height: '100%',
                                        width: '100%',
                                    }}
                                />
                            )}
                        </TouchableOpacity>

                        {photo == '' ? (
                            <Text style={CreateEventStyles.imageText}>
                                Add event image
                            </Text>
                        ) : null}
                    </View>
                    <View style={CreateEventStyles.liveEventView}>
                        <Text style={CreateEventStyles.groupType}>
                            Live Event
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                                this.setState({isEnabled: !isEnabled})
                            }>
                            <Image
                                source={
                                    isEnabled
                                        ? Constants.Images.toggleOn
                                        : Constants.Images.toggleOff
                                }
                                style={{
                                    marginTop: 10,
                                    alignSelf: 'center',
                                    height: 36,
                                    width: 48,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={CreateEventStyles.eventType}>Event Type</Text>
                    {/* <View style={CreateEventStyles.rowStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>this._handleBtn('01')}
              style={[CreateEventStyles.halfView,{backgroundColor: this.state.handleColor == "01" ? "#808080" : "#292929"}]}>
              <Text style={[CreateEventStyles.groupName,{color:this.state.handleColor == '01' ? 'white' : '#898989'}]}>Individual</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>this._handleBtn('02')}
              style={[CreateEventStyles.halfView,{backgroundColor: this.state.handleColor == "02" ? "#808080" : "#292929"}]}>
              <Text style={[CreateEventStyles.groupName,{color:this.state.handleColor == '02' ? 'white' : '#898989'}]}>Group</Text>
            </TouchableOpacity>
          </View> */}
                    <View style={CreateEventStyles.rowStyle}>
                        <FlatList
                            numColumns={2}
                            scrollEnabled={false}
                            data={this.state.eventType}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                    <Text style={CreateEventStyles.eventType}>
                        Event Category
                    </Text>
                    <View style={CreateEventStyles.rowStyle}>
                        <FlatList
                            numColumns={2}
                            scrollEnabled={false}
                            data={this.state.Category}
                            renderItem={this.renderItems}
                            keyExtractor={(item) => item.id}
                        />
                        {/* <TouchableOpacity
              activeOpacity={0.7}
              style={CreateEventStyles.halfView}>
              <Text style={CreateEventStyles.groupName}>Train</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={CreateEventStyles.halfView}>
              <Text style={CreateEventStyles.groupName}>Race</Text>
            </TouchableOpacity>
          </View>
          <View style={CreateEventStyles.rowStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={CreateEventStyles.halfView}>
              <Text style={CreateEventStyles.groupName}>Coach</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={CreateEventStyles.halfView}>
              <Text style={CreateEventStyles.groupName}>Club</Text>
            </TouchableOpacity> */}
                    </View>

                    <View style={CreateEventStyles.searchView}>
                        <TextInput
                            placeholder="Event Name"
                            placeholderTextColor={Constants.Colors.GREY_BORDER}
                            value={name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({name: text})
                            }}
                            style={[
                                CreateEventStyles.groupName,
                                {textAlign: 'left'},
                            ]}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({showDate: true})
                        }}>
                        <View style={CreateEventStyles.searchView}>
                            <TextInput
                                placeholder="Date"
                                placeholderTextColor={
                                    Constants.Colors.GREY_BORDER
                                }
                                value={date}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({date: text})
                                }}
                                style={CreateEventStyles.groupName}
                                underlineColorAndroid={
                                    Constants.Colors.TRANSPARENT
                                }
                                editable={false}
                            />

                            <Image
                                source={Constants.Images.calendar}
                                style={CreateEventStyles.calendarIcon}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => this.setState({showTime: true})}>
                        <View style={CreateEventStyles.searchView}>
                            <TextInput
                                placeholder="Time"
                                placeholderTextColor={
                                    Constants.Colors.GREY_BORDER
                                }
                                value={time}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    this.setState({time: text})
                                }}
                                style={CreateEventStyles.groupName}
                                underlineColorAndroid={
                                    Constants.Colors.TRANSPARENT
                                }
                                editable={false}
                            />
                            <Image
                                source={Constants.Images.clock}
                                style={CreateEventStyles.clockIcon}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={[CreateEventStyles.searchView]}>
                        <TextInput
                            placeholder="Event Address Line 1"
                            placeholderTextColor={Constants.Colors.GREY_BORDER}
                            value={address1}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({address1: text})
                            }}
                            style={[
                                CreateEventStyles.groupName,
                                {textAlign: 'left'},
                            ]}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    <View style={CreateEventStyles.searchView}>
                        <TextInput
                            placeholder="Event Address Line 2"
                            placeholderTextColor={Constants.Colors.GREY_BORDER}
                            value={address2}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({address2: text})
                            }}
                            style={[
                                CreateEventStyles.groupName,
                                {textAlign: 'left'},
                            ]}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    <View style={CreateEventStyles.searchView}>
                        <TextInput
                            multiline
                            numberOfLines={5}
                            placeholder="Description..."
                            placeholderTextColor={Constants.Colors.GREY_BORDER}
                            value={description}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({description: text})
                            }}
                            style={CreateEventStyles.description}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.NameStore()}
                        // onPress={() => navigate('AddMember',{iseventPage: true})}
                        style={CreateEventStyles.nextView}>
                        <Text style={CreateEventStyles.nextText}>
                            Create Event
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                {this.state.showDate && (
                    <View>
                        {Platform.OS === 'ios' && (
                            <TouchableOpacity
                                onPress={() => this.setState({showDate: false})}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        width: 80,
                                        paddingVertical: 5,
                                        textAlign: 'center',
                                        marginTop: 15,
                                    }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        )}
                        <RNDateTimePicker
                            testID="dateTimePicker"
                            value={this.state.tempDateTime}
                            mode="date"
                            is24Hour={true}
                            display="spinner"
                            onChange={this.onChangeDate}
                            textColor="#fff"
                            onTouchCancel={() =>
                                this.setState({
                                    showDate:
                                        Platform.OS === 'ios'
                                            ? this.state.showDate
                                            : !this.state.showDate,
                                })
                            }
                        />
                    </View>
                )}
                {this.state.showTime && (
                    <View>
                        {Platform.OS === 'ios' && (
                            <TouchableOpacity
                                onPress={() => this.setState({showTime: false})}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        width: 80,
                                        paddingVertical: 5,
                                        textAlign: 'center',
                                        marginTop: 15,
                                    }}>
                                    Done
                                </Text>
                            </TouchableOpacity>
                        )}
                        <RNDateTimePicker
                            testID="TimePicker"
                            value={this.state.tempDate}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={this.onChangeTime}
                            textColor="#fff"
                            onTouchCancel={() =>
                                this.setState({
                                    showTime:
                                        Platform.OS === 'ios'
                                            ? this.state.showTime
                                            : !this.state.showTime,
                                })
                            }
                        />
                    </View>
                )}
            </SafeAreaView>
        )
    }
}

// export default CreateEvent;

CreateEvent.propTypes = {
    loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(CreateEvent))
