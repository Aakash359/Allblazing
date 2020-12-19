import React from 'react';
import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native';
import { func, shape } from 'prop-types';
import Modal from 'react-native-modalbox';
import Constants from '../../constants';
import { HomeStyles, CreateNewStyles } from '../../styles';
import { HeaderSearchBar, SingleEvent } from '../../components';

class CreateNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '', modalOpen: true,
    };
  }

  renderItem = () => {
    const { navigation: { navigate } } = this.props;

    return (<SingleEvent onPress={() => navigate('SingleEventDetail')} />);
  }

  renderHeader = ({
    navigate, payload = {}, route, title,
  }) => (
    <View style={HomeStyles.content}>
      <Text style={HomeStyles.heading}>{title}</Text>
      <TouchableOpacity activeOpacity={0.7} hitSlop={Constants.BaseStyle.HALF_HIT_SLOP} onPress={() => navigate(route, payload)}>
        <Text style={HomeStyles.rightHeading}>{'View All'}</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { navigation: { navigate } } = this.props;
    const { keyword } = this.state;
    const { modalOpen } = this.state;

    return (
      <>
        <View style={HomeStyles.container}>
          <HeaderSearchBar keyword={keyword} onChangeText={(value) => this.setState({ keyword: value })} />
          <View>
            {this.renderHeader({
              navigate, route: 'Events', title: 'Events',
            })}
            <FlatList
              scrollEnabled={false}
              data={[1]}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
          <View style={CreateNewStyles.bottomView}>

            <Image style={CreateNewStyles.runnerImage} source={Constants.Images.runnerImage} />
            <Text style={CreateNewStyles.modalText}>{'No runners avilable in nearby area'}</Text>
          </View>
        </View>
        <Modal
          isOpen={modalOpen}
          style={CreateNewStyles.modal}
          backdropPressToClose={false}
          swipeToClose={false}
          position="bottom"
          entry="bottom"
          backdropColor={Constants.Colors.CARD_GREY}
          backdropOpacity={0.50}
        >
          <View style={CreateNewStyles.modalView}>
            <View style={CreateNewStyles.rowView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigate('CreateGroup')}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Create Group'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigate('CreateEvent')}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Create Event'}</Text>
              </TouchableOpacity>
            </View>
            <View style={CreateNewStyles.rowView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigate('CreatePost')}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Create Post'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigate('LiveFeed')}
                style={CreateNewStyles.tagView}
              >
                <Image style={CreateNewStyles.icons} source={Constants.Images.addFriend} />
                <Text style={CreateNewStyles.modalText}>{'Go Live'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

CreateNew.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
};

export default CreateNew;
