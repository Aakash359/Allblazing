import React from 'react';
import { SafeAreaView, Modal } from 'react-native';
import { bool, node } from 'prop-types';

const AnimatedModal = ({
  children, visible,
}) => (
  <SafeAreaView>
    <Modal animationType="slide" transparent visible={visible}>
      {children}
    </Modal>
  </SafeAreaView>
);

AnimatedModal.propTypes = {
  children: node.isRequired,
  visible: bool,
};

AnimatedModal.defaultProps = { visible: false };

export default AnimatedModal;
