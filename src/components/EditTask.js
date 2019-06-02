import React from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { userActions } from '../actions';
import _ from  'lodash';

class EditTask extends React.Component{

	constructor(props) {
    super(props);
    this.state = {
    	title: props.task.title,
    	description: props.task.description,
    	priority: props.task.priority,
    	assignedSearchInput: '',
    	assignedUser: props.user.data,
    	showUsersList: false,
    	showSelectedUser: true,
    	usersList: [],
      uid: props.task.uid,
      task: props.task,
      category: props.category,
    };
 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAssignedSearch = this.handleAssignedSearch.bind(this);
    this.onUserClick = this.onUserClick.bind(this);
    this.removeAssignedUser = this.removeAssignedUser.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const payload = _.pick(this.state, ['title', 'description', 'priority']);
    this.props.editTask(payload, this.state.assignedUser.uid, this.state.uid, this.state.category);
  }

	render() {

		const usersList = this.state.usersList.map((user, index) => {
			return (<li key={index} className="list-group-item">{user.name}<button type="button" className="btn btn-primary float-right" onClick={() => this.onUserClick(user)}>Select</button></li>)
		})

		return (
			<span>
				<button className="btn btn-link" data-toggle="modal" data-target="#editTaskModal">Edit</button>
        <div className="modal" id="editTaskModal">
          <form onSubmit={this.handleSubmit}>
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h4 className="modal-title">New Task</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
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
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success" value="Submit">Save</button>
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

              </div>
            </div>
          </form>
        </div>
			</span>
		)
	}
}  

const mapDispatchToProps = {
	editTask: userActions.editTask,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);