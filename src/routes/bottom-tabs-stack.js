import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {BottomTab} from '../components';
import Constants from '../constants';
import {BottomTabsStyles} from '../styles';
import CreateNew from '../screens/create/create-new';
import ChatStack from './chat-stack';
import CreatePostStack from './create-post-stack';
import DiscoverStack from './discover-stack';
import HomeNavigator from './home-stack';
import ProfileStack from './profile-stack';
import Modal from 'react-native-modalbox';

const MyModalBackgroundScreen = () => {
  return null;
};
const Tab = createBottomTabNavigator();

const tabBarOptions = {
  activeBackgroundColor: Constants.Colors.SECONDARY_COLOR,
  activeTintColor: Constants.Colors.WHITE,
  inactiveBackgroundColor: Constants.Colors.SECONDARY_COLOR,
  inactiveTintColor: Constants.Colors.SECONDARY_COLOR,
  keyboardHidesTabBar: true,
  labelPosition: 'below-icon',
  labelStyle: BottomTabsStyles.label,
  showLabel: true,
  style: BottomTabsStyles.tab,
};

const tabProps = {
  backBehavior: 'history',
  initialRouteName: 'Home',
  lazy: true,
  sceneContainerStyle: BottomTabsStyles.container,
  tabBarOptions,
};

const TabNavigator = () => {
  const [modalOpen, setModalOpen] = React.useState(true);
  const {t} = useTranslation();

  return (
    <Tab.Navigator {...tabProps} tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen
        options={{tabBarLabel: t('Home')}}
        name="Home"
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{tabBarLabel: t('Discover')}}
        name="Discover"
        component={DiscoverStack}
      />
      <Tab.Screen
        options={{tabBarLabel: t('Create')}}
        name="Create"
        component={MyModalBackgroundScreen}
        options={{
          tabBarButton: () => {
            return (
              <Modal
                isOpen={true}
                style={CreateNewStyles.modal}
                backdropPressToClose={true}
                swipeToClose={true}
                position="bottom"
                entry="bottom"
                backdropColor={Constants.Colors.CARD_GREY}
                // coverScreen={true}
                backdropOpacity={0.5}>
                <View style={CreateNewStyles.modalView}>
                  <View style={CreateNewStyles.rowView}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigate('CreateGroup')}
                      style={CreateNewStyles.tagView}>
                      <Image
                        style={CreateNewStyles.icons}
                        source={Constants.Images.addFriend}
                      />
                      <Text style={CreateNewStyles.modalText}>
                        {'Create Group'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigate('CreateEvent')}
                      style={CreateNewStyles.tagView}>
                      <Image
                        style={CreateNewStyles.icons}
                        source={Constants.Images.addFriend}
                      />
                      <Text style={CreateNewStyles.modalText}>
                        {'Create Event'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={CreateNewStyles.rowView}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigate('CreatePost')}
                      style={CreateNewStyles.tagView}>
                      <Image
                        style={CreateNewStyles.icons}
                        source={Constants.Images.addFriend}
                      />
                      <Text style={CreateNewStyles.modalText}>
                        {'Create Post'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => navigate('LiveStream')}
                      style={CreateNewStyles.tagView}>
                      <Image
                        style={CreateNewStyles.icons}
                        source={Constants.Images.addFriend}
                      />
                      <Text style={CreateNewStyles.modalText}>{'Go Live'}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModalOpen(!modalOpen)}
                    style={{alignItems: 'center', paddingBottom: 30}}>
                    <Image
                      style={CreateNewStyles.icons}
                      source={Constants.Images.closeRed}
                    />
                  </TouchableOpacity>
                </View>
              </Modal>
            );
          },
        }}
      />
      <Tab.Screen
        options={{tabBarLabel: t('Chat')}}
        name="Chat"
        component={ChatStack}
      />
      <Tab.Screen
        options={{tabBarLabel: t('Me')}}
        name="Me"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
