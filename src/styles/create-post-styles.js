import {StyleSheet, Dimensions} from 'react-native'
import Constants from '../constants'

const {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
    closeIcon: {
        height: 40,
        right: width * 0.1,
        top: width * 0.05,
        width: 40,
    },
    closeIconView: {
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    container: {
        backgroundColor: Constants.Colors.PRIMARY,
        flex: 1,
    },
    imageText: {
        ...Constants.Fonts.RegularBold,
        color: Constants.Colors.TEXT_COLOR_WHITE,
        fontSize: Constants.BaseStyle.scale(16),
        margin: 20,
    },
    nextText: {
        ...Constants.Fonts.Regular,
        color: Constants.Colors.WHITE,
        fontSize: Constants.BaseStyle.scale(16),
        textAlign: 'center',
    },
    nextView: {
        backgroundColor: Constants.Colors.TEXT_COLOR2,
        borderRadius: 4,
        marginBottom: height * 0.05,
        marginHorizontal: 30,
        padding: 15,
    },
    optionIcon: {
        alignSelf: 'center',
        borderBottomWidth: 1,
        height: 15,
        justifyContent: 'center',
        width: 18,
    },
    optionIconView: {
        backgroundColor: Constants.Colors.TEXT_COLOR2,
        borderRadius: 20,
        height: 40,
        justifyContent: 'center',
        width: 40,
    },
    optionView: {
        alignItems: 'center',
        borderBottomColor: Constants.Colors.TEXT_COLOR2,
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical: 10,
    },
    postImage: {
        borderRadius: 16,
        height: height * 0.5,
        margin: 20,
        marginTop: 0,
        width: width * 0.9,
    },
    userIcon: {
        height: 48,
        width: 48,
    },
    userView: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
        marginVertical: 40,
    },
})

export default StyleSheet.create(styles)
