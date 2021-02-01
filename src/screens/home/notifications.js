import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
// import constants from '../../constants';
import {NotificationStyles} from '../../styles';
import UserImages from '../../components/user-images';

function Notification() {
  const notification = [
    {
      notificationHeader: 'Invitation to record live stream',
      notificationMessage:
        'Kelly Norman sent you an invitation to record live stream',
      notificationTime: '10:30 am',
    },
    {
      notificationHeader: 'Invitation to record live stream',
      notificationMessage:
        'Kelly Norman sent you an invitation to record live stream',
      notificationTime: '10:30 am',
    },
    {
      notificationHeader: 'Invitation to record live stream',
      notificationMessage:
        'Kelly Norman sent you an invitation to record live stream',
      notificationTime: '10:30 am',
    },
    {
      notificationHeader: 'Invitation to record live stream',
      notificationMessage:
        'Kelly Norman sent you an invitation to record live stream',
      notificationTime: '10:30',
    },
    {
      notificationHeader: 'Invitation to record live stream',
      notificationMessage:
        'Kelly Norman sent you an invitation to record live stream',
      notificationTime: '10:30 am',
    },
  ];
  const renderNotification = ({item}) => (
    <TouchableOpacity activeOpacity={1} style={NotificationStyles.item}>
      <View style={NotificationStyles.row}>
        <UserImages users={[1]} />
        <Text style={NotificationStyles.header}>{item.notificationHeader}</Text>
      </View>
      <Text style={NotificationStyles.description}>
        {item.notificationMessage}
      </Text>
      <View style={[NotificationStyles.row, NotificationStyles.usersRow]}>
        <Text style={NotificationStyles.iconText}>{item.notificationTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={NotificationStyles.container}>
      <FlatList
        data={notification}
        renderItem={renderNotification}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}

export default Notification;
