import React, {Component} from 'react'
import {Platform, TextInput, View, TouchableOpacity, Text} from 'react-native'
import {withTranslation} from 'react-i18next'
import {func, shape} from 'prop-types'
import {ScrollView} from 'react-native-gesture-handler'
import Constants, {Colors} from '../../constants'
import {
    AuthStyle,
    CommonStyles,
    MottoStyles,
    RegisterStyle,
    UsernameStyle,
} from '../../styles'
import connect from 'react-redux/lib/connect/connect'
import {setMottoDescription} from '../../reducers/baseServices/profile'
import API from '../../constants/baseApi'
import axios from 'axios'
import {Alert} from 'react-native'
import {ActivityIndicator} from 'react-native'
import {getAuthToken} from '../../helpers/auth'

class UserMotto extends Component {
    constructor() {
        super()
        this.state = {
            motto_description: '',
            Loading: false,
        }
    }

    // onChangeText = (text) => {
    //   this.setState({motto_description:text});
    // };
    onSave = async () => {
        const {addMottoDescription} = this.props
        const {
            navigation: {navigate},
        } = this.props
        const {motto_description} = this.state

        const token = await getAuthToken()
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            Loading: true,
        })
        if (this.state.motto_description === '') {
            Alert.alert('', 'Please enter description', '')
        } else {
            axios
                .post(
                    API.UPDATE_PROFILE,
                    {
                        motto: motto_description,
                    },
                    config
                )
                .then((response) => {
                    console.log('MOTTO_DESCRIPTION UPDATE', response)
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
                        addMottoDescription(motto_description)
                        console.log('motto_description:==>', motto_description)
                        // navigate('EditProfile');
                    }
                })
                .catch((e) => {
                    console.log('MOTTO DESCRIPTION UPDATE ERROR', e)
                })
                .finally(() => {
                    this.setState({
                        Loading: false,
                    })
                })
        }
    }
    componentDidMount() {
        const motto_description =
            this.props.route.params.motto_description || ''
        this.setState({motto_description})
    }
    render() {
        const {motto_description} = this.state
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
                            <View style={CommonStyles.textAreaWrapper}>
                                <TextInput
                                    multiline
                                    maxLength={60}
                                    numberOfLines={15}
                                    style={[
                                        CommonStyles.textArea,
                                        {color: Colors.WHITE},
                                    ]}
                                    placeholder={translate('profile.Motto')}
                                    value={this.state.motto_description}
                                    onChangeText={(text) =>
                                        this.setState({motto_description: text})
                                    }
                                    placeholderTextColor={
                                        Constants.Colors.TEXT_COLOR
                                    }
                                    underlineColorAndroid={
                                        Constants.Colors.TRANSPARENT
                                    }
                                />
                            </View>
                            <Text
                                style={
                                    RegisterStyle.mottoCount
                                }>{`${motto_description.length}/60`}</Text>
                        </View>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.7}
                    v
                    style={[AuthStyle.saveBtn, MottoStyles.saveBtn]}
                    onPress={() => this.onSave()}>
                    {this.state.Loading ? (
                        <ActivityIndicator size={25} color="white" />
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

// UserMotto.propTypes = {
//   navigation: shape({
//     dispatch: func.isRequired,
//     goBack: func.isRequired,
//   }).isRequired,
//   t: func.isRequired,
// };

// export default withTranslation()(UserMotto);

UserMotto.propTypes = {
    // loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({auth: {email}}) => ({
    email,
})

const mapDispatchToProps = {
    addMottoDescription: (params) => setMottoDescription(params),
    // loginSuccess: actions.loginSuccess,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(UserMotto))
