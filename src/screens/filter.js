import React from 'react'
import {
    ScrollView,
    TextInput,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {func} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../constants'
import {AuthStyle, CommonStyles, FilterStyles} from '../styles'
import {distanceList, levels} from '../data'
import {Alert} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import {GOOGLE_API_KEY} from '../config/config'
import Axios from 'axios'

const Filter = ({t: translate, navigation: {goBack, navigate}}) => {
    const [isEnabled, setIsEnabled] = React.useState(true)
    const [connect, setConnectType] = React.useState('train')
    const [distance, setDistance] = React.useState(null)
    const [gender, setGender] = React.useState('male')
    const [selectedLevel, setLevel] = React.useState(null)
    const [location, setLocation] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [address, setAddress] = React.useState(null)

    const applyFilters = () => {
        if (!location?.latitude || !location?.longitude) {
            return Alert.alert(
                'Filter',
                'Location not found. Please search your location.'
            )
        }
        if (connect === 'train' && !selectedLevel) {
            return Alert.alert('Filter', 'Please select a level')
        }
        if (connect === 'race' && !distance) {
            return Alert.alert('Filter', 'Please select a distance')
        }
        navigate('Events', {
            isEnabled,
            connect,
            distance: parseInt(distance),
            gender,
            selectedLevel: parseInt(selectedLevel),
            location,
            filter: true,
        })
    }

    const clearFilters = () => {
        setIsEnabled(true)
        setConnectType('train')
        setDistance(null)
        setGender(null)
        setLevel(null)
        setLocation(null)
        setShow(false)
        setAddress(null)
        goBack()
    }

    const getCoords = async (address) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
        try {
            const res = await Axios.get(url)
            const {
                lat: latitude,
                lng: longitude,
            } = res?.data.results[0].geometry?.location
            setLocation({latitude, longitude})
        } catch (error) {
            console.log('ERROR ADDRESS COORDS: ', error)
        }
    }

    return (
        <>
            <View style={CommonStyles.container}>
                <ScrollView>
                    <View style={FilterStyles.wrapper}>
                        <Text style={FilterStyles.header}>
                            {translate('filters.Location')}
                        </Text>
                        <View
                            style={[
                                FilterStyles.row,
                                isEnabled && FilterStyles.switchOn,
                            ]}>
                            <Text style={FilterStyles.subHeader}>Near Me</Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setIsEnabled(!isEnabled)}>
                                <Image
                                    source={
                                        isEnabled
                                            ? Constants.Images.toggleOn
                                            : Constants.Images.toggleOff
                                    }
                                    style={FilterStyles.switch}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setShow(true)}>
                            <View style={FilterStyles.input}>
                                <View
                                    style={[
                                        FilterStyles.searchInput,
                                        {justifyContent: 'center'},
                                    ]}>
                                    <Text
                                        style={{
                                            color: address
                                                ? Constants.Colors.WHITE
                                                : Constants.Colors.GRAY,
                                            fontSize: 16,
                                        }}>
                                        {address ||
                                            translate('filters.SearchLocation')}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text style={FilterStyles.header}>
                            {translate('filters.Connect')}
                        </Text>
                        <View
                            style={[FilterStyles.row, FilterStyles.connectRow]}>
                            <TouchableOpacity
                                onPress={() => setConnectType('train')}
                                activeOpacity={0.7}
                                style={FilterStyles.radio}>
                                <Ionicons
                                    name={
                                        connect === 'train'
                                            ? 'ios-radio-button-on-outline'
                                            : 'ios-radio-button-off-outline'
                                    }
                                    size={25}
                                    color={
                                        connect === 'train'
                                            ? Constants.Colors.WHITE
                                            : Constants.Colors.TEXT_COLOR2
                                    }
                                />
                                <Text style={FilterStyles.subHeader}>
                                    {translate('filters.Train')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setConnectType('race')}
                                activeOpacity={0.7}
                                style={FilterStyles.radio}>
                                <Ionicons
                                    name={
                                        connect === 'race'
                                            ? 'ios-radio-button-on-outline'
                                            : 'ios-radio-button-off-outline'
                                    }
                                    size={25}
                                    color={
                                        connect === 'race'
                                            ? Constants.Colors.WHITE
                                            : Constants.Colors.TEXT_COLOR2
                                    }
                                />
                                <Text style={FilterStyles.subHeader}>
                                    {translate('filters.Race')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={FilterStyles.header}>
                            {connect === 'train'
                                ? `${translate('filters.Level')}*`
                                : translate('filters.Distance')}
                        </Text>
                        {connect === 'train' ? (
                            <View
                                style={[
                                    FilterStyles.row,
                                    FilterStyles.connectRow,
                                    FilterStyles.levelsContainer,
                                ]}>
                                {levels.map((level) => (
                                    <TouchableOpacity
                                        key={level.value}
                                        activeOpacity={0.7}
                                        style={[
                                            FilterStyles.level,
                                            {backgroundColor: level.color},
                                        ]}
                                        onPress={() => setLevel(level.value)}>
                                        <Text style={FilterStyles.levelColor}>
                                            {`${translate('filters.Level')} ${
                                                level.value
                                            }`}
                                        </Text>
                                        {selectedLevel === level.value && (
                                            <Ionicons
                                                name="checkmark-sharp"
                                                size={18}
                                                color={Constants.Colors.BLACK}
                                                style={[
                                                    AuthStyle.checkImg,
                                                    FilterStyles.select,
                                                ]}
                                            />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ) : (
                            <View
                                style={[
                                    FilterStyles.row,
                                    FilterStyles.connectRow,
                                    FilterStyles.levelsContainer,
                                ]}>
                                {distanceList.map((dis) => (
                                    <TouchableOpacity
                                        key={dis.value}
                                        activeOpacity={0.7}
                                        style={[
                                            FilterStyles.race,
                                            dis.value === distance &&
                                                FilterStyles.raceActive,
                                        ]}
                                        onPress={() => setDistance(dis.value)}>
                                        <Text
                                            style={[
                                                FilterStyles.raceText,
                                                dis.value === distance &&
                                                    FilterStyles.raceActiveText,
                                            ]}>
                                            {translate(dis.label)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        <Text style={FilterStyles.header}>
                            {translate('Gender')}
                        </Text>
                        <View
                            style={[FilterStyles.row, FilterStyles.connectRow]}>
                            <TouchableOpacity
                                onPress={() => setGender('male')}
                                activeOpacity={0.7}
                                style={FilterStyles.radio}>
                                <Ionicons
                                    name={
                                        gender === 'male'
                                            ? 'ios-radio-button-on-outline'
                                            : 'ios-radio-button-off-outline'
                                    }
                                    size={25}
                                    color={
                                        gender === 'male'
                                            ? Constants.Colors.WHITE
                                            : Constants.Colors.TEXT_COLOR2
                                    }
                                />
                                <Text style={FilterStyles.subHeader}>
                                    {translate('Male')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setGender('female')}
                                activeOpacity={0.7}
                                style={FilterStyles.radio}>
                                <Ionicons
                                    name={
                                        gender === 'female'
                                            ? 'ios-radio-button-on-outline'
                                            : 'ios-radio-button-off-outline'
                                    }
                                    size={25}
                                    color={
                                        gender === 'female'
                                            ? Constants.Colors.WHITE
                                            : Constants.Colors.TEXT_COLOR2
                                    }
                                />
                                <Text style={FilterStyles.subHeader}>
                                    {translate('Female')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={FilterStyles.buttonsWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={clearFilters}>
                            <Text style={FilterStyles.subHeader}>
                                {translate('ResetAll')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={FilterStyles.button}
                            onPress={applyFilters}>
                            <Text style={FilterStyles.subHeader}>
                                {translate('Apply')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            {show && (
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            width: '90%',
                            height: '90%',
                            borderRadius: 20,
                            backgroundColor: 'rgba(50,50,50,0.7)',
                            alignItems: 'center',
                            paddingTop: 20,
                        }}>
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
                            }}
                            placeholder="Search"
                            placeholderColor="#fff"
                            onPress={(data, details = null) => {
                                getCoords(data?.description)
                                setAddress(data?.description)
                                setShow(false)
                            }}
                            query={{
                                key: GOOGLE_API_KEY,
                                language: 'en',
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setShow(false)}
                            style={{alignSelf: 'flex-end', margin: 15}}>
                            <Text style={{color: Constants.Colors.WHITE}}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    )
}

Filter.propTypes = {t: func.isRequired}

export default withTranslation()(Filter)
