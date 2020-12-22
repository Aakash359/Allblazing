import React from 'react';
import { SafeAreaView, Modal } from 'react-native';
import { bool, func, node } from 'prop-types';

const AnimatedModal = ({
  children, visible, onRequestClose,
}) => (
  <SafeAreaView>
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onRequestClose}>
      {children}
    </Modal>
  </SafeAreaView>
);

AnimatedModal.propTypes = {
  children: node.isRequired,
  onRequestClose: func,
  visible: bool,
};

AnimatedModal.defaultProps = {
  onRequestClose: null,
  visible: false,
};

export default AnimatedModal;
