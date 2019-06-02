import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Navbar from './components/Navbar'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyDCk5ieuOM8utCxZ-uJ7gXGQ0STLUXYazk",
	authDomain: "master-app-b42ec.firebaseapp.com",
	databaseURL: "https://master-app-b42ec.firebaseio.com",
	projectId: "master-app-b42ec",
	storageBucket: "master-app-b42ec.appspot.com",
	messagingSenderId: "786912433403",
	appId: "1:786912433403:web:613faa298e70cf00"
};
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <div className="dark-background">
      <Navbar />
      <App />
    </div>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
