import React from 'react';
import '../App.css';
import EditTask from '../components/EditTask';
import _ from  'lodash';
import { userActions } from '../actions';
import { connect } from 'react-redux'

class DashboardPage extends React.Component{

  constructor(props) {
    super(props);
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
    this.turnToArray = this.turnToArray.bind(this);
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
    this.props.newTask(payload, this.state.assignedUser.uid);
  }

  deleteModal(task, category) {
    this.props.deleteTask(task.uid, this.props.user.data.uid, category)
  }

  moveModal(task, fromCategory, toCategory) {
    this.props.moveTask(task, this.props.user.data.uid, fromCategory, toCategory);
  }

  turnToArray(object, category) {
		let result = [];
    const {searchInput, showSearch} = this.props.user;
    let resultCards = [];
    _.keys(object).map(item => {
    	object[item].uid = item;
      if (showSearch === true) {
        if (object[item].title.toLowerCase().includes(searchInput)) {
          result.push(object[item])
        }
      } else {
        result.push(object[item])
      }
    });

    const usersList = this.state.usersList.map((user, index) => {
      return (<li key={index} className="list-group-item">{user.name}<button type="button" className="btn btn-primary float-right" onClick={() => this.onUserClick(user)}>Select</button></li>)
    })

    resultCards = result.map((item, index) => {
      return (
        <div className={`card m-2 ${item.priority === 'low'? 'border-success' : item.priority === 'medium' ? 'border-warning' : item.priority === 'high' ? 'border-danger' : null}`} key={index}>
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="card-text">Priority: {item.priority}</p>
          </div>
          <div className="card-footer">
            <EditTask task={item} category={category} />
            <span>
              <button className="btn btn-link" data-toggle="modal" data-target="#deleteTaskModal">Delete</button>
              <div className="modal" id="deleteTaskModal">
                <div className="modal-dialog">
                  <div className="modal-content">

                    <div className="modal-header">
                      <h4 className="modal-title">Are you sure you want to delete this task?</h4>
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                      <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => this.deleteModal(item, category)}>Yes</button>
                    </div>

                  </div>
                </div>
              </div>
            </span>
            <span>
              <button className="btn btn-link" data-toggle="dropdown">Move to...</button>
              <div className="dropdown-menu">
                {category !== 'noProgressTasks' && <button className="dropdown-item" onClick={() => this.moveModal(item, category, 'noProgressTasks')}>No Progress</button>}
                {category !== 'inProgressTasks' && <button className="dropdown-item" onClick={() => this.moveModal(item, category, 'inProgressTasks')}>In Progress</button>}
                {category !== 'completedTasks' && <button className="dropdown-item" onClick={() => this.moveModal(item, category, 'completedTasks')}>Completed</button>}
              </div>
            </span>
          </div>
        </div>
      )
    })
    return resultCards
  }

	render() {

		const noProgressTasks = this.props.user && this.props.user.data && this.turnToArray(this.props.user.data.noProgressTasks, 'noProgressTasks');
    const inProgressTasks = this.props.user && this.props.user.data && this.turnToArray(this.props.user.data.inProgressTasks, 'inProgressTasks');
    const completedTasks = this.props.user && this.props.user.data && this.turnToArray(this.props.user.data.completedTasks, 'completedTasks');

		return (
			<div className="row">
        <div className="col-md-4 col-sm-12">
          <h2 className="text-white">No progress</h2>
          {noProgressTasks}
        </div>
        <div className="col-md-4 col-sm-12">
          <h2 className="text-white">In progress</h2>
          {inProgressTasks}
        </div>
        <div className="col-md-4 col-sm-12">
          <h2 className="text-white">Completed</h2>
          {completedTasks}
        </div>
      </div>
		)
	}
}  

const mapDispatchToProps = {
  deleteTask: userActions.deleteTask,
  moveTask: userActions.moveTask,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    users: state.users,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);