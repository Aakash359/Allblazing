import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { arrayOf, func, shape, string } from 'prop-types';
import { BottomTabsStyles } from '../styles';
import Constants from '../constants';

const getTabImage = (name, active) => {
  if (name === 'Home') {
    return active ? Constants.Images.tabBarHomeActive : Constants.Images.tabBarHome;
  }

  if (name === 'Discover') {
    return active ? Constants.Images.tabBarFeedActive : Constants.Images.tabBarFeed;
  }

  if (name === 'Create') {
    return Constants.Images.tabBarAdd;
  }

  if (name === 'Chat') {
    return active ? Constants.Images.tabBarChatActive : Constants.Images.tabBarChat;
  }

  if (name === 'Me') {
    return active ? Constants.Images.tabBarProfileActive : Constants.Images.tabBarProfile;
  }

  return Constants.Images.tabBarHome;
};

export const BottomTab = ({
  state, descriptors, navigation,
}) => (
  <View style={BottomTabsStyles.tabs}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];

      let label = '';

      if (options.tabBarLabel) {
        label = options.tabBarLabel;
      } else if (options.title) {
        label = options.title;
      } else {
        label = route.name;
      }

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          canPreventDefault: true,
          target: route.key,
          type: 'tabPress',
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          target: route.key,
          type: 'tabLongPress',
        });
      };

      const styles = label === 'Create' ? BottomTabsStyles.add : BottomTabsStyles.tab;
      const currentImage = getTabImage(label, isFocused);

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          key={route.key}
          style={styles}
          onPress={onPress}
          onLongPress={onLongPress}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
        >
          <Image style={BottomTabsStyles.image} source={currentImage} />
          {/* {label !== 'Create' && (<Text style={[BottomTabsStyles.tabText, isFocused && BottomTabsStyles.active]}>{label}</Text>)} */}
        </TouchableOpacity>
      );
    })}
  </View>
);

BottomTab.propTypes = {
  descriptors: shape({ name: string }).isRequired,
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
  state: shape({ routes: arrayOf(shape({ key: string.isRequired })).isRequired }).isRequired,
};

export default BottomTab;
