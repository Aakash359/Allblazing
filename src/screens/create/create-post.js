import React, {Component} from 'react'
import {View, Image, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {CreatePostStyles} from '../../styles'
import Constants from '../../constants'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import API from '../../constants/baseApi'
import {getAuthToken, getOtpToken, setUserId} from '../../helpers/auth'
import {Alert} from 'react-native'
import {connect} from 'react-redux'
import {withTranslation} from 'react-i18next'
import {func, shape} from 'prop-types'
import {ActivityIndicator} from 'react-native'
import {setProfileDetails} from '../../reducers/baseServices/profile'

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            upload: false,
            selectedImage: '',
            user: {},
            Loading: false,
        }
    }
    // const navigation = useNavigation();
    // const [upload, setUpload] = useState(false);
    // const [selectedImage, setSelectedImage] = useState();

    choosePhotosFromGallery = (imageIndex) => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            includeBase64: true,
        }).then((image) => {
            // setUpload(true);
            this.setState({upload: true})
            // setSelectedImage(image.path);
            this.setState({selectedImage: image.path})
            console.log(image.path, imageIndex)
        })
    }

    //  takePhotoFromCamera = async (imageIndex) => {
    //   try {
    //     const image = await ImagePicker.openCamera({
    //       cropping: true,
    //       includeBase64: true,
    //     });
    //   } catch (err) {
    //     // logError(err, '[useProfilePhotos] getPhotoLibrary Error');
    //   }
    // };
    takePhotoFromCamera = (imageIndex) => {
        try {
            ImagePicker.openCamera({
                cropping: false,
                includeBase64: true,
            }).then((image) => {
                this.setState({upload: true})
                this.setState({selectedImage: image.path})
                console.log(image.path, imageIndex)
            })
        } catch (err) {
            console.log('error==>', err)
        }
    }

    UserProfileDetails = async () => {
        const {user_id, addProfileDetail} = this.props
        console.log('userid==>', user_id)
        const token = await getAuthToken()
        // console.log('====>', token);
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        this.setState({
            Loading: true,
        })
        axios
            .post(
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
                    this.setState({user: response?.data?.data?.result})
                    addProfileDetail(response?.data?.data?.result)
                    setUserId(response?.data?.data?.result?.user_id.toString())
                    console.log(
                        'profile response==>',
                        response?.data?.data?.result
                    )
                }
            })
            .finally(() => {
                this.setState({
                    Loading: false,
                })
            })
    }

    _handlePost = async () => {
        const {
            navigation: {navigate},
        } = this.props

        // navigate('Feed');
        // return

        const token = await getAuthToken()
        console.log('====?', token)
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        const formData = new FormData()
        formData.append('post', {
            uri:
                Platform.OS === 'android'
                    ? this.state.selectedImage
                    : this.state.selectedImage.replace('file://', ''),
            name: 'post' + '.png',
            type: 'image/png',
        })
        console.log('POST CRETAE FORM DATA', formData)
        this.setState({
            isLoading: true,
        })
        axios
            .post(API.POST, formData, config)
            .then((response) => {
                console.log('CRETAE POST response' + response)
                if (response?.data?.code === 422) {
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
                                onPress: () => navigate('Discover'),
                            },
                        ],
                        {Cancelable: false}
                    )

                    // navigate('Discover');
                }
            })
            .catch((e) => {
                Alert.alert('Create Post', 'Unable to post.')
            })
            .finally(() => {
                this.setState({
                    isLoading: false,
                })
            })
    }

    componentDidMount() {
        this.UserProfileDetails()
    }

    render() {
        // const {nam} = this.state;

        const {
            navigation: {goBack, navigate},
            route: {params},
        } = this.props
        const {user} = this.state
        const userImage =
            !user?.image || user?.image === 'N/A'
                ? Constants.Images.tabBarProfile
                : {uri: user?.image}
        return (
            <SafeAreaView style={CreatePostStyles.container}>
                <View style={CreatePostStyles.userView}>
                    <Image
                        source={userImage}
                        style={[
                            CreatePostStyles.userIcon,
                            {
                                borderRadius: 23,
                                borderWidth: 1,
                                borderColor: Constants.Colors.LIGHT_RED,
                            },
                        ]}
                    />
                    <Text style={CreatePostStyles.imageText}>
                        {user?.full_name}
                    </Text>
                </View>

                {this.state.upload ? (
                    <View>
                        <Image
                            source={{uri: this.state.selectedImage}}
                            style={CreatePostStyles.postImage}
                        />
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() =>
                                this.setState({
                                    upload: false,
                                    selectedImage: '',
                                })
                            }
                            style={CreatePostStyles.closeIconView}>
                            <Image
                                source={Constants.Images.closeRound}
                                style={CreatePostStyles.closeIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            disabled={this.state.isLoading}
                            onPress={() => this._handlePost()}
                            style={CreatePostStyles.nextView}>
                            {this.state.isLoading ? (
                                <ActivityIndicator color="white" size={25} />
                            ) : (
                                <Text style={CreatePostStyles.nextText}>
                                    Post
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => this.takePhotoFromCamera()}
                            style={CreatePostStyles.optionView}>
                            <View style={CreatePostStyles.optionIconView}>
                                <Image
                                    source={Constants.Images.camera}
                                    style={CreatePostStyles.optionIcon}
                                />
                            </View>
                            <Text style={CreatePostStyles.imageText}>
                                Open Camera
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            // onPress={() => setUpload(true)}
                            onPress={() => this.choosePhotosFromGallery()}
                            style={CreatePostStyles.optionView}>
                            <View style={CreatePostStyles.optionIconView}>
                                <Image
                                    source={Constants.Images.imageGallery}
                                    style={CreatePostStyles.optionIcon}
                                />
                            </View>
                            <Text style={CreatePostStyles.imageText}>
                                Open Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        )
    }
}

// export default CreatePost;

CreatePost.propTypes = {
    loginSuccess: func.isRequired,
    navigation: shape({
        dispatch: func.isRequired,
        goBack: func.isRequired,
    }).isRequired,
    t: func.isRequired,
}

const mapStateToProps = ({auth: {user_id}}) => {
    return {
        user_id,
    }
}

const mapDispatchToProps = {
    // addFullName: (params) => setFullName(params),
    // addCreateGroupDetail: (params) => setCreateGroupDetails(params),
    addProfileDetail: (params) => setProfileDetails(params),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(CreatePost))
