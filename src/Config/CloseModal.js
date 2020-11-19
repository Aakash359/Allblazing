import React, { Component } from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';
import { Scale, Colors, Fonts } from './index';
export const CloseModal = ({
  visible,
  alertTitle,
  title,
  rightButtonText,
  leftButtonText,
  onPressLeftButton,
  onPressRightButton,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: Colors.WHITE,
            borderRadius: Scale(20),
            paddingTop: Scale(20),
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontSize: Scale(18),
              fontFamily: Fonts.Bold,
              textAlign:'left',
              color: Colors.BLACK,
              width: '80%'
            }}>
            {title}
          </Text>

          <Text
            style={{
              fontSize: Scale(14),
              fontFamily: Fonts.Medium,
              color: 'rgb(100,100,100)',
              textAlign:'left',
              width: '80%',
              lineHeight: Scale(20),
              marginTop:
                title != '' || title != null || title != undefined
                  ? Scale(10)
                  : Scale(20),
            }}>
            {alertTitle}
          </Text>

          <View
            style={{
              height: Scale(40),
              width: '90%',
              marginTop: Scale(25),
              alignItems: 'flex-end',
              marginBottom: Scale(20)
            }}>


            <TouchableOpacity
              onPress={onPressRightButton}
              style={{
                width: '35%',
                height: '100%',
                backgroundColor: Colors.BUTTON_COLOR,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: Scale(20),
              }}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontSize: Scale(14),
                  fontFamily: Fonts.Medium,
                }}>
                {rightButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
