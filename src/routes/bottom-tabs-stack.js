import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { BottomTab } from '../components';
import Constants from '../constants';
import { BottomTabsStyles } from '../styles';
import ChatStack from './chat-stack';
import CreatePostStack from './create-post-stack';
import DiscoverStack from './discover-stack';
import HomeNavigator from './home-stack';
import ProfileStack from './profile-stack';
import {PlusIconPopup} from '../components';
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
const Dummy = () => {
  return null;
};
const TabNavigator = () => {
  const { t } = useTranslation();
  const [visible,seVisible] = React.useState(false)
  return (
    <Tab.Navigator {...tabProps} tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen options={{ tabBarLabel: t('Home') }} name="Home" component={HomeNavigator} />
      <Tab.Screen options={{ tabBarLabel: t('Discover') }} name="Discover" component={DiscoverStack} />
      <Tab.Screen 
      listeners={({ navigation, route }) => ({
        tabPress: e => {
          e.preventDefault();
          
          //navigation.navigate("EntryFormFlow");
        },
      })}
      options={{ 
        tabBarLabel: t('Create'), 
        tabBarButton:()=>{
          return(  <Text style = {{color:'red'}}>HI</Text>)
       
          // return( <PlusIconPopup
          //   // onFacebook={() => this.setState({visible: false})}
            
          //   // onWhatsApp={() => this.setState({visible: false})}
          //   onClose={() => seVisible(!visible)}
          // />)
        }  
    }} 
        name="Create"
        component={() => null}
      />
      <Tab.Screen options={{ tabBarLabel: t('Chat') }} name="Chat" component={ChatStack} />
      <Tab.Screen options={{ tabBarLabel: t('Me') }} name="Me" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
