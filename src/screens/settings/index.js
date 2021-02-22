import React, {Component} from 'react'
import {connect} from 'react-redux'
import {FlatList, View} from 'react-native'
import {func, shape} from 'prop-types'
import {LogoutPopup, SettingItem} from '../../components'
import {CommonStyles} from '../../styles'
import * as actions from '../../actions/user-action-types'
import {clearAsyncStorage, removeAuthToken} from '../../helpers/auth'
import {withTranslation} from 'react-i18next'
import {removeAuthTokenFromRedux} from '../../reducers/baseServices/auth'
import AsyncStorage from '@react-native-community/async-storage'

const settingList = [
    {
        hasArrow: false,
        label: 'settings.Notifications',
        payload: {},
        route: 'Notifications',
    },
    {
        label: 'settings.Change Language',
        payload: {},
        route: 'ChangeLanguage',
    },
    {
        label: 'settings.Change Password',
        payload: {},
        route: 'ChangePassword',
    },
    {
        label: 'settings.Invite Friends',
        payload: {
            hasCheckBox: true,
            title: 'settings.Invite Friends',
        },
        route: 'InviteFriends',
    },
    {
        label: 'settings.Contact Us',
        payload: {title: 'settings.Contact Us'},
        route: 'ContactUS',
    },
    {
        label: 'settings.About Us',
        payload: {title: 'settings.About Us'},
        route: 'StaticContent',
    },
    {
        label: 'settings.FAQ',
        payload: {title: 'settings.FAQ'},
        route: 'StaticContent',
    },
    {
        label: 'settings.Privacy Policy',
        payload: {title: 'settings.Privacy Policy'},
        route: 'StaticContent',
    },
    {
        label: 'settings.Terms & Conditions',
        payload: {title: 'settings.Terms & Conditions'},
        route: 'StaticContent',
    },
    {
        label: 'settings.Strava',
        payload: {title: 'settings.Strava'},
        route: 'Strava',
    },
    {
        label: 'settings.Logout',
        payload: {},
        route: 'logout',
    },
]

class Settings extends Component {
    timer = null
    constructor(props) {
        super(props)

        this.state = {logoutPopup: false}
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    onPress = (data) => {
        const {
            navigation: {navigate},
        } = this.props

        if (data.route === 'logout') {
            this.setState({logoutPopup: true})

            return
        }

        navigate(data.route, data.payload)
    }

    onLogout = async () => {
        const {
            logOutSuccess,
            navigation: {navigate},
        } = this.props

        const allKeys = await AsyncStorage.getAllKeys()
        console.log(await AsyncStorage.getItem('userCred'))
        console.log('ALL KEYS BEFORE REMOVE', allKeys)
        let index = allKeys.indexOf('userCred')
        let newKeys = allKeys.splice(index, 1)
        let index2 = allKeys.indexOf('intro')
        allKeys.splice(index, 1)
        console.log('NEW_KEYS', newKeys)
        console.log('ALL KEYS AFTER REMOVE', allKeys)

        const token = await AsyncStorage.multiRemove(allKeys)
        console.log('========>>tokenNullll', token)
        this.setState({logoutPopup: false})
        logOutSuccess('')
    }

    render() {
        const {logoutPopup} = this.state

        return (
            <View style={CommonStyles.container}>
                <FlatList
                    data={settingList}
                    renderItem={({item}) => (
                        <SettingItem
                            {...item}
                            onPress={() => this.onPress(item)}
                        />
                    )}
                    keyExtractor={(item, index) => `${index}`}
                />
                {logoutPopup && (
                    <LogoutPopup
                        onLogout={this.onLogout}
                        onCancel={() => this.setState({logoutPopup: false})}
                    />
                )}
            </View>
        )
    }
}

Settings.propTypes = {
    logoutSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
        navigate: func.isRequired,
    }).isRequired,
}

const mapDispatchToProps = {
    logOutSuccess: (params) => removeAuthTokenFromRedux(params),
}

export default connect(null, mapDispatchToProps)(withTranslation()(Settings))

// export default connect(null, {logoutSuccess: actions.logoutSuccess})(Settings);
