import {Platform, StyleSheet} from 'react-native'

import Constants from '../constants'

export default StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Constants.Colors.TEXT_COLOR2,
        borderRadius: Constants.BaseStyle.scale(6),
        height: Constants.BaseStyle.scale(45),
        justifyContent: 'center',
        marginBottom: Constants.BaseStyle.scale(15),
        marginTop: Constants.BaseStyle.scale(10),
        width: '90%',
    },
    chatCount: {
        backgroundColor: Constants.Colors.TEXT_COLOR2,
        borderRadius: Constants.BaseStyle.scale(13),
        height: Constants.BaseStyle.scale(26),
        justifyContent: 'center',
        margin: Constants.BaseStyle.scale(10),
        width: Constants.BaseStyle.scale(26),
    },
    chatText: {
        ...Constants.Fonts.RegularBold,
        color: Constants.Colors.WHITE,
        textAlign: 'center',
    },
    code: {
        ...Constants.Fonts.LargeBold,
        color: Constants.Colors.TEXT_COLOR_WHITE,
        fontSize: 20,
        marginHorizontal: Constants.BaseStyle.scale(20),
    },
    container: {
        alignItems: 'center',
        backgroundColor: Constants.Colors.SECONDARY_COLOR,
        borderRadius: 5,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        margin: Constants.BaseStyle.scale(10),
    },
    copy: {
        height: 20,
        width: 18,
    },
    description: {
        ...Constants.Fonts.Small,
        alignItems: 'center',
        color: Constants.Colors.TEXT_COLOR_WHITE,
        marginHorizontal: Constants.BaseStyle.scale(20),
        marginTop: Constants.BaseStyle.scale(20),
        textAlign: 'center',
    },
    homeInviteBtn: {
        marginBottom: Constants.BaseStyle.scale(10),
        marginTop: Constants.BaseStyle.scale(0),
        width: Constants.BaseStyle.scale(300),
    },
    homeRunners: {
        height: Constants.BaseStyle.scale(110),
        marginTop: Constants.BaseStyle.scale(20),
        width: Constants.BaseStyle.scale(280),
    },
    icon: {
        height: Constants.BaseStyle.scale(20),
        marginHorizontal: Constants.BaseStyle.scale(20),
        width: Constants.BaseStyle.scale(20),
    },
    inviteBtn: {
        marginBottom: Constants.BaseStyle.scale(10),
        marginTop: Constants.BaseStyle.scale(10),
    },
    invitedUserContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        marginTop: Constants.BaseStyle.scale(5),
    },
    invitedUserDescription: {
        ...Constants.Fonts.Small,
        color: Constants.Colors.GRAY,
        flexWrap: 'wrap',
        fontSize: 12,
        marginTop: Constants.BaseStyle.scale(5),
        maxWidth: '90%',
        paddingLeft: Constants.BaseStyle.scale(10),
        textAlign: 'left',
    },
    invitedUserImage: {
        height: 40,
        width: Constants.BaseStyle.scale(40),
    },
    invitedUserWrapper: {height: 40},
    location: {
        ...Constants.Fonts.Small,
        color: Constants.Colors.GRAY,
        flexWrap: 'wrap',
        flexShrink: 1,
        marginTop: Constants.BaseStyle.scale(5),
        paddingLeft: Constants.BaseStyle.scale(20),
    },
    namePadding: {paddingLeft: Constants.BaseStyle.scale(0)},
    padding: {
        paddingLeft: Constants.BaseStyle.scale(10),
        textAlign: 'left',
    },
    pending: {
        ...Constants.Fonts.Small,
        color: Constants.Colors.LIGHT_ORANGE,
        fontSize: 12,
    },
    pendingBtn: {
        alignItems: 'center',
        borderColor: Constants.Colors.LIGHT_ORANGE,
        borderWidth: 1,
        flex: 0.3,
        height: 24,
        justifyContent: 'center',
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: Constants.BaseStyle.scale(20),
        marginTop: Constants.BaseStyle.scale(15),
    },
    runners: {
        alignItems: 'center',
        alignSelf: 'center',
        height: Constants.BaseStyle.scale(120),
        justifyContent: 'center',
        ...Platform.select({
            android: {marginTop: Constants.BaseStyle.scale(50)},
            ios: {marginTop: Constants.BaseStyle.scale(50)},
        }),
        width: Constants.BaseStyle.scale(300),
    },
    userDetailView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    userImage: {
        borderRadius: 10,
        height: '100%',
        width: Constants.BaseStyle.scale(70),
    },
    userInformation: {flex: 0.6},
    userWrapper: {
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        textAlign: 'left',
    },
    username: {
        ...Constants.Fonts.RegularBold,
        color: Constants.Colors.WHITE,
        paddingLeft: Constants.BaseStyle.scale(20),
        textAlign: 'left',
    },
    wrapper: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
})
