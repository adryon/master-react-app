import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { userActions } from '../actions';
import _ from  'lodash';

class Navbar extends React.Component{

	constructor(props) {
    super(props);
    console.log(props);
    this.state = {
    	title: '',
    	description: '',
    	priority: '',
    	assignedSearchInput: '',
    	assignedUser: {},
    	showUsersList: false,
    	showSelectedUser: false,
    	usersList: []
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAssignedSearch = this.handleAssignedSearch.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.removeAssignedUser = this.removeAssignedUser.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleAssignedSearch(event) {
  	this.setState({assignedSearchInput: event.target.value});

  	var usersList = [];

  	this.props.users.data.map(user => {
  		if (user.name.toLowerCase().includes(event.target.value.toLowerCase())) {
  			usersList.push(user);
  		}
  	})
  	this.setState({usersList: usersList, showUsersList: true});
  }

  onUserClick(user) {
  	this.setState({
  		assignedUser: user,
  		showUsersList: false,
  		showSelectedUser: true,
  		assignedSearchInput: '',
  	});
  }

  removeAssignedUser() {
  	this.setState({
  		assignedUser: {},
  		showUsersList: false,
  		showSelectedUser: false,
  	});
  }

  searchTasks(event) {
  	if (event.target.value !== '') {
  		this.props.updateSearchInput(event.target.value);
  	} else {
  		this.props.dismissSearchInput();
  	}
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = _.pick(this.state, ['title', 'description', 'priority']);
    this.props.newTask(payload, this.state.assignedUser.uid);
  }

  onLogOut() {
  	this.props.logOut();
  }

	render() {
		const usersList = this.state.usersList.map((user, index) => {
			return (<li key={index} className="list-group-item">{user.name}<button type="button" className="btn btn-primary float-right" onClick={() => this.onUserClick(user)}>Select</button></li>)
		})

		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
			  <a className="navbar-brand" href="/dashboard">Tasker</a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>

			  <div className="collapse navbar-collapse" id="navbarSupportedContent">
			    <ul className="navbar-nav mr-auto">
			      <li className="nav-item active">
			      </li>
			    </ul>
			    <form className="form-inline my-2 my-lg-0">
			      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={this.searchTasks}/>
			    </form>
			    <button className="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#addTaskModal">Add Task</button>
	        <div className="modal" id="addTaskModal">
					  <div className="modal-dialog">
					    <div className="modal-content">

					      <div className="modal-header">
					        <h4 className="modal-title">New Task</h4>
					        <button type="button" className="close" data-dismiss="modal">&times;</button>
					      </div>

					      <div className="modal-body">
					        <form onSubmit={this.handleSubmit}>
							    	<div className="form-group">
									    <label>Title</label>
									    <input 
									    	type="text" 
									    	className="form-control" 
									    	placeholder="Enter a title" 
									    	name="title" 
									    	required
									    	value={this.state.title} 
									    	onChange={this.handleChange}
									    />
									  </div>
									  <div className="form-group">
									    <label>Description</label>
									    <textarea 
									    	type="text" 
									    	className="form-control" 
									    	placeholder="Enter a description" 
									    	name="description" 
									    	required
									    	value={this.state.description} 
									    	onChange={this.handleChange}
									    />
									  </div>
									  <div className="form-group">
									    <label>Assign to...</label>
									    <input 
									    	type="text" 
									    	className="form-control" 
									    	placeholder="Search ..." 
									    	name="assignedSearch" 
									    	value={this.state.assignedSearchInput} 
									    	onChange={this.handleAssignedSearch}
									    />
									  </div>
									  {this.state.showUsersList && (
									  	<ul className="list-group">
											  {usersList}
											</ul>
										)}
										{this.state.showSelectedUser && (
											<div>
										  	<p>Assigned user: {this.state.assignedUser.name}</p>
										  	<button type="button" className="btn btn-danger btn-small" onClick={this.removeAssignedUser}>Remove</button>
										  </div>
										)}

										<div className="form-group">
										  <label>Priority:</label>
										  <select className="form-control" name="priority" value={this.state.priority} onChange={this.handleChange}>
										    <option className="text-success" value="low">Low</option>
										    <option className="text-warning" value="medium">Medium</option>
										    <option className="text-danger" value="high">High</option>
										  </select>
										</div>
					          <div className="form-group">
									  	<button type="submit" className="btn btn-primary" value="Submit">Create a task!</button>
									  </div>
									</form>
					      </div>

					      <div className="modal-footer">
					        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
					      </div>

					    </div>
					  </div>
					</div>
			    <ul className="nav navbar-nav navbar-right">
			    	<li className="nav-item dropdown">
				      <div className="inset dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                <img src="http://rs775.pbsrc.com/albums/yy35/PhoenyxStar/link-1.jpg~c200" alt="placeholder"/>
              </div>
				      <div className="dropdown-menu dropdown-menu-right">
				      	<div className="dropdown-header">{this.props.user && this.props.user.data ? this.props.user.data.email : null}</div>
							  <div className="dropdown-divider"></div>
				        <a className="dropdown-item" href="/login" onClick={this.onLogOut}>Sign Out</a>
				      </div>
				    </li>
          </ul>
			  </div>
			</nav>
		)
	}
}  

const mapDispatchToProps = {
	logOut: userActions.logOut,
	newTask: userActions.newTask,
	updateSearchInput: userActions.updateSearchInput,
	dismissSearchInput: userActions.dismissSearchInput,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);