import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from '../../constants';
import { AddMemberStyles } from '../../styles';

function AddMember() {
  const [checked, setCheck] = useState(false);
  const navigation = useNavigation();

  const renderItem = () => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setCheck(!checked)} style={AddMemberStyles.container}>
      <View style={AddMemberStyles.userWrapper}>
        <Image source={{ uri: 'https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg' }} style={AddMemberStyles.userImage} />
        <View>
          <Text style={AddMemberStyles.username}>Shane Watson</Text>
          <Text style={AddMemberStyles.location}>Santee, United States</Text>
        </View>
      </View>
      <Image source={checked ? Constants.Images.checkbox : Constants.Images.checkoff} resizeMode='contain' style={AddMemberStyles.icon} />
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddMember')}
        style={AddMemberStyles.nextView}
      >
        <Text style={AddMemberStyles.nextText}>Create Group</Text>
      </TouchableOpacity>
    </>
  );
}

export default AddMember;
