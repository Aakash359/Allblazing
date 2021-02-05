import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { func } from 'prop-types';
import { withTranslation } from 'react-i18next';
import Constants from '../../constants';
import { InvitePopupStyles,CreateNewStyles,CommonStyles } from '../../styles';
import AnimatedModal from '../animate-modal';

const PlusIconPopup = ({
  onFacebook, onStrava, onWhatsApp, onClose, t: translate,navigation
}) => (
  <AnimatedModal visible>
    <TouchableOpacity style={InvitePopupStyles.popup} activeOpacity={1} >
      <View style={InvitePopupStyles.container2}>  
      <View style={InvitePopupStyles.wrapper2}>
    <View style = {CreateNewStyles.rowView}>
    <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    onClose();
                    navigation.navigate('CreateGroup')}}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Create Group'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>{
                    onClose();
                    navigation.navigate('CreateEvent')}}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Create Event'}</Text>
              </TouchableOpacity>
    </View>
           
            
            <View style={CreateNewStyles.rowView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>{
                    onClose();
                    navigation.navigate('CreatePost')}}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Create Post'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    onClose();
                    navigation.navigate('LiveStream')}}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Go Live'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                
              >

               <Image
                source={Constants.Images.closeRed}
                resizeMode="contain"
                style={CommonStyles.crossImage2}
              />
              </TouchableOpacity>
           
            </View>
           
      </View>
    </TouchableOpacity>
  </AnimatedModal>
);

PlusIconPopup.propTypes = {
  onClose: func.isRequired,
  onFacebook: func.isRequired,
  onStrava: func.isRequired,
  onWhatsApp: func.isRequired,
  t: func.isRequired,
};

export default withTranslation()(PlusIconPopup);
