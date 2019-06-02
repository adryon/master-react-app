import React from 'react';
import '../App.css';
import _ from  'lodash';
import { connect } from 'react-redux'
import { userActions } from '../actions';

class RegisterPage extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
    	name: '',
    	email: '',
    	password: '',
    	confirmPassword: '',
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = _.pick(this.state, ['email', 'password', 'name']);
    this.props.register(payload, this.props.history);
  }

	render() {
		return (
			<div className="App-header">
				<strong className="mb-3 text-white">Register</strong>
				<div className="col-lg-4">
					<div className="card">
					  <div className="card-body">
					  	<div className="container">
						    <form onSubmit={this.handleSubmit}>
						    	<div className="form-group">
								    <label>Full Name</label>
								    <input 
								    	type="text" 
								    	className="form-control" 
								    	placeholder="Enter your name" 
								    	name="name" 
								    	required
								    	value={this.state.name} 
								    	onChange={this.handleChange}
								    />
								  </div>
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
								    <label>Confirm Password</label>
								    <input 
								    	type="password" 
								    	className="form-control" 
								    	placeholder="Confirm Password" 
								    	name="confirmPassword"
								    	required 
								    	value={this.state.confirmPassword} 
								    	onChange={this.handleChange}
								    />
								  </div>
								  <div className="form-group">
				            <span className="paragraph">
                      <a href="/login">
                        Login
                      </a>
                      {' '}if you already have an account!
                    </span>
				          </div>
				          <div className="form-group">
								  	<button type="submit" className="btn btn-primary" value="Submit">Create an account</button>
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
  register: userActions.register,
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);