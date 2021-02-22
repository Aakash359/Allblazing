/* eslint-disable max-len */

import Axios from 'axios'
import React from 'react'
import {ActivityIndicator} from 'react-native'
import {FlatList} from 'react-native'
import {Platform} from 'react-native'
import {ScrollView, View, Text} from 'react-native'
import {Colors} from '../../constants'
import API from '../../constants/baseApi'
import {getAuthToken} from '../../helpers/auth'
import {StaticContentStyles} from '../../styles'

const PAGE_TYPE = {
    aboutUs: 'settings.About Us',
    privacyPolicy: 'settings.Privacy Policy',
    termsNConditions: 'settings.Terms & Conditions',
    FAQ: 'settings.FAQ',
}

const StaticContent = (props) => {
    const [aboutUs, setAboutUs] = React.useState({
        data: {description: '', dutch_description: '', FAQ: []},
        isLoading: true,
        error: false,
        msg: '',
    })

    const {title} = props.route.params

    const getApi = () => {
        switch (title) {
            case PAGE_TYPE.aboutUs:
                return API.ABOUT_US
            case PAGE_TYPE.privacyPolicy:
                return API.PRIVACY_POLICY
            case PAGE_TYPE.termsNConditions:
                return API.TERMS_CONDITIONS
            case PAGE_TYPE.FAQ:
                return API.FAQ
            default:
                return API.ABOUT_US
        }
    }

    const getAboutUs = async () => {
        const url = getApi()
        const token = await getAuthToken()
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        try {
            const res = await Axios.get(url, config)
            let result = res?.data
            if (result?.status) {
                if (title === PAGE_TYPE.FAQ) {
                    setAboutUs({
                        ...aboutUs,
                        data: {
                            ...aboutUs.data,
                            FAQ: result?.data?.result || [],
                        },
                        isLoading: false,
                        error: false,
                    })
                } else {
                    let {description, dutch_description} = result?.data?.result
                    description = description
                        .replace(/<\/?[^>]+(>|$)/g, '')
                        .replace(/&amp;/g, '&')
                    dutch_description = dutch_description
                        .replace(/<\/?[^>]+(>|$)/g, '')
                        .replace(/&amp;/g, '&')
                    setAboutUs({
                        ...aboutUs,
                        data: {...aboutUs.data, description, dutch_description},
                        isLoading: false,
                        error: false,
                    })
                }
            } else {
                setAboutUs({
                    ...aboutUs,
                    isLoading: false,
                    error: true,
                    msg: result?.message,
                })
            }
        } catch (error) {
            // console.log(error);
            setAboutUs({
                ...aboutUs,
                isLoading: false,
                error: true,
                msg: error?.message,
            })
        }
    }

    const RenderFAQ = ({item}) => {
        return (
            <View>
                <Text style={[StaticContentStyles.faqQues]}>
                    Ques: {item?.question}
                </Text>
                <Text style={StaticContentStyles.faqAns}>
                    <Text style={[StaticContentStyles.faqQues]}> Ans: </Text>
                    {item?.answer}
                </Text>
            </View>
        )
    }

    React.useEffect(() => {
        getAboutUs()
    }, [])

    return (
        <View style={StaticContentStyles.container}>
            {title === PAGE_TYPE.FAQ ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={aboutUs?.data?.FAQ}
                    style={{marginBottom: Platform.OS === 'ios' ? 20 : 15}}
                    renderItem={RenderFAQ}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                height: 1,
                                width: '100%',
                                backgroundColor: Colors.GRAY,
                                marginVertical: Platform.OS === 'ios' ? 20 : 15,
                            }}
                        />
                    )}
                />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {aboutUs?.isLoading ? (
                        <ActivityIndicator size="small" color={Colors.WHITE} />
                    ) : (
                        <>
                            <Text style={StaticContentStyles.text}>
                                {aboutUs?.data?.description}
                            </Text>
                        </>
                    )}
                    {aboutUs?.error && (
                        <View style={{alignItems: 'center'}}>
                            <Text style={StaticContentStyles.text}>
                                {aboutUs?.msg}
                            </Text>
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    )
}

export default StaticContent
