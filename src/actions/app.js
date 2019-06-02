import {userActions} from "../actions";
import lockr from 'lockr';
import firebase from 'firebase';
import _ from 'lodash';

import {
  USERS_LOAD_USERS_LIST
} from './actions-types';

export function loadUsersList(data) {
  return {type: USERS_LOAD_USERS_LIST, data};
}

export const initAuth = () => (dispatch) => {

  if(lockr.get('Authorization')) {
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('/users/' + user.uid).on('value', snapshot => {
        const userData = Object.assign({}, snapshot.val(), {uid: user.uid})
        dispatch(userActions.setCurrentUser(userData))
      });

      firebase.database().ref(`/users`).on('value', snapshot => {
        let result = snapshot.val();
        _.keys(result).map(item => {
          result[item].uid = item;
        });
        dispatch(loadUsersList(_.toArray(result)))
      })
    });
    return Promise.resolve(true);
  } else {
    return Promise.reject();
  }
};