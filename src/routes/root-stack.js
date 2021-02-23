import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bool} from 'prop-types';
import AuthStack from './auth-stack';
import AppStack from './app-stack';
import {setLoginDetails} from '../reducers/baseServices/auth';
import {withTranslation} from 'react-i18next';
import {getAuthToken, getLoginUserId} from '../helpers/auth';
import SplashScreen from 'react-native-splash-screen';
import {setTopLevelNavigator} from '../routes/navigation-service';
class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
    };
  }

  componentDidMount() {
    
    this._loadAccessToken();
    this._loadUserDetails();
   
  }
  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.setState({accessToken: this.props.token});
    }
  }
  _loadAccessToken = async () => {
    const token = await getAuthToken();
    const userId = await getLoginUserId();
    // const userId = await getLoginUserId();
    // console.log('JSON.parse(userId)========',userId,token);
    this.props.addLoginDetail(JSON.parse(userId));
    SplashScreen.hide()
    // this.setState({accessToken: token});
  };

  _loadUserDetails = async () => {
    const {addLoginDetail} = this.props;
    const userId = await getLoginUserId();
    addLoginDetail(JSON.parse(userId));
  };
  

  render() {
    const {token, intro} = this.props;
    console.log('INTRO DONE', intro);
    console.log('==========>>>.Token', this.state.accessToken);
    return token ?  <AppStack /> : <AuthStack />;
  }
}

const mapStateToProps = ({auth: {token, intro}}) => ({
  token,
  intro
});

const mapDispatchToProps = {
  addLoginDetail: (params) => setLoginDetails(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AppNavigator));
