import React from 'react';
import { StyleSheet, View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { func, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Constants from '../constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.TRANSLUCENT,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    margin: Constants.BaseStyle.scale(5),
    textAlign: 'center',
  },
  image: {
    height: Constants.BaseStyle.scale(50),
    width: Constants.BaseStyle.scale(50),
  },
  okButton: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.TEXT_COLOR2,
    borderRadius: Constants.BaseStyle.scale(5),
    height: Constants.BaseStyle.scale(45),
    justifyContent: 'center',
    width: '80%',
  },
  okButtonTextStyle: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.WHITE,
    fontSize: Constants.BaseStyle.scale(14),
  },
  resendText: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.TEXT_COLOR_WHITE,
    fontSize: Constants.BaseStyle.scale(14),
    margin: Constants.BaseStyle.scale(5),
    textAlign: 'center',
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: Constants.Colors.SECONDARY_COLOR,
    borderRadius: Constants.BaseStyle.scale(8),
    height: '40%',
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    paddingTop: Constants.BaseStyle.scale(20),
    width: '80%',
  },
});

const ForgotPasswordModal = ({
  visible,
  onClick,
}) => {
  const { t: translate } = useTranslation();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            source={Constants.Images.checkmark}
            resizeMode='contain'
            style={styles.image}
          />
          <Text style={styles.header}>{'Password reset link successfully shared to your email "xyz@gmail.com"'}</Text>
          <TouchableOpacity onPress={onClick} style={styles.okButton}>
            <Text style={styles.okButtonTextStyle}>{translate('ok')}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.resendText}>{translate('Resend Link')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ForgotPasswordModal.propTypes = {
  onClick: func.isRequired,
  visible: bool,
};

ForgotPasswordModal.defaultProps = { visible: false };

export default ForgotPasswordModal;
