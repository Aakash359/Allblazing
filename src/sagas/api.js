import {SERVER_URI, COMMON_SERVER_URI,SERVER_URI2} from '../CommonConfig';
import {Platform} from 'react-native';

module.exports = {
// =======>>>>>>>>>> Login <<<<<<<<<<=======
login(params) {
console.log(params, 'paramsparams');
let body = params;
return axios.post(API.LOG_IN, {
    email: emailId,
    password: password,
  })
  .then(async (response) => {
    if (response?.data?.code === 401) {
      Alert.alert(
        '',
        response?.data?.message ?? '',
        
      );
    }
    if (response?.data?.code === 200) {
      console.log("=======>>>responselogin",response?.data?.data);
      setAuthToken(response?.data?.data?.token);
      addLoginDetail(response?.data?.data);
      setLoginUserId(JSON.stringify(response?.data?.data));
      if(this.state.isRemember) {
        try {
          await AsyncStorage.setItem('userCred', JSON.stringify({email: emailId, password}))
          console.log('CRED SAVED', JSON.stringify({email: emailId, password}));
        } catch (error) {
          console.log("CRED NOT SAVED", error.message);
        }
    }
    else {
      console.log('remember is false');
      await AsyncStorage.removeItem('userCred')
      
    }
      loginSuccess();
      navigate('Overview');
    }
  })
  .finally(() => {
    this.setState({
      isLoading: false,
    });
  });
},




}

