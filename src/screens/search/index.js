import React, {useState} from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
    SafeAreaView,
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SingleEvent, InviteFriend} from '../../components'
import {SearchScreen} from '../../styles'
// import ProfileUnlock from './myProfile';

import Constants from '../../constants'

function SearchSeceen() {
    const navigation = useNavigation()
    const [search, setSearch] = useState(false)
    const [filter, setFilter] = useState('All')
    const filterList = ['All', 'Race', 'Train', 'Group', 'Runner']

    const renderItem = () => <SingleEvent />

    const renderHeader = ({route, title}) => (
        <View style={SearchScreen.content}>
            <Text style={SearchScreen.heading}>{title}</Text>
            <TouchableOpacity
                activeOpacity={0.7}
                hitSlop={Constants.BaseStyle.HALF_HIT_SLOP}
                onPress={() => navigation.navigate(route)}>
                <Text style={SearchScreen.rightHeading}>{'View All'}</Text>
            </TouchableOpacity>
        </View>
    )

    const filterData = ({item}) => (
        // <View style={}>
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                SearchScreen.optionalSectionView,
                {
                    backgroundColor:
                        item === filter
                            ? Constants.Colors.GREY_CIRCLE
                            : Constants.Colors.SECONDARY_COLOR,
                },
            ]}
            onPress={() => {
                setFilter(item)
            }}>
            <Text style={SearchScreen.optionalSection1}>{item}</Text>
        </TouchableOpacity>
        // </View>
    )

    return (
        <>
            <SafeAreaView style={SearchScreen.container}>
                <ScrollView>
                    <View
                        style={[
                            SearchScreen.searchView,
                            {
                                justifyContent: 'flex-start',
                                overflow: 'hidden',
                            },
                        ]}>
                        <Image
                            source={Constants.Images.search}
                            style={[
                                SearchScreen.searchIcon,
                                {
                                    marginHorizontal:
                                        Platform.OS === 'ios' ? 10 : 4,
                                },
                            ]}
                        />

                        <TextInput
                            placeholder="Find runner, group, event, club, coach etc..."
                            placeholderTextColor={Constants.Colors.GREY_BORDER}
                            style={[
                                SearchScreen.searchText,
                                {
                                    padding: 5,
                                    marginRight:
                                        Platform.OS === 'ios' ? 55 : 30,
                                    fontSize:
                                        Platform.OS === 'ios'
                                            ? Constants.BaseStyle.scale(16)
                                            : Constants.BaseStyle.scale(13),
                                },
                            ]}
                            value={search}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(text) => {
                                setSearch(text)
                            }}
                            underlineColorAndroid={Constants.Colors.TRANSPARENT}
                        />
                    </View>
                    {search.length >= 2 ? (
                        <View>
                            <View>
                                <FlatList
                                    data={filterList}
                                    contentContainerStyle={
                                        SearchScreen.sectionMainView
                                    }
                                    renderItem={filterData}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index}
                                />
                            </View>
                            {renderHeader({
                                navigation,
                                route: 'Runners',
                                title: 'Runners',
                            })}
                            <FlatList
                                data={[
                                    Constants.Images.inviteUser2,
                                    Constants.Images.inviteUser1,
                                    Constants.Images.inviteUser3,
                                ]}
                                renderItem={({item}) => (
                                    <InviteFriend image={item} />
                                )}
                                keyExtractor={(item, index) => index}
                            />
                            {renderHeader({
                                navigation,
                                route: 'Events',
                                title: 'Events',
                            })}
                            <FlatList
                                scrollEnabled={false}
                                data={[1]}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                    ) : null}
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default SearchSeceen
