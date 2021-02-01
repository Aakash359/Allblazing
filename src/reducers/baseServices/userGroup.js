import {SET_CREATE_GROUP_DETAIL} from '../../actions/auth-action-types';

const initialState = {
  name:'',
  image: '',
  type:1,
  description: '',
  member:[],
  
};

export default function CreateGroup(state = initialState, {payload, type}) {
  switch (type) {
    case SET_CREATE_GROUP_DETAIL:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}


  export function setCreateGroupDetails(params) {
    return dispatch => {
      dispatch({ type: SET_CREATE_GROUP_DETAIL, payload: params });
    };
  }