import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { bool, func, string } from 'prop-types';
import Constants from '../../constants';
import { CommonStyles, PopupStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const MoreOptionsPopup = ({
  blockBtnTitle, blockBtnSubtitle, onBlock, onReport, reportBtnTitle, reportBtnSubtitle, visible,
}) => (
  <AnimatedModal visible={visible}>
    <View style={[PopupStyles.container, PopupStyles.moreOptionsContainer]}>
      <View style={[PopupStyles.wrapper, PopupStyles.moreOptionsWrapper]}>
        <TouchableOpacity activeOpacity={0.7} onPress={onBlock} style={PopupStyles.blockBtn}>
          <Image source={Constants.Images.block} style={PopupStyles.blockIcon} />
          <View>
            <Text style={PopupStyles.btnTitle}>{blockBtnTitle}</Text>
            <Text style={PopupStyles.btnSubtitle}>{blockBtnSubtitle}</Text>
          </View>
        </TouchableOpacity>
        <View style={CommonStyles.divider} />
        <TouchableOpacity activeOpacity={0.7} onPress={onReport} style={PopupStyles.blockBtn}>
          <Image source={Constants.Images.report} style={PopupStyles.reportIcon} />
          <View>
            <Text style={PopupStyles.btnTitle}>{reportBtnTitle}</Text>
            <Text style={PopupStyles.btnSubtitle}>{reportBtnSubtitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </AnimatedModal>
);

MoreOptionsPopup.propTypes = {
  blockBtnSubtitle: string,
  blockBtnTitle: string,
  onBlock: func.isRequired,
  onReport: func.isRequired,
  reportBtnSubtitle: string,
  reportBtnTitle: string,
  visible: bool,
};

MoreOptionsPopup.defaultProps = {
  blockBtnSubtitle: 'Why are you blocking them?',
  blockBtnTitle: 'Block User',
  reportBtnSubtitle: 'Tell us what they did',
  reportBtnTitle: 'Report User',
  visible: false,
};

export default MoreOptionsPopup;
