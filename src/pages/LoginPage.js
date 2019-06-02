import React from 'react';
import '../App.css';
import _ from  'lodash';
import { connect } from 'react-redux'
import { userActions } from '../actions';

class LoginPage extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
    	email: '',
    	password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = _.pick(this.state, ['email', 'password']);
    this.props.login(payload, this.props.history);
  }

	render() {
		return (
			<div className="App-header">
				<strong className="mb-3 text-white">Login</strong>
				<div className="col-lg-4">
					<div className="card">
					  <div className="card-body">
					  	<div className="container">
						    <form onSubmit={this.handleSubmit}>
								  <div className="form-group">
								    <label>Email address</label>
								    <input 
								    	type="email" 
								    	className="form-control" 
								    	placeholder="Enter email" 
								    	name="email" 
								    	required
								    	value={this.state.email} 
								    	onChange={this.handleChange}
								    />
								  </div>
								  <div className="form-group">
								    <label>Password</label>
								    <input 
								    	type="password" 
								    	className="form-control" 
								    	placeholder="Password" 
								    	name="password"
								    	required 
								    	value={this.state.password} 
								    	onChange={this.handleChange}
								    />
								  </div>
								  <div className="form-group">
									  <span className="paragraph">
				              <a href="/register">
				                Register
				              </a>
				              {' '}if you don't have an account!
				            </span>
				          </div>
				          <div className="form-group">
								  	<button type="submit" className="btn btn-primary" value="Submit">Login</button>
								  </div>
								</form>
							</div>
					  </div>
					</div>
				</div>
			</div>
		)
	}
}  

const mapDispatchToProps = {
  login: userActions.login,
};

function mapStateToProps(state) {
  return {
  	user: state.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);