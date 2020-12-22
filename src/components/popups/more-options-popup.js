import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { bool, func, string } from 'prop-types';
import Constants from '../../constants';
import { CommonStyles, InvitePopupStyles, PopupStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const MoreOptionsPopup = ({
  blockBtnTitle,
  blockBtnSubtitle,
  hasBlockBtn,
  hasReportBtn,
  hasUnFollowBtn,
  leaveGroup,
  leaveGroupTitle,
  leaveGroupSubTitle,
  onClose,
  onBlock,
  onReport,
  onUnfollow,
  reportBtnTitle,
  reportBtnSubtitle,
  unfollowBtnSubtitle,
  unfollowBtnTitle,
  visible,
}) => (
  <AnimatedModal visible={visible}>
    <TouchableOpacity style={InvitePopupStyles.popup} onPress={onClose}>
      <View style={[PopupStyles.container, PopupStyles.moreOptionsContainer]}>
        <View style={[PopupStyles.wrapper, PopupStyles.moreOptionsWrapper]}>
          { hasUnFollowBtn && (
            <TouchableOpacity activeOpacity={0.7} onPress={onUnfollow} style={PopupStyles.blockBtn}>
              <Image source={Constants.Images.addUser} style={PopupStyles.blockIcon} />
              <View>
                <Text style={PopupStyles.btnTitle}>{unfollowBtnTitle}</Text>
                <Text style={PopupStyles.btnSubtitle}>{unfollowBtnSubtitle}</Text>
              </View>
            </TouchableOpacity>
          )}
          { hasBlockBtn && (
            <>
              {hasUnFollowBtn && <View style={CommonStyles.divider} />}
              <TouchableOpacity activeOpacity={0.7} onPress={onBlock} style={PopupStyles.blockBtn}>
                <Image source={Constants.Images.block} style={PopupStyles.blockIcon} />
                <View>
                  <Text style={PopupStyles.btnTitle}>{blockBtnTitle}</Text>
                  <Text style={PopupStyles.btnSubtitle}>{blockBtnSubtitle}</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          { leaveGroup && (
            <>
              {hasUnFollowBtn && <View style={CommonStyles.divider} />}
              <TouchableOpacity activeOpacity={0.7} onPress={onBlock} style={PopupStyles.blockBtn}>
                <Image source={Constants.Images.exit} style={PopupStyles.blockIcon} />
                <View>
                  <Text style={PopupStyles.btnTitle}>{leaveGroupTitle}</Text>
                  <Text style={PopupStyles.btnSubtitle}>{leaveGroupSubTitle}</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {leaveGroup && <View style={CommonStyles.divider} />}
          {hasReportBtn && (
            <>
              {hasBlockBtn && <View style={CommonStyles.divider} />}
              <TouchableOpacity activeOpacity={0.7} onPress={onReport} style={PopupStyles.blockBtn}>
                <Image source={Constants.Images.report} style={PopupStyles.reportIcon} />
                <View>
                  <Text style={PopupStyles.btnTitle}>{reportBtnTitle}</Text>
                  <Text style={PopupStyles.btnSubtitle}>{reportBtnSubtitle}</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  </AnimatedModal>
);

MoreOptionsPopup.propTypes = {
  blockBtnSubtitle: string,
  blockBtnTitle: string,
  hasBlockBtn: bool,
  hasReportBtn: bool,
  hasUnFollowBtn: bool,
  leaveGroup: bool,
  leaveGroupSubTitle: bool,
  leaveGroupTitle: bool,
  onBlock: func,
  onClose: func.isRequired,
  onReport: func,
  onUnfollow: func,
  reportBtnSubtitle: string,
  reportBtnTitle: string,
  unfollowBtnSubtitle: string,
  unfollowBtnTitle: string,
  visible: bool,
};

MoreOptionsPopup.defaultProps = {
  blockBtnSubtitle: 'Why are you blocking them?',
  blockBtnTitle: 'Block User',
  hasBlockBtn: true,
  hasReportBtn: true,
  hasUnFollowBtn: true,
  leaveGroup: false,
  leaveGroupSubTitle: 'you will not longer to get the notofication about group events',
  leaveGroupTitle: 'Leave Group',
  onBlock: null,
  onReport: null,
  onUnfollow: null,
  reportBtnSubtitle: 'Tell us what they did',
  reportBtnTitle: 'Report User',
  unfollowBtnSubtitle: 'You will stop seeing post in your feed',
  unfollowBtnTitle: 'Unfollow',
  visible: false,
};

export default MoreOptionsPopup;
