import React from 'react';
import { View, FlatList, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
import { bool, func, shape } from 'prop-types';
import { ScrollView } from 'react-native-gesture-handler';
import { HomeStyles, ChatStyles } from '../../styles';
import { GroupsInfo, RemoveMemberPopup } from '../../components';
import Constants from '../../constants';

class GroupInfo extends React.Component {
  constructor() {
    super();
    this.state = { removeMemberPopup: false };
  }

  onPressOk = () => {
    this.setState({ removeMemberPopup: true });
  }

    renderItem = () => {
      const {
        route: { params }, navigation: { navigate },
      } = this.props;

      return (<GroupsInfo hasCheckBox={params?.hasCheckBox} hasTick={params?.hasTick} navigation={navigate} onPressButton={() => this.onPressOk()} />);
    }

    render() {
      const { navigation: { navigate } } = this.props;
      const { removeMemberPopup } = this.state;

      return (
        <View style={HomeStyles.container}>
          <ScrollView>
            <View>
              <ImageBackground
                source={Constants.Images.groupDetails}
                imageStyle={ChatStyles.borderRadius}
                style={ChatStyles.profileIcon}
              >

                <View style={ChatStyles.overlappingStyle}>
                  <View>
                    <Text style={ChatStyles.heading}>{'Super Nova'}</Text>
                    <Text style={ChatStyles.subHeading}>{'18 Members'}</Text>
                  </View>
                  <TouchableOpacity>
                    <Image
                      source={Constants.Images.edit}
                      resizeMode='contain'
                      style={ChatStyles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            <View style={ChatStyles.groupNameContainer}>
              <View>
                <Text style={ChatStyles.groupNameHeading}>{'Super Nova'}</Text>

              </View>
              <TouchableOpacity
                onPress={() => { navigate('EditGroupName'); }}
              >
                <Image
                  source={Constants.Images.edit}
                  resizeMode='contain'
                  style={ChatStyles.iconGroupName}
                />
              </TouchableOpacity>

            </View>
            <View style={ChatStyles.groupDiscContainer}>
              <View style={ChatStyles.groupDiscInnerContainer}>
                <Text style={ChatStyles.groupDiscHeading}>{'Discription'}</Text>
                <TouchableOpacity
                  onPress={() => { navigate('EditGroupDisc'); }}
                >

                  <Image
                    source={Constants.Images.edit}
                    resizeMode='contain'
                    style={ChatStyles.iconGroupName}
                  />
                </TouchableOpacity>
              </View>
              <Text style={ChatStyles.discText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec luctus nibh. Donec scelerisque dolor ipsum.
                Maecenas dapibus molestie dictum
              </Text>
            </View>
            <View>

              <Text style={ChatStyles.groupMemberHeading}>{'Members'}</Text>

            </View>
            <FlatList
              data={[1, 2, 3, 4, 5]}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `${index}`}
            />

          </ScrollView>
          { removeMemberPopup && (
            <RemoveMemberPopup
              onLogout={this.removeMemberPopup}
              onCancel={() => this.setState({ removeMemberPopup: false })}
            />
          )}
        </View>
      );
    }
}

GroupInfo.propTypes = {
  navigation: shape({
    navigate: func,
    setParams: func,
  }).isRequired,
  route: shape({ params: shape({ isMapView: bool }) }).isRequired,
};

export default GroupInfo;
