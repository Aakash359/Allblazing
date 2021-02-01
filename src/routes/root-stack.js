import { createStackNavigator } from '@react-navigation/stack';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bool } from 'prop-types';
import AuthStack from './auth-stack';
import AppStack from './app-stack';
import { setLoginDetails } from '../reducers/baseServices/auth';
import { withTranslation } from 'react-i18next';
import {getAuthToken} from '../helpers/auth';



class AppNavigator extends Component {

  
  constructor(props) {
    super(props);

    this.state = {
      accessToken: ''
    };

    this._loadAccessToken();
  }

  _loadAccessToken = async () => {
    const token = await getAuthToken();
    this.setState({ accessToken: token });
  }

 
  render() {
    // const {token} = this.props;
    console.log("==========>>>.Token",this.state.accessToken);
    return this.state.accessToken ? <AppStack/> : <AuthStack/> ;
  }
  
};

const mapStateToProps = ({auth: {token}}) => ({
  token,
});

const mapDispatchToProps = {
  addLoginDetail: (params) => setLoginDetails(params),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AppNavigator));
