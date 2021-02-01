import React, {useState, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ProfileStyles} from '../../styles';
import UserGoalScreen from './user-goals';
import Constants from '../../constants';
import {MoreOptionsPopup} from '../../components';
import profileStyles from '../../styles/profile-styles';
import {useSelector} from 'react-redux';
import axios from 'axios';
import API from '../../constants/baseApi';

// class UserProfile extends Component {

function UserProfile() {
  const optionList = ['Goals', "PB's", 'Likes'];
  const follow_id = useSelector(({profile}) => profile?.follow_id ?? '');
  // console.log('id:', follow_id);

  const navigation = useNavigation();
  const route = useRoute();
  const [followStatus, setFollowStatus] = useState(false);

  const [option, setOption] = useState('Goals');

  const displayOptions = () => <UserGoalScreen />;

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        ProfileStyles.optionalSectionView,
        {
          backgroundColor:
            item === option ? Constants.Colors.GRAY : Constants.Colors.PRIMARY,
        },
      ]}
      onPress={() => {
        setOption(item);
      }}>
      <Text style={ProfileStyles.optionalSection1}>{item}</Text>
    </TouchableOpacity>
  );

  const handleUserFollow = useCallback(async () => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xdXl0ZWNoLm5ldFwvcnVuZmFzdC1zZnRwXC9SdW5GYXN0XC9wdWJsaWNcL2FwaVwvbG9naW4iLCJpYXQiOjE2MTAzODE0MzQsImV4cCI6MTY0MTkxNzQzNCwibmJmIjoxNjEwMzgxNDM0LCJqdGkiOiI3RWRvMGlJTnl4SXFVVzhqIiwic3ViIjoyLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.YVbGsO63fIzvn7M5uciyRF24FAf0HEhvgPLnR2_Irro';
    // console.log('====>', token);
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };

    axios
      .post(
        API.FOLLOW,
        {
          follow_id: 3,
        },
        config,
      )
      .then((response) => {
        if (response.data.code == 200) {
          Alert.alert('', response?.data?.message ?? '');
          setFollowStatus(!followStatus);
        }
      });
  }, []);

  return (
    <View style={ProfileStyles.container}>
      <View>
        <TouchableOpacity activeOpacity={0.7}>
          <View>
            <ImageBackground
              source={Constants.Images.profilePic}
              imageStyle={ProfileStyles.borderRadius}
              style={ProfileStyles.profileIcon}>
              <View style={ProfileStyles.levelStyle}>
                <Text style={ProfileStyles.levelText}>Level 1</Text>
              </View>
              <View style={profileStyles.overlappingStyle}>
                <View>
                  <Text style={ProfileStyles.heading}>
                    {'Cameron Williamson, 23'}
                  </Text>
                  <Text style={ProfileStyles.subHeading}>
                    {'It always seems impossible until it`s done!'}
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <Image
                    source={Constants.Images.chat}
                    resizeMode="contain"
                    style={ProfileStyles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  // onPress={() => setFollowStatus(!followStatus)}
                  onPress={() => handleUserFollow()}>
                  <Image
                    source={Constants.Images.add}
                    resizeMode="contain"
                    style={ProfileStyles.icon}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <View style={ProfileStyles.sectionMainView}>
          <View style={ProfileStyles.sectionView}>
            <Text style={ProfileStyles.section2}>{'48'}</Text>
            <Text style={ProfileStyles.section1}>{'Followers'}</Text>
          </View>
          <View style={ProfileStyles.sectionView}>
            <Text style={ProfileStyles.section2}>{'127'}</Text>
            <Text style={ProfileStyles.section1}>{'Following'}</Text>
          </View>
          <View style={ProfileStyles.sectionView}>
            <Text style={ProfileStyles.section2}>{'3K'}</Text>
            <Text style={ProfileStyles.section1}>{'Posts'}</Text>
          </View>
          <View style={ProfileStyles.sectionViewEnd}>
            <TouchableOpacity onPress={() => navigation.navigate('ChatsGroup')}>
              <Text style={ProfileStyles.section2}>{'5'}</Text>
              <Text style={ProfileStyles.section1}>{'Groups'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {followStatus ? (
          <View>
            <FlatList
              scrollEnabled={false}
              contentContainerStyle={ProfileStyles.sectionMainView}
              data={optionList}
              renderItem={renderItem}
              keyExtractor={(id, index) => index.toString()}
            />
            {displayOptions(option)}
          </View>
        ) : (
          <View style={ProfileStyles.iconView}>
            <Image
              source={Constants.Images.lockProfile}
              resizeMode="contain"
              style={ProfileStyles.lockedIcon}
            />
            <Text style={ProfileStyles.bottomHeader}>{'Private Account'}</Text>
            <Text style={ProfileStyles.bottomHeader2}>
              {'Follow this account to see photos and videos.'}
            </Text>
          </View>
        )}
      </View>
      {route?.params?.visible && (
        <MoreOptionsPopup
          hasUnFollowBtn={false}
          visible={route?.params?.visible}
          onBlock={() => {
            navigation.setParams({visible: false});
            navigation.navigate('BlockReportUser', {isBlockPage: true});
          }}
          onReport={() => {
            navigation.setParams({visible: false});
            navigation.navigate('BlockReportUser', {isBlockPage: false});
          }}
          onClose={() => navigation.setParams({visible: false})}
        />
      )}
    </View>
  );
}

export default UserProfile;


