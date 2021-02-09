import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FollowersStyles, FeedDetailStyles} from '../../styles';
import Constants from '../../constants';
import moment from 'moment';
import {func, shape} from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

class FeedDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      isLoading: false,
      list: [],
    };
  }

  render() {
    // const {nam} = this.state;
    const {
      navigation: {goBack, navigate, getParam},
      route: {params},
      t: translate,
    } = this.props;
    const {like,isLoading}=this.state;
    const autherName = this.props.route.params.data.autherName;
    const likeCount = this.props.route.params.data.likeCount;
    const likeStatus = this.props.route.params.data.likeStatus;
    const created_at = this.props.route.params.data.created_at;
    const post = this.props.route.params.data.post;
    return (
      <>
        <View style={FeedDetailStyles.container}>
        <View style={[FeedDetailStyles.listView]}>
          <View style={FeedDetailStyles.innerView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>this.props.navigation.goBack()}>
              <Image
                source={Constants.Images.arrowLeft}
                style={FeedDetailStyles.arrowLeft}
              />
            </TouchableOpacity>
            <Image source={{uri: post}} style={FeedDetailStyles.userImage} />
            <View style={FeedDetailStyles.nameView}>
              <Text style={FollowersStyles.nameText}>{autherName}</Text>
              <Text style={FollowersStyles.locationText}>
                {moment(created_at).format('LT')}
              </Text>
            </View>
          </View>
          <View style={FeedDetailStyles.heartView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({like:!like});
              }}>
              <Image
                source={
                  likeStatus > 0
                    ? Constants.Images.selectedHeart
                    : Constants.Images.heart
                }
                style={FeedDetailStyles.heartIcon}
              />
            </TouchableOpacity>
            <Text style={FollowersStyles.nameText}>{likeCount}</Text>
          </View>
        </View>
        <Image source={{uri: post}}  style={FeedDetailStyles.feedImg} resizeMode="contain"/>
        </View>
      </>
    );
  }
}

// export default FeedDetailScreen;

FeedDetailScreen.propTypes = {
  // loginSuccess: func.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  // addFullName: (params) => setFullName(params),
  addCreateGroupDetail: (params) => setCreateGroupDetails(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(FeedDetailScreen));
