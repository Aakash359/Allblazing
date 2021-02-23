import { CommonActions } from '@react-navigation/native';

let navigator;

export const  setTopLevelNavigator = (navigatorRef) =>{
  navigator = navigatorRef;
}

export const navigate = (routeName, params) =>{
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function goBack(key) {
  navigator.dispatch(
    CommonActions.back({ key }),
  );
}

// add other navigation functions that you need and export them

export default {
  goBack,
  navigate,
  setTopLevelNavigator,
};
