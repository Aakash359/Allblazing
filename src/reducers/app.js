import { HIDE_LOADER, SHOW_LOADER } from '../actions/app-action-types';

const initialState = {
  locale: 'en',
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

    default:
      return state;
  }
}
