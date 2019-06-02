import {
  USER_LOG_IN_FAIL,
  USER_LOG_IN_SUCCESS,
  USER_LOG_OUT_FAIL,
  USER_LOG_OUT_SUCCESS,
  USER_SET_CURRENT_USER,
  USER_UPDATE_SEARCH_INPUT,
  USER_DISMISS_SEARCH_INPUT
} from './actions-types';
import firebase from 'firebase';

export function loginSuccess(data) {
  return {type: USER_LOG_IN_SUCCESS, data};
}

export function loginFailed() {
  return {type: USER_LOG_IN_FAIL};
}

export function logOutFailed() {
  return {type: USER_LOG_OUT_FAIL};
}

export function logOutSuccess() {
  return {type: USER_LOG_OUT_SUCCESS};
}

export function setCurrentUser(data) {
  return {type: USER_SET_CURRENT_USER, data};
}

export function updateSearchInput(data) {
  return {type: USER_UPDATE_SEARCH_INPUT, data};
}

export function dismissSearchInput() {
  return {type: USER_DISMISS_SEARCH_INPUT};
}

export function register(payload, history) {
  return function (dispatch) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(result => {
      firebase.database().ref(`users/${result.user.uid}`).set({
        name: payload.name,
        email: payload.email,
      });
      alert('Account created!');
      history.push('/')
    })
    .catch(error => {
      alert('Register failed!');
    });
  }
}

export function login(payload, history) {
  return function (dispatch) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(result => {
      dispatch(loginSuccess(result.user));
      history.push('/dashboard');
    })
    .catch(error => {
      alert('Login failed!');
    });
  }
}

export function logOut(history) {
  return function (dispatch) {
    firebase.auth().signOut().then(() => {
      dispatch(logOutSuccess());
      //history.push('/login');
    })
    .catch(error => {
      dispatch(logOutFailed());
      //history.push('/login');
    });
  }
}

export function newTask(payload, uid) {
  return function(dispatch) {
    firebase.database().ref(`users/${uid}/noProgressTasks`).push(payload);
    alert('Task created!');
  }
}

export function editTask(payload, userUID, taskUID, category) {
  return function(dispatch) {  
    firebase.database().ref(`users/${userUID}/${category}/${taskUID}`).update(payload);
    alert('Task edited!');
  }
}

export function deleteTask(taskUID, userUID, category) {
  return function(dispatch) {
    firebase.database().ref(`users/${userUID}/${category}/${taskUID}`).remove();
    alert('Task deleted!');
  }
}

export function moveTask(task, userUID, fromCategory, toCategory) {
  return function(dispatch) {
    firebase.database().ref(`users/${userUID}/${fromCategory}/${task.uid}`).remove();
    delete task.uid;
    firebase.database().ref(`users/${userUID}/${toCategory}`).push(task);
  }
}