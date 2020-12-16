import React from 'react';
import { TouchableOpacity, View, FlatList, Text, ScrollView, ImageBackground } from 'react-native';
import { func, shape } from 'prop-types';
import Constants from '../../constants';
import { HomeStyles, GroupDetailStyles, MyProfileStyles } from '../../styles';
import { SingleEvent } from '../../components';

class GroupDetail extends React.Component {
  renderItem = () => {
    const { navigation: { navigate } } = this.props;

    return (<SingleEvent onPress={() => navigate('SingleEventDetail')} />);
  }

  renderHeader = ({
    navigate, payload = {}, route, title,
  }) => (
    <View style={HomeStyles.content}>
      <Text style={HomeStyles.heading}>{title}</Text>
      <TouchableOpacity hitSlop={Constants.BaseStyle.HALF_HIT_SLOP} onPress={() => navigate(route, payload)}>
        <Text style={HomeStyles.rightHeading}>{'View All'}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <>
        <View style={HomeStyles.GroupDetailStyles}>
          <ScrollView>
            <ImageBackground
              source={Constants.Images.groupDetails}
              // resizeMode='contain'
              imageStyle={MyProfileStyles.borderRadius}
              style={MyProfileStyles.profileIcon}
            >
              <View style={MyProfileStyles.overlappingStyle}>
                <View>
                  <Text style={MyProfileStyles.heading}>{'Super Nova'}</Text>
                  <Text style={MyProfileStyles.subHeading}>{'18 Members'}</Text>
                </View>
              </View>
            </ImageBackground>
            <View>
              <FlatList
                scrollEnabled={false}
                data={[1, 2, 3]}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${index}`}
              />
            </View>
            <TouchableOpacity
              style={GroupDetailStyles.nextView}
            >
              <Text style={GroupDetailStyles.nextText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </>
    );
  }
}

GroupDetail.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default GroupDetail;
