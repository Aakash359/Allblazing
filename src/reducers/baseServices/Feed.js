import {SET_FEED_DETAILS} from '../../actions/auth-action-types';

const initialState = {
  id: '',
  user_id: '',
  post: '',
  created_at: '',
  likeStatus: null,
  likeCount: null,
  autherName: '',
};

export default function auth(state = initialState, {payload, type}) {
  switch (type) {
    case SET_FEED_DETAILS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

export function setFeedDetails(params) {
  return ({type: SET_FEED_DETAILS, payload: params});

}
