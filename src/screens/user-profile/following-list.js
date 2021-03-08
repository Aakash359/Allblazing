import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import {FollowingStyles} from '../../styles'
import Constants from '../../constants'
import {useNavigation} from '@react-navigation/native'
import {func, shape} from 'prop-types'
import connect from 'react-redux/lib/connect/connect'
import {withTranslation} from 'react-i18next'
import Axios from 'axios'
import {
    setFollowList,
    setFollowUserId,
    setFollowId,
} from '../../reducers/baseServices/profile'
import API from '../../constants/baseApi'
class FollowingList extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            Loading: false,
            list: [],
        }
    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this._fetchFollowingList()
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    _fetchFollowingList = async () => {
        const {addFollowUserId, addFollowId} = this.props

        let user_id = this.props?.route?.params?.user_id || this.props.user_id
        // if(this.props.route.params.userId) {
        //   user_id = this.props.route.params.userId
        // }

        // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
        console.log('TOKEN====>', this.props.token)
        console.log('MY ID====>', user_id)

        const config = {
            headers: {Authorization: `Bearer ${this.props.token}`},
            params: {id: user_id},
        }
        console.log('===>responseFOLLOWERS')
        this.setState({
            Loading: true,
        })
        Axios.get(API.FOLLOWING, config)
            .then((response) => {
                console.log('===>responseFOLLOWERS', response)
                if (response.data.data.result) {
                    this.setState({list: response?.data?.data?.result})
                    addFollowUserId(response?.data?.data?.result?.id)
                    console.log('===>', response?.data?.data?.result?.id)
                    // addFollowId(response?.data?.data?.result?.follow_id);
                    // console.log('====>follow_id', response?.data?.data?.result?.follow_id);
                }
            })
            .finally(() => {
                this.setState({
                    Loading: false,
                })
            })
    }
    renderItem = ({item}) => (
        <TouchableOpacity
            style={FollowingStyles.sectionView}
            activeOpacity={0.7}
            onPress={() =>
                item.follow_id === this.props.user_id
                    ? this.props.navigation.navigate('Me')
                    : this.props.navigation.navigate('UserProfile', {
                          iseventPage: false,
                          id: item.follow_id,
                      })
            }>
            <View
                style={[
                    FollowingStyles.listView,
                    {backgroundColor: '#F898A4', overflow: 'hidden'},
                ]}>
                <Image
                    source={{uri: item?.followimage}}
                    style={{width: 60, height: 60, borderRadius: 12}}
                    resizeMode="cover"
                />
            </View>

            <View style={{width: '60%'}}>
                <Text style={FollowingStyles.nameText}>{item.followName}</Text>
                <Text
                    style={FollowingStyles.locationText}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item?.followAddress}
                </Text>
            </View>
        </TouchableOpacity>
    )

    ListEmptyComponent = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>You didn't follow anyone.</Text>
            </View>
        )
    }

    render() {
        const {
            navigation: {navigate},
        } = this.props
        return (
            <>
                <ScrollView style={FollowingStyles.container}>
                    <View style={FollowingStyles.searchView}>
                        <Image
                            source={Constants.Images.search}
                            style={FollowingStyles.searchIcon}
                        />
                        <TextInput
                            placeholder={`Search Following (${this.props.route.params.followingCount})`}
                            placeholderTextColor="#ccc"
                            value={this.state.search}
                            style={{color: 'white', padding: 10}}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                this.setState({search: text})
                            }}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    {this.state.Loading ? (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                            }}>
                            <ActivityIndicator color="white" size={25} />
                        </View>
                    ) : (
                        <FlatList
                            scrollEnabled={false}
                            contentContainerStyle={FollowingStyles.flatList}
                            data={this.state.list}
                            renderItem={({item, index, navigate}) => (
                                <this.renderItem item={item} index={index} />
                            )}
                            ListEmptyComponent={this.ListEmptyComponent}
                        />
                    )}
                </ScrollView>
            </>
        )
    }
}

// export default FollowingList;
FollowingList.propTypes = {
    loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}
const mapStateToProps = ({profile: {id, user_id}, auth: {token}}) => ({
    id,
    token,
    user_id,
})

const mapDispatchToProps = {
    addFollowUserId: (params) => setFollowUserId(params),
    addFollowId: (params) => setFollowId(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(FollowingList))
