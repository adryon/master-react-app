import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { appActions } from './actions';
import { connect } from 'react-redux'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

class App extends React.Component{

  constructor(props) {
    super(props);

    this.props.initAuth();
  }

  render() {
    return (
      <Router>
        <Route path="/dashboard" component={DashboardPage}/>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Router>
    );
  }
} 

const mapDispatchToProps = {
  initAuth: appActions.initAuth,
};

function mapStateToProps(state) {
  return {
    appData: state.appData,
    user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);