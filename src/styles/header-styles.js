import {StyleSheet} from 'react-native'
import Constants from '../constants'

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 50,
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    crossIcon: {
        height: 16,
        marginRight: 20,
        width: 16,
    },
    filterIcon: {
        height: 20,
        marginRight: 10,
        width: 20,
    },
    filterIcon2: {
        height: 22,
        width: 22,
    },
    headerRightTextStyle: {
        ...Constants.Fonts.RegularBold,
        color: Constants.Colors.WHITE,
        marginHorizontal: Constants.BaseStyle.scale(10),
    },
    input: {
        backgroundColor: 'rgba(50,50,50, 0.9)', //Constants.Colors.SECONDARY_COLOR,
        borderRadius: Constants.BaseStyle.scale(8),
        height: Constants.BaseStyle.scale(45),
        marginHorizontal: Constants.BaseStyle.scale(10),
        marginVertical: Constants.BaseStyle.scale(20),
        padding: Constants.BaseStyle.scale(10),
        textAlign: 'left',
        width: '70%',
    },
    inputSearch: {
        marginHorizontal: Constants.BaseStyle.scale(2),
        backgroundColor: Constants.Colors.PRIMARY,
        borderRadius: Constants.BaseStyle.scale(8),
    },
    inputNotif: {
        backgroundColor: Constants.Colors.PRIMARY,
        borderRadius: Constants.BaseStyle.scale(8),
    },
    mapIcon: {
        height: 20,
        marginHorizontal: Constants.BaseStyle.scale(10),
        width: 20,
    },
    notificationIcon: {
        height: 20,
        margin: Constants.BaseStyle.scale(10),
        width: 20,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    searchIcon: {
        height: 20,
        margin: Constants.BaseStyle.scale(10),
        width: 20,
    },
    searchInput: {
        ...Constants.Fonts.Regular,
        color: Constants.Colors.TEXT_COLOR,
        flex: 1,
        fontSize: 16,
        marginTop: 4,
        marginBottom: 2,
        marginRight: 5,
        paddingLeft: 5,
    },
})
