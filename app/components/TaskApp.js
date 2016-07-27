var React = require('react');

/*components*/
var PriorityList = require('./PriorityList');
var TaskAdd = require('./TaskAdd');
var TaskList = require('./TaskList');
var TaskDetails = require('./TaskDetails');

/*stores*/
var TaskStore = require('../stores/TaskStore');
var PriorityStore = require('../stores/PriorityStore');

/*actions*/
var taskActions = require('../actions/taskActions');

var TaskApp = React.createClass({
	getInitialState: function(){
		return {
			list: TaskStore.getFilteredTaskList(),
			selectedTaskId: null,
			priorities: PriorityStore.getAllPriorities()
		}
	},
	componentDidMount: function(){
		TaskStore.addChangeListener(this._onChange);
		// PriorityStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function(){
		TaskStore.removeChangeListener(this._onChange);
		// PriorityStore.removeChangeListener(this._onChange);
	},
	handleAddTask: function(newItem){
		taskActions.addTask(newItem);
	},
	handleRemoveTask: function(index){
		taskActions.removeTask(index);
	},
	handleCompleteTask: function(taskId, e){
		if (!e) var e = window.event;
			e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
			taskActions.completeTask(taskId);
	},
	handleSelectTask : function( id ) {
		taskActions.selectTask( id );
	},
	_onChange: function(){
		this.setState({
			list: TaskStore.getFilteredTaskList(),
			selectedTaskId : TaskStore.getSlectedItemId()
		});
	},
	getItemObject: function() {
		if(!this.state.selectedTaskId) return false;
		var selectedTaskId = this.state.selectedTaskId;
		var object = this.state.list.filter( function(task) { return task.id == selectedTaskId } );
		return object[0];
	},
	handleSelectPriority : function(priority,e) {
		e.preventDefault();
		taskActions.selectPriority(priority);
	},
	render: function(){
		return (
			<div className="row">
				<div className="col-sm-2">
					<PriorityList  />
				</div>
				<div className="col-sm-6 task-app-outer">
					<h3>Task List</h3>
					<TaskAdd add={this.handleAddTask} priorities={this.state.priorities}/>
					<TaskList tasks={this.state.list} remove={this.handleRemoveTask} complete={this.handleCompleteTask} select={this.handleSelectTask} activeTask={this.state.selectedTaskId}/>
				</div>
				<div className="col-sm-4 task-details-outer">
					<TaskDetails item={this.getItemObject()} taskId={this.state.selectedTaskId}/>
				</div>
			</div>
			)
	}
});

module.exports = TaskApp;