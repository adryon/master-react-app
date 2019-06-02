import defaultState from './default-state';
import {
  USERS_LOAD_USERS_LIST
} from './../actions/actions-types';

import config from './../lib/config';
import lockr from 'lockr';

lockr.prefix = config.LOCKR_PREFIX;

export default function userState(state = defaultState.users, action) {

  switch (action.type) {

    case USERS_LOAD_USERS_LIST:
      return Object.assign({}, state, {
        data: action.data,
      });

    default:
      return state;
  }
};
