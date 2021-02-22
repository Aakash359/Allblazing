import React, {Component} from 'react';
import {func, shape} from 'prop-types';
import {View, TouchableOpacity, Text, Button} from 'react-native';
import {withTranslation} from 'react-i18next';
import {IntroCard} from '../../components';
import {AuthStyle, CommonStyles, IntroductionStyles} from '../../styles';
import Constants from '../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import {setIntroComplete} from '../../reducers/baseServices/auth'
import { SET_INTRO_COMPLETE } from '../../actions/auth-action-types';
class Introduction extends Component {
  constructor() {
    super();
    this.state = {itemSelected: 0};
  }

  onBack = () => {
    const {itemSelected} = this.state;
    const {
      navigation: {goBack},
    } = this.props;

    if (itemSelected === 0) {
      goBack();

      return;
    }

    this.setState({itemSelected: itemSelected - 1});
  };


  onNext = async () => {
    const {itemSelected} = this.state;
    const {
      navigation: {navigate},
    } = this.props;

    if (itemSelected === 2) {
      try{
      await AsyncStorage.setItem('intro', 'true')
        console.log('INTRO DONE COMPLETE');
      }
      catch(e) {
        console.log('INTRO NOT SAVED', e);
      }
      this.props.setIntroComplete()
      navigate('Login');

      return;
    }

  

    this.setState({itemSelected: itemSelected + 1});
  };


  render() {
    const {itemSelected} = this.state;
    const {t: translate} = this.props;

  console.log("AUTH INTRO", this.props.intro);
  console.log('INTRO', this.props);


    return (
      <View style={CommonStyles.container}>
        <View style={IntroductionStyles.wrapper}>
          {itemSelected === 0 && (
            <IntroCard
              selected={[0]}
              image={Constants.Images.intro1}
              title={translate('introduction.connect')}
            />
          )}
          {itemSelected === 1 && (
            <IntroCard
              selected={[0, 1]}
              image={Constants.Images.intro2}
              title={translate('introduction.train')}
            />
          )}
          {itemSelected === 2 && (
            <IntroCard
              selected={[0, 1, 2]}
              image={Constants.Images.intro3}
              title={translate('introduction.capture')}
            />
          )}
        </View>
        <View style={IntroductionStyles.buttons}>
          {itemSelected === 2 ? (
            <View style={IntroductionStyles.buttonsWrapper2}>
              {/* <Button title={'click'} onPress={() => this.props.addCount()} /> */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={AuthStyle.introButton2}
                onPress={this.onNext}>
                  {/* <Text>{this.props.count}sdas</Text> */}
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Get Started')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={IntroductionStyles.buttonsWrapper}>
              <TouchableOpacity
                style={[
                  AuthStyle.introButton,
                  {backgroundColor: Constants.Colors.TRANSPARENT},
                ]}
                activeOpacity={0.7}
                onPress={this.onBack}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Back')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={AuthStyle.introButton}
                onPress={this.onNext}>
                <Text
                  style={[
                    AuthStyle.buttonText,
                    {color: Constants.Colors.WHITE},
                  ]}>
                  {translate('Next')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

Introduction.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
  }).isRequired,
  t: func.isRequired,
};
const mapStateToProps = ({auth: {token, intro, count}}) => ({
  token,
  intro,
  count
});

const mapDispatchToProps = {
  addLoginDetail: (params) => setLoginDetails(params),
  setIntroComplete: () => ({type: SET_INTRO_COMPLETE}),
  addCount: () => ({type: 'COUNT'})
};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Introduction));
