import { HIDE_LOADER, SHOW_LOADER, SET_LANGUAGE } from '../actions/app-action-types';

const initialState = {
  locale: null,
  type: 'loader',
  visible: false,
};

export default function app(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case HIDE_LOADER:
      return {
        type: payload || 'loader',
        visible: false,
      };

    case SHOW_LOADER:
      return {
        type: payload || 'loader',
        visible: true,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        locale: payload,
      };

    default:
      return state;
  }
}
