import React from 'react';
import { View, Modal, TouchableOpacity, Text, Image } from 'react-native';
import { func, bool } from 'prop-types';
import { ImagesPath, Colors, Scale, Fonts } from '../Config';

export const CloseModal = ({
  visible,
  onPressButton,
}) => (
  <Modal visible={visible} animationType="fade" transparent>
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
      }}
    >
      <View
        style={{
          width: '80%',
          height: '40%',
          backgroundColor: Colors.BUTTON_COLOR,
          borderRadius: Scale(8),
          paddingTop: Scale(20),
          alignItems: 'center',
          overflow: 'hidden',
          justifyContent: 'space-evenly',
        }}
      >

        <Image
          source={ImagesPath.checkmark}
          resizeMode='contain'
          style={{
            height: Scale(50),
            width: Scale(50),
          }}
        />
        <Text style={[{
          fontSize: Scale(14),
          color: Colors.TEXT_COLOR_WHITE,
          fontFamily: Fonts.Medium,
        }, {
          textAlign: 'center', margin: Scale(5),
        }]}
        >
          {'password link successfully shared to your email xyz@gmail.com '}
        </Text>

        <TouchableOpacity
          onPress={onPressButton}
          style={{
            width: '80%',
            height: Scale(45),
            backgroundColor: Colors.TEXT_COLOR2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Scale(5),
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: Scale(14),
              fontFamily: Fonts.Medium,
            }}
          >
            {'Ok'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[{
            fontSize: Scale(14),
            color: Colors.TEXT_COLOR_WHITE,
            fontFamily: Fonts.Medium,
          }, {
            textAlign: 'center', margin: Scale(5),
          }]}
          >
            {'Resend Link'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

CloseModal.propTypes = {
  onPressButton: func.isRequired,
  visible: bool,
};

CloseModal.defaultProps = { visible: false };

export default CloseModal;
