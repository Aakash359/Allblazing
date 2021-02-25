import React from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import {bool, func, string} from 'prop-types'
import {withTranslation} from 'react-i18next'
import Constants from '../../constants'
import {CommonStyles, InvitePopupStyles, PopupStyles} from '../../styles'
import AnimatedModal from '../animate-modal'

const MoreOptionsPopup = ({
    blockBtnTitle,
    blockBtnSubtitle,
    hasBlockBtn,
    hasReportBtn,
    hasUnFollowBtn,
    hasFollowBtn,
    leaveGroup,
    leaveGroupTitle,
    leaveGroupSubTitle,
    onClose,
    onBlock,
    onReport,
    onUnfollow,
    onfollow,
    reportBtnTitle,
    reportBtnSubtitle,
    unfollowBtnSubtitle,
    unfollowBtnTitle,
    followBtnSubtitle,
    followBtnTitle,
    visible,
    t: translate,
}) => (
    <AnimatedModal visible={visible}>
        <TouchableOpacity style={InvitePopupStyles.popup} onPress={onClose}>
            <View
                style={[
                    PopupStyles.container,
                    PopupStyles.moreOptionsContainer,
                ]}>
                <View
                    style={[
                        PopupStyles.wrapper,
                        PopupStyles.moreOptionsWrapper,
                    ]}>
                    {hasFollowBtn && (
                        <TouchableOpacity
                            onPress={onfollow}
                            style={PopupStyles.blockBtn}>
                            <Image
                                source={Constants.Images.addUser}
                                style={PopupStyles.blockIcon}
                            />
                            <View>
                                <Text style={PopupStyles.btnTitle}>
                                    {translate(followBtnTitle)}
                                </Text>
                                <Text style={PopupStyles.btnSubtitle}>
                                    {translate(followBtnSubtitle)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {hasUnFollowBtn && (
                        <TouchableOpacity
                            onPress={onUnfollow}
                            style={PopupStyles.blockBtn}>
                            <Image
                                source={Constants.Images.addUser}
                                style={PopupStyles.blockIcon}
                            />
                            <View>
                                <Text style={PopupStyles.btnTitle}>
                                    {translate(unfollowBtnTitle)}
                                </Text>
                                <Text style={PopupStyles.btnSubtitle}>
                                    {translate(unfollowBtnSubtitle)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {hasBlockBtn && (
                        <>
                            {hasUnFollowBtn && (
                                <View style={CommonStyles.divider} />
                            )}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={onBlock}
                                style={PopupStyles.blockBtn}>
                                <Image
                                    source={Constants.Images.block}
                                    style={PopupStyles.blockIcon}
                                />
                                <View>
                                    <Text style={PopupStyles.btnTitle}>
                                        {translate(blockBtnTitle)}
                                    </Text>
                                    <Text style={PopupStyles.btnSubtitle}>
                                        {translate(blockBtnSubtitle)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                    {leaveGroup && (
                        <>
                            {hasUnFollowBtn && (
                                <View style={CommonStyles.divider} />
                            )}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={onBlock}
                                style={PopupStyles.blockBtn}>
                                <Image
                                    source={Constants.Images.exit}
                                    style={PopupStyles.blockIcon}
                                />
                                <View>
                                    <Text style={PopupStyles.btnTitle}>
                                        {translate(leaveGroupTitle)}
                                    </Text>
                                    <Text style={PopupStyles.btnSubtitle}>
                                        {translate(leaveGroupSubTitle)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                    {leaveGroup && <View style={CommonStyles.divider} />}
                    {hasReportBtn && (
                        <>
                            {hasBlockBtn && (
                                <View style={CommonStyles.divider} />
                            )}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={onReport}
                                style={PopupStyles.blockBtn}>
                                <Image
                                    source={Constants.Images.report}
                                    style={PopupStyles.reportIcon}
                                />
                                <View>
                                    <Text style={PopupStyles.btnTitle}>
                                        {translate(reportBtnTitle)}
                                    </Text>
                                    <Text style={PopupStyles.btnSubtitle}>
                                        {translate(reportBtnSubtitle)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    </AnimatedModal>
)

MoreOptionsPopup.propTypes = {
    blockBtnSubtitle: string,
    blockBtnTitle: string,
    hasBlockBtn: bool,
    hasReportBtn: bool,
    hasUnFollowBtn: bool,
    hasFollowBtn: bool,
    leaveGroup: bool,
    leaveGroupSubTitle: bool,
    leaveGroupTitle: bool,
    onBlock: func,
    onClose: func.isRequired,
    onReport: func,
    onUnfollow: func,
    onfollow: func,
    reportBtnSubtitle: string,
    reportBtnTitle: string,
    t: func.isRequired,
    unfollowBtnSubtitle: string,
    unfollowBtnTitle: string,
    followBtnSubtitle: string,
    followBtnTitle: string,
    visible: bool,
}

MoreOptionsPopup.defaultProps = {
    blockBtnSubtitle: 'actions.blockBtnSubtitle',
    blockBtnTitle: 'actions.blockBtnTitle',
    hasBlockBtn: true,
    hasReportBtn: true,
    hasUnFollowBtn: true,
    hasFollowBtn: false,
    leaveGroup: false,
    leaveGroupSubTitle: 'actions.leaveGroupSubTitle',
    leaveGroupTitle: 'actions.leaveGroupTitle',
    onBlock: null,
    onReport: null,
    onUnfollow: null,
    onfollow: null,
    reportBtnSubtitle: 'actions.reportBtnSubtitle',
    reportBtnTitle: 'actions.reportBtnTitle',
    unfollowBtnSubtitle: 'actions.unfollowBtnSubtitle',
    unfollowBtnTitle: 'actions.unfollowBtnTitle',
    followBtnSubtitle: 'actions.followBtnSubtitle',
    followBtnTitle: 'actions.followBtnTitle',
    visible: false,
}

export default withTranslation()(MoreOptionsPopup)
